import os

import sanic
from sanic import Sanic
import sanic.response as response
import asyncio
import logging
import json
import time
import csv

from typing import Optional

from backend import program, Program, ProgramService
from sensor_pms import SensorPMS
from triac.controller import vents


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
app = Sanic("main")
pms5008: Optional[SensorPMS] = None


@app.get('/programs')
def programs_handler(request):
    return response.json(ProgramService.get_all_programs())


@app.get('/programs/run/<program_id>')
def run_program(request, program_id):
    programs = ProgramService.get_all_programs()
    programs = [p for p in programs if p['id'] == int(program_id)]
    if len(programs) == 0:
        return response.text(f'Program {program_id} does not exist', status=402)
    requested_program = Program.from_raw_data(programs[-1])
    program.start_program(requested_program)
    return response.text('Started')


@app.route('/display')
def display(request):
    with open('web/index.html', 'r') as f:
        data = f.read()
    return response.html(data)


@app.put('/power')
def set_power(request):
    power = int(request.json['power'])
    power = max(0, min(power, 100))
    vents.set_power(power)
    return response.text('DONE')

@app.get('/power')
def get_power(request):
    return response.json(json.dumps({'target_power': vents.target_power, 'real_power': vents.real_power}))


@app.get('/pms')
async def pms_handler(request):
    async def read_pms_queue(resp: response.BaseHTTPResponse):
        while True:
            pms_data = await pms5008.read_async()
            json_data = json.dumps(pms_data.as_dict())
            await resp.write(json_data)
    return response.stream(read_pms_queue, content_type='application/json')


@app.get('/pms/<field>')
async def pms_history_handler(request, field):
    pass


@app.post('/start_rec')
async def start_record(request):
    pass

@app.get('/stop_rec')
async def stop_record(request):
    pass

stop_event = asyncio.Event()


@app.route('/start', methods=['POST'])
async def start(request: sanic.Request):
    duration = int(request.form.get('time'))
    power = int(request.form.get('power_select'))
    vents.set_power(power)
    stop_event.clear()

    async def read_pms(resp: response.BaseHTTPResponse):
        log = []
        remaining_time = duration
        while remaining_time > 0:
            if stop_event.is_set():
                stop_event.clear()
                break
            record = {'time': duration - remaining_time, 'power': vents.real_power}
            pms_result = await pms5008.read_async()
            record.update(pms_result.as_dict())
            log.append(record)
            await resp.write(str(remaining_time))
            remaining_time -= 1
            await asyncio.sleep(1.0)
        with open(f'logs/{round(time.time())}.csv', 'w') as f:
            writer = csv.DictWriter(f, log[0].keys())
            writer.writeheader()
            writer.writerows(log)
        vents.set_power(0)

    return response.stream(read_pms, content_type='text/plain')


@app.get('/stop')
async def stop(request: sanic.Request):
    if not stop_event.is_set():
        stop_event.set()
    return response.text('')


async def main():
    global pms5008
    pms5008 = SensorPMS('/dev/ttyUSB0', app.loop)
    await asyncio.gather(
        vents.daemon(),
        program.daemon(),
        pms5008.read_loop()
    )

app.add_task(main())
app.static('/', './web/')
