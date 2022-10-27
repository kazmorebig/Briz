import asyncio

import json

import sanic

from typing import List, Callable, Optional, Tuple, Dict

from sanic import Sanic
from sanic.response import BaseHTTPResponse
from sanic.log import logger
from websockets import ConnectionClosedOK


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class Status(metaclass=Singleton):

    def __init__(self, loop=None):
        self._status = {}
        self._updated_status = {}
        self._status_changed = asyncio.Event(loop=loop)
        self.loop = loop
        self.sockets: List = []

    def __setitem__(self, key, value):
        if self._status.get(key) != value:
            self._updated_status[key] = value
            self._status_changed.set()

    def __getitem__(self, item):
        raise NotImplementedError('Status items cannot be accessed')

    async def send_async(self, ws):
        if len(self._status):
            await ws.send(json.dumps(self._status))
        self.sockets.append(ws)
        index = len(self.sockets) - 1
        await asyncio.Event().wait()

    async def daemon(self):
        while True:
            await self._status_changed.wait()
            data = json.dumps(self._updated_status)
            dead_socket = []
            for i, socket in enumerate(self.sockets):
                try:
                    await socket.send(data)
                except ConnectionClosedOK:
                    dead_socket.append(i)
            dead_socket = [self.sockets.pop(i) for i in sorted(dead_socket, reverse=True)]
            if len(dead_socket) > 0:
                logger.debug(f'Disconnected sockets: {len(dead_socket)}')
            self._status.update(self._updated_status)
            self._updated_status.clear()
            self._status_changed.clear()
