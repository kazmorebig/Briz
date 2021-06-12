import random
import time
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
        self.port = serial.Serial(port, 9500, serial.EIGHTBITS)
        self.result = None
        self.ax1 = None
        self.queue = asyncio.queues.Queue(1, loop=loop)

    def read(self):
        data = self.port.read(32)
        print('data: ', [f'{d:02x}' for d in data], len(data))
        values = [int(f'{i1:02x}{i2:02x}', 16) for i1, i2 in zip(data[::2], data[1::2])]
        self.result = Result(*values[2:14])
        self.port.reset_input_buffer()
        return self.result

    def read_mocked(self):
        time.sleep(0.2)
        values = [random.randint(1, 100) for i in range(14)]
        self.result = Result(*values[2:])

    async def read_async(self):
        try:
            self.queue.get_nowait()
        except asyncio.QueueEmpty:
            pass
        return await self.queue.get()

    async def read_loop(self):
        self.port.reset_input_buffer()
        while True:
            if self.port.in_waiting >= 32:
                logger.debug(f'Read loop {self.port.in_waiting}')
                logger.debug(f'Data recieved')
                await self.queue.put(self.read())
            await asyncio.sleep(0.5)

