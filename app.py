import json
import logging
import time
from utils import get_mac_dict
from logging.config import dictConfig
import os.path
from typing import List, Optional

import flask
from flask import Flask, request, send_from_directory
from flask_sock import Sock
from flask_cors import CORS

import program
from triac.controller import Controller
from program_service import ProgramService
from server_config import Configuration
from admin import add_admin, remove_admin, is_admin

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] [%(module)s]\t\t %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'DEBUG',
        'handlers': ['wsgi']
    }
})

PIN_CODE = '123456'
app = Flask(__name__)
CORS(app)
sock = Sock(app)
vents = Controller()
ps = ProgramService(vents)
config = Configuration()

if os.path.exists('programs.json'):
    with open('programs.json', 'r') as f:
        json_data = json.load(f)
        programs: List[program.Program] = program.ProgramSchema(many=True).load(json_data)
else:
    programs = []


def program_by_id(prog_id: str) -> Optional[program.Program]:
    try:
        return next(filter(lambda x: x.id == prog_id, programs))
    except StopIteration:
        return None


def save_programs():
    data = program.ProgramSchema(many=True).dump(programs)
    with open('programs.json', 'w') as f:
        json.dump(data, f)


def my_mac():
    return get_mac_dict().get(request.remote_addr, 'Local')


@app.route("/")
def index():
    return app.send_static_file('index.html')


app.add_url_rule('/history', view_func=index)


@app.route('/assets/<path:path>')
def send_report(path):
    return send_from_directory('static/assets', path)


@app.route("/admin")
def admin():
    return str(int(is_admin(my_mac())))


@app.post('/login')
def login():
    if request.json['pin_code'] == PIN_CODE:
        return str(add_admin(my_mac()))
    else:
        return flask.Response('Invalid pin code', status=403)


@app.route('/logout')
def logout():
    return str(remove_admin(my_mac()))


@sock.route('/status')
def status_sock(ws):
    for status_json in ps.status_generator():
        # status_json['admin'] = str(config.admin)
        ws.send(status_json)


@app.get('/sessions')
def get_sessions():
    return ps.get_sessions()


@app.get('/program/list')
def get_programs():
    return program.ProgramSchema(many=True).dump(programs)


@app.get('/program/<prog_id>')
def get_program(prog_id: str):
    prog = program_by_id(prog_id)
    if prog is not None:
        return program.ProgramSchema().dump(prog)
    return flask.Response("Program not found", status=404)


@app.post('/program')
def add_program():
    if not is_admin(my_mac()):
        return flask.Response("Unauthorized", status=401)
    prog = program.ProgramSchema().load(request.json, partial=['id'])
    programs.append(prog)
    save_programs()
    return program.ProgramSchema().dump(prog)


@app.delete('/program/<prog_id>')
def delete_program(prog_id: str):
    if not is_admin(my_mac()):
        return flask.Response("Unauthorized", status=401)
    prog_to_remove = program_by_id(prog_id)
    if prog_to_remove is not None:
        programs.remove(prog_to_remove)
        save_programs()
        return flask.Response('1')
    else:
        return flask.Response("Program not found", status=404)


@app.put('/program/<prog_id>')
def update_program(prog_id: str):
    if not is_admin(my_mac()):
        return flask.Response("Unauthorized", status=401)
    prog = program_by_id(prog_id)
    if prog is not None:
        new_prog = program.ProgramSchema().load(request.json, partial=True)
        for key, value in new_prog.__dict__.items():
            if value is not None:
                setattr(prog, key, value)
        save_programs()
        return program.ProgramSchema().dump(prog)
    return flask.Response("Program not found", status=404)


@app.route('/program/run/<prog_id>')
def run_program(prog_id):
    prog = program_by_id(prog_id)
    if prog is None:
        return flask.Response("Program not found", status=404)
    starter_ip = request.remote_addr
    starter_mac = get_mac_dict().get(starter_ip, 'Unknown')
    ps.start_program(prog, starter_mac)
    return flask.Response('1')


@app.route('/program/stop/<prog_id>')
def stop_program(prog_id):
    ps.stop_program()
    return flask.Response('1')


@app.route('/program/pause/<prog_id>')
def pause_program(prog_id):
    ps.pause_program()
    return flask.Response('1')


@app.route('/program/resume/<prog_id>')
def resume_program(prog_id):
    ps.resume_program()
    return flask.Response('1')