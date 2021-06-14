import asyncio
import math
import logging
from bisect import bisect_left
from typing import Callable

from triac.SCR import scr

from status import Status

logger = logging.getLogger(__name__)


class Controller:
    MIN_POWER = 10
    MAX_POWER = 100
    START_DURATION = 7.0
    START_POWER = 100

    def __init__(self, angle_regulator: Callable):
        self.current_power = 0
        self.target_power = 0
        self.regulator = angle_regulator
        self.real_power = 0
        self.power_list = [1 - (1 + math.cos(a*math.pi/180))/2 for a in range(180)]
        logger.debug(f'Initialized')

    def set_power(self, power):
        if power == 0:
            self.target_power = 0
        else:
            self.target_power = min(max(power, Controller.MIN_POWER), Controller.MAX_POWER)
        logger.debug(f'Target power set {self.target_power}')
        self.update_status()

    async def daemon(self):
        while True:
            if self.target_power != self.current_power:
                if self.current_power == 0:
                    self._set_regulator(Controller.START_POWER)
                    await asyncio.sleep(Controller.START_DURATION)
                self._set_regulator(self.target_power)
                self.current_power = self.target_power
                self.update_status()
            await asyncio.sleep(0.1)

    def _set_regulator(self, power):
        self.real_power = power
        power = max(0, min(power / 100.0, 1))
        target_angle = bisect_left(self.power_list, power)
        target_angle = max(0, min(target_angle, 179))
        self.regulator(target_angle)
        logger.debug(f'Angle set {target_angle}')
        self.update_status()

    def update_status(self):
        Status()['triac'] = {
            'target': self.target_power,
            'current': self.current_power,
            'real': self.real_power
        }


vents = Controller(lambda x: scr.VoltageRegulation(1, x))
