import collections
import itertools
import json
import operator

import marshmallow as ma
from typing import List, Dict, Union

import os
import bisect


class NonUniqueProgramName(ValueError):
    pass


class Action:
    def __init__(self, duration, power):
        self.duration = duration
        self.power = power


class Program:
    def __init__(self, id, name, description, actions):
        self.id = id
        self.name = name
        self.description = description
        self.actions: List[Action] = actions
        self.duration = sum([n.duration for n in self.actions])
        self.node_times = list(itertools.accumulate([n.duration for n in self.actions]))

    def __str__(self):
        return self.name

    def is_active(self, time):
        return time < self.duration

    def get_power(self, time):
        if 0 <= time < self.duration:
            index = bisect.bisect(self.node_times, time)
            return self.actions[index].power
        return 0

    def get_remaining_time(self, time):
        if 0 <= time < self.duration:
            return self.duration - time
        return 0


class ProgramContainer(collections.MutableMapping):
    def __init__(self, programs: List[Program]):
        self.programs = programs
        self._programs_dict = {p.id: p for p in self.programs}

    def add(self, program: Program):
        if program.name in {p.name for p in self.programs}:
            raise NonUniqueProgramName(program.name)
        if program.id is None:
            program.id = max(self._programs_dict.keys()) + 1
        self.programs[program.id] = program
        return program

    def modify(self, program: Program):
        if program.id not in self:
            raise KeyError(program.id)
        self.programs[program.id] = program

    def __getitem__(self, item):
        if isinstance(item, Program):
            return self.programs[item.id]
        elif isinstance(item, int):
            return self.programs[item]
        raise TypeError

    def __setitem__(self, key, value):
        raise NotImplementedError('Use explicit methods: add(), modify()')

    def __delitem__(self, key):
        raise NotImplementedError('Use explicit method: remove()')

    def __iter__(self):
        return iter(self.programs)

    def __len__(self):
        return len(self.programs)


class ActionSchema(ma.Schema):
    type = ma.fields.Int(validate=ma.fields.validate.Range(min=0))
    duration = ma.fields.Int(validate=ma.fields.validate.Range(min=0))
    value = ma.fields.Int(validate=ma.fields.validate.Range(min=0, max=100))

    @ma.post_load
    def make_node(self, data, **kwargs):
        if data['type'] == 0:
            return Action(data['duration'], data['value'])


class ProgramSchema(ma.Schema):
    id = ma.fields.Int()
    name = ma.fields.String(required=True)
    description = ma.fields.String()
    actions = ma.fields.Nested(ActionSchema, many=True)

    @ma.post_load
    def make_program(self, data, **kwargs):
        return Program(**data)


class ProgramListSchema(ma.Schema):
    programs = ma.fields.Nested(ProgramSchema, many=True)

    @ma.post_load
    def make_program_list(self, data, **kwargs):
        return ProgramContainer(**data)

