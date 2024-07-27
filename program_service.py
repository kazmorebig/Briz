import json
import time
import logging
import threading

from typing import Optional

from program import Program
from sessions import Sessions

try:
    from bmp import bmp
except ImportError:
    bmp = None

logger = logging.getLogger()

MAX_BLOW_UP_TIME = 10
BLOW_UP_POWER = 100
PRESSURE_THRESHOLD = 1.0  # hPa


class ProgramService:
    def __init__(self, vents):
        self.current_program: Optional[Program] = None
        self.sessions = Sessions()
        self.elapsed_time = 0
        self.paused = False
        self.vents = vents
        logger.debug(f'Service init')
        self.daemon_tick = threading.Event()
        threading.Thread(target=self.daemon, daemon=True).start()

    def blow_up(self):
        self._set_power(100)
        if not bmp:
            logger.debug(f'No BMP sensor found')
            time.sleep(5.0)
        start_stamp = time.time()
        pressure_curve = []
        while time.time() - start_stamp < MAX_BLOW_UP_TIME:
            time.sleep(0.1)
            pressure_curve.append(bmp.pressure)
            target_pressure = max(pressure_curve) - PRESSURE_THRESHOLD
            if pressure_curve[-1] < target_pressure:
                logger.debug(f'Pressure reduced after {time.time() - start_stamp:.2f}s')
                break
        else:
            logger.debug(f'Pressure haven\'t been reduced')
        with open('logs/bmp.log', 'w') as f:
            f.write('\n'.join([f'{p:.2f}' for p in pressure_curve]))

    def daemon(self):
        logger.debug(f'Daemon started')
        while True:
            if self.current_program is not None and not self.paused:
                if self.vents.current_power == 0:
                    self.blow_up()
                self.elapsed_time += 1
                self._set_power(self.current_program.get_power(self.elapsed_time))
                if not self.current_program.is_active(self.elapsed_time):
                    self.stop_program()
            self.daemon_tick.set()
            time.sleep(1)

    def get_status(self):
        status = {
            'program_status': 'stopped' if self.current_program is None else 'running' if not self.paused else 'paused',
            'program_id': self.current_program.id if self.current_program is not None else -1,
            'elapsed_time': self.elapsed_time,
            'current_power': self.vents.target_power
        }
        return json.dumps(status)

    def status_generator(self):
        prev_status = None
        while self.daemon_tick.wait():
            new_status = self.get_status()
            if new_status != prev_status:
                prev_status = new_status
                yield new_status

    def get_sessions(self):
        return self.sessions.json()

    def _set_power(self, power):
        if self.vents.target_power != power:
            logger.debug(f'Change power to {power}')
            self.vents.set_power(power)

    def start_program(self, program: Program, starter_mac='-'):
        logger.debug(f'Start {self.current_program}')
        self.stop_program()
        self.current_program = program
        self.sessions.start(self.current_program.name, starter_mac)

    def stop_program(self):
        logger.debug(f'Stop {self.current_program}')
        self._set_power(0)
        self.elapsed_time = 0
        self.current_program = None
        self.paused = False
        self.sessions.stop()

    def pause_program(self):
        logger.debug(f'Pause {self.current_program}')
        self.paused = True
        self._set_power(0)

    def resume_program(self):
        logger.debug(f'Resume {self.current_program}')
        self.paused = False
