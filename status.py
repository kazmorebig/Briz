import asyncio

import json

import sanic

from typing import List, Callable, Optional, Tuple

from sanic import Sanic
from sanic.response import BaseHTTPResponse
from sanic.log import logger



class Status:
    instance = None

    def __init__(self, loop):
        Status.instance = self
        self._status = {}
        self._updated_status = {}
        self._status_changed = asyncio.Event(loop=loop)
        self.loop = loop
        self.responders: List[BaseHTTPResponse] = []

    def __setitem__(self, key, value):
        if self._status.get(key) != value:
            self._updated_status[key] = value
            self._status_changed.set()

    def __getitem__(self, item):
        raise NotImplementedError('Status items cannot be accessed')

    async def add_responder(self, responder: BaseHTTPResponse):
        if len(self._status):
            await responder.send(json.dumps(self._status), False)
        self.responders.append(responder)
        responder_index = len(self.responders) - 1
        try:
            await asyncio.Event().wait()  # Wait forever
        except asyncio.CancelledError:
            self.responders.pop(responder_index)
            logger.debug(f'Disconnected client')
            raise asyncio.CancelledError

    async def daemon(self):
        while True:
            await self._status_changed.wait()
            for i, resp in enumerate(self.responders):
                logger.debug(f'Sending: {self._updated_status}')
                await resp.send(json.dumps(self._updated_status), False)
            self._status.update(self._updated_status)
            self._updated_status.clear()
            self._status_changed.clear()

