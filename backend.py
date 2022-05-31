import dataclasses as dc
import json
import asyncio

from sanic.log import logger
from enum import Enum
from typing import List, Optional
from copy import deepcopy

from triac.controller import vents



class ActionType(Enum):
    SET_POWER = 0


@dc.dataclass
class Action:
    type: ActionType
    duration: int
    value: str

    def __post_init__(self):
        self.type = ActionType(self.type)


@dc.dataclass
class Program:
    id: int
    name: str
    image: str
    description: str
    actions: List[Action]

    @classmethod
    def from_raw_data(cls, data):
        construct_args = deepcopy(data)
        construct_args['actions'] = [Action(**a) for a in construct_args['actions']]
        return cls(**construct_args)


class ProgramService:
    def __init__(self):
        self.current_program: Optional[Program] = None
        self.current_action_id = 0
        self.action_remaining_time = 0

    async def daemon(self):
        while True:
            if self.current_program is not None:
                if self.action_remaining_time <= 0:
                    self.current_action_id += 1
                    if self.current_action_id >= len(self.current_program.actions):
                        self.stop_program()
                    else:
                        self.apply_action(self.current_program.actions[self.current_action_id])
                else:
                    self.action_remaining_time -= 1
            await asyncio.sleep(1.0)

    def stop_program(self):
        logger.debug(f'[PROGRAM] Stop {self.current_program}')
        self.apply_action(Action(ActionType.SET_POWER, 0, "0"))
        self.current_program = None
        self.current_action_id = 0
        self.action_remaining_time = 0

    def start_program(self, program: Program):
        logger.debug(f'[PROGRAM] Start {program.name}:{program.id}')
        self.stop_program()
        self.current_program = program

    def apply_action(self, action: Action):
        logger.debug(f'[ACTION] Apply {action.type}:{action.value}')
        self.action_remaining_time = action.duration
        if action.type == ActionType.SET_POWER:
            vents.set_power(int(action.value))

    @staticmethod
    def get_all_programs():
        with open('settings.json', 'r') as f:
            settings = json.load(f)
            return settings['programs']


program = ProgramService()
