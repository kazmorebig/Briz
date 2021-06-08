import random
import sanic.app
from http.server import BaseHTTPRequestHandler

import serial
import asyncio
import logging
import dataclasses as dc


logger = logging.getLogger(__name__)

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


class SensorPMS:
    def __init__(self, port, loop=None):
        self.port = serial.Serial(port, 9600)
        self.result = None
        self.ax1 = None
        self.queue = asyncio.queues.Queue(1, loop=loop)

    def read(self):
        offset = self.port.in_waiting - 28
        if offset > 0:
            self.port.seek(offset)
        data = self.port.read(28)
        values = [int(x, 16) for x in data.hex(' ', 2).split()]
        self.result = Result(*values[2:])
        self.port.reset_input_buffer()

    async def read_async(self):
        try:
            self.queue.get_nowait()
        except asyncio.QueueEmpty:
            pass
        return await self.queue.get()

    async def read_loop(self):
        while True:
            if self.port.in_waiting >= 28:
                await self.queue.put(self.read())
            else:
                await asyncio.sleep(0.5)

    async def mock_loop(self):
        while True:
            result_data = [random.randint(1, 100) for i in range(12)]
            await self.queue.put(Result(*result_data))
            await asyncio.sleep(0.5)

