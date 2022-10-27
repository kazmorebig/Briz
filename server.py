import collections
import itertools
import os
import dataclasses as dc

import sanic
from copy import deepcopy
from sanic import Sanic
import sanic.response as response
import asyncio
import json
import time
import csv

from typing import Optional, List

from backend import program, Program, ProgramService
from status import Status
from sensor_pms import SensorBasic, SensorSDS
from triac.controller import vents
from sanic.log import logger, LOGGING_CONFIG_DEFAULTS

LOGGING_CONFIG_DEFAULTS['loggers']['sanic.root']['level'] = 'DEBUG'

app = Sanic("main")
recording_sensors: List[SensorBasic] = []
pms5008: Optional[SensorBasic] = None
pms7003: Optional[SensorBasic] = None
sds011: Optional[SensorSDS] = None
record_task = None


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
    with open('static/index.html', 'r') as f:
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


@app.get('/start_rec')
async def start_record(request):
    print(os.path.abspath(os.curdir))
    dirs = [int(fname) for fname in os.listdir('logs') if os.path.isdir(f'logs/{fname}')]
    rec_id = max(dirs) + 1 if dirs else 0
    os.makedirs(f'./logs/{rec_id}')
    app.add_task(record_loop(rec_id))
    return response.json({'rec_id': rec_id})


@app.get('/stop_rec')
async def stop_record(request):
    if not stop_event.is_set():
        stop_event.set()
    return response.json({'rec_id': ''})


@app.websocket('/status')
async def status_handler(request: sanic.Request, ws):
    logger.debug('Status requested')
    await Status().send_async(ws)

stop_event = asyncio.Event()


async def record_loop(rec_id):
    time = 0
    for sensor in recording_sensors:
        with open(f'logs/{rec_id}/{sensor.name}.csv', 'w') as f:
            csv_writer = csv.DictWriter(f, ['time'] + list(dc.asdict(sensor.result).keys()))
            csv_writer.writeheader()

    while True:
        for sensor in recording_sensors:
            with open(f'logs/{rec_id}/{sensor.name}.csv', 'a') as f:
                csv.writer(f).writerow([str(time)] + list(dc.asdict(sensor.result).values()))
        await asyncio.sleep(1.0)
        time += 1
        if stop_event.is_set():
            stop_event.clear()
            break


async def main():
    global pms5008, sds011, pms7003, recording_sensors
    sds011 = SensorSDS('/dev/serial/by-path/platform-3f980000.usb-usb-0:1.2:1.0-port0', app.loop, '011')
    # pms5008 = SensorBasic('/dev/serial/by-path/platform-3f980000.usb-usb-0:1.3:1.0-port0', app.loop, '5008')
    # pms7003 = SensorBasic('/dev/serial/by-path/platform-3f980000.usb-usb-0:1.4:1.0-port0', app.loop, '7003')
    recording_sensors += [sds011, pms5008, pms7003]
    Status(app.loop)
    await asyncio.gather(
        vents.daemon(),
        program.daemon(),
        #pms5008.read_loop(),
        #pms7003.read_loop(),
        sds011.read_loop(),
        Status().daemon()
    )

app.add_task(main())
app.static('/', './static/')
