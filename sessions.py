import collections
import csv
import json
import os
import time
from typing import List


class Sessions:

    Session = collections.namedtuple('Session', ['program', 'start', 'end'])

    def __init__(self):
        self.sessions: List[Sessions.Session] = []
        self.current_session = None
        self.read()

    def read(self, filename='sessions.csv'):
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                self.sessions = [Sessions.Session(*s) for s in csv.reader(f)]

    def write(self, filename='sessions.csv'):
        with open(filename, 'w') as f:
            writer = csv.writer(f)
            for s in self.sessions:
                writer.writerow(tuple(s))

    def start(self, program_name='Unknown'):
        self.current_session = [program_name, time.time()]

    def stop(self):
        if self.current_session is not None:
            self.current_session.append(time.time())
            self.sessions.append(Sessions.Session(*self.current_session))
            self.write()
            self.current_session = None

    def json(self):
        data = [s._asdict() for s in self.sessions]
        return json.dumps(data)
