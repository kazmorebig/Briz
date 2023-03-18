import dataclasses as dc
import json
import time
import logging
import threading

from typing import List, Optional

from program import Program, Action

logger = logging.getLogger()


class ProgramService:
    def __init__(self, vents):
        self.current_program: Optional[Program] = None
        self.elapsed_time = 0
        self.paused = False
        self.vents = vents
        logger.debug(f'Service init')
        threading.Thread(target=self.daemon, daemon=True).start()

    def daemon(self):
        logger.debug(f'Daemon started')
        while True:
            if self.current_program is not None and not self.paused:
                self.elapsed_time += 1
                self._set_power(self.current_program.get_power(self.elapsed_time))
                if not self.current_program.is_active(self.elapsed_time):
                    self.stop_program()
            time.sleep(1)

    def get_status(self):
        status = {
            'program_status': 'stopped' if self.current_program is None else 'running' if not self.paused else 'paused',
            'program_id': self.current_program.id if self.current_program is not None else -1,
            'elapsed_time': self.elapsed_time,
            'current_power': self.vents.target_power
        }
        return json.dumps(status)

    def _set_power(self, power):
        if self.vents.target_power != power:
            logger.debug(f'Change power to {power}')
            self.vents.set_power(power)

    def start_program(self, program: Program):
        logger.debug(f'Start {self.current_program}')
        self.stop_program()
        self.current_program = program

    def stop_program(self):
        logger.debug(f'Stop {self.current_program}')
        self._set_power(0)
        self.elapsed_time = 0
        self.current_program = None

    def pause_program(self):
        logger.debug(f'Pause {self.current_program}')
        self.paused = True
        self._set_power(0)

    def resume_program(self):
        logger.debug(f'Resume {self.current_program}')
        self.paused = False
