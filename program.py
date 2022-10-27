import collections
import itertools
import json
import marshmallow as ma
from typing import List, Dict

import os
import bisect


class NonUniqueProgramName(ValueError):
    pass


class Node:
    def __init__(self, duration, power):
        self.duration = duration
        self.power = power


class Program:
    def __init__(self, name, description, nodes):
        self.name = name
        self.description = description
        self.nodes: List[Node] = nodes
        self.duration = sum([n.duration for n in self.nodes])
        self.node_times = list(itertools.accumulate([n.duration for n in self.nodes]))

    def is_active(self, time):
        return time < self.duration

    def get_power(self, time):
        if 0 <= time < self.duration:
            index = bisect.bisect(self.node_times, time)
            return self.nodes[index].power
        return 0


class ProgramContainer(collections.MutableMapping):
    def __init__(self, programs: List[Program]):
        self._programs: Dict[str, Program] = {p.name: p for p in programs}

    def add(self, program: Program):
        if program.name in self:
            raise NonUniqueProgramName(program.name)
        self._programs[program.name] = program

    def modify(self, program: Program):
        if program.name not in self:
            raise KeyError(program.name)
        self._programs[program.name] = program

    def remove(self, program: Program):
        self._programs.pop(program.name)

    def __getitem__(self, item):
        if isinstance(item, Program):
            return self._programs[item.name]
        elif isinstance(item, str):
            return self._programs[item]
        raise TypeError

    def __setitem__(self, key, value):
        raise NotImplementedError('Use explicit methods: add(), modify()')

    def __delitem__(self, key):
        raise NotImplementedError('Use explicit method: remove()')

    def __iter__(self):
        return iter(self._programs)

    def __len__(self):
        return len(self._programs)


class NodeSchema(ma.Schema):
    duration = ma.fields.Int(validate=ma.fields.validate.Range(min=0))
    power = ma.fields.Int(validate=ma.fields.validate.Range(min=0, max=100))

    @ma.post_load
    def make_node(self, data, **kwargs):
        return Node(**data)


class ProgramSchema(ma.Schema):
    name = ma.fields.String(required=True)
    description = ma.fields.String()
    nodes = ma.fields.Nested(NodeSchema, many=True)

    @ma.post_load
    def make_program(self, data, **kwargs):
        return Program(**data)


class ProgramListSchema(ma.Schema):
    programs = ma.fields.Nested(ProgramSchema, many=True)

    @ma.post_load
    def make_program_list(self, data, **kwargs):
        return ProgramContainer(**data)

