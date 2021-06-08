import asyncio
import math
import logging
from typing import Callable

from triac.SCR import scr

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
        logger.debug(f'[CONTROLLER] Initialized')

    def set_power(self, power):
        if power == 0:
            self.target_power = 0
        else:
            self.target_power = min(max(power, Controller.MIN_POWER), Controller.MAX_POWER)
        logger.debug(f'[CONTROLLER] Target power set {self.target_power}')

    async def daemon(self):
        while True:
            if self.target_power != self.current_power:
                if self.current_power == 0:
                    self._set_regulator(Controller.START_POWER)
                    await asyncio.sleep(Controller.START_DURATION)
                self._set_regulator(self.target_power)
                self.current_power = self.target_power
            await asyncio.sleep(0.1)

    def _set_regulator(self, power):
        target_angle = max(0, min(math.floor(power * 1.79), 179))
        self.real_power = power
        self.regulator(target_angle)
        logger.debug(f'[CONTROLLER] Angle set {target_angle}')


vents = Controller(lambda x: scr.VoltageRegulation(1, x))
