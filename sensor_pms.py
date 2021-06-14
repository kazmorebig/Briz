import math
import random

import json
import serial
import asyncio
import dataclasses as dc

from status import Status
from sanic.log import logger



@dc.dataclass
class Result:
    pm1_cf: int
    pm25_cf: int
    pm100_cf: int
    pm1: int
    pm25: int
    pm100: int
    b03: int
    b05: int
    b10: int
    b25: int
    b50: int
    b100: int

    def as_dict(self):
        return dc.asdict(self)

    def as_json(self):
        return json.dumps(self.as_dict())


class MockedSerial:

    def reset_input_buffer(self):
        pass

    @property
    def in_waiting(self):
        return math.inf

    def read(self, count):
        return bytearray([random.randint(1, 100) for i in range(count)])


class SensorPMS:
    def __init__(self, port, loop=None):
        self.port = MockedSerial() if port == 'mocked' else serial.Serial(port, 9600)
        self.result = None
        self.ax1 = None
        self.data_received = asyncio.Event(loop=loop)

    def read(self):
        data = self.port.read(32)
        # print('data: ', [f'{d:02x}' for d in data], len(data))
        values = [int(f'{i1:02x}{i2:02x}', 16) for i1, i2 in zip(data[::2], data[1::2])]
        self.result = Result(*values[2:14])

    async def read_async(self):
        self.data_received.clear()
        await self.data_received.wait()
        return self.result

    async def read_loop(self):
        self.port.reset_input_buffer()
        while True:
            if self.port.in_waiting >= 32:
                self.read()
                self.port.reset_input_buffer()
                self.data_received.set()
                Status.instance['pms'] = self.result.as_json()
            await asyncio.sleep(0.5)

