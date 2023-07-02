import json
import logging
import time
from logging.config import dictConfig
import os.path

import flask
from flask import Flask, request, send_from_directory
from flask_sock import Sock
from flask_cors import CORS

import program
from triac.controller import Controller
from program_service import ProgramService
from server_config import Configuration

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

app = Flask(__name__)
CORS(app)
sock = Sock(app)
vents = Controller()
ps = ProgramService(vents)
config = Configuration()

if os.path.exists('programs.json'):
    with open('programs.json', 'r') as f:
        json_data = json.load(f)
        prog_container: program.ProgramContainer = program.ProgramListSchema().load(json_data)
else:
    prog_container = program.ProgramContainer([])


@app.route("/")
def index():
    return app.send_static_file('index.html')


app.add_url_rule('/history', view_func=index)


@app.route('/assets/<path:path>')
def send_report(path):
    return send_from_directory('static/assets', path)


@app.route("/admin")
def admin():
    return str(config.admin)


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
    return program.ProgramListSchema().dump(prog_container)['programs']


@app.get('/program/<int:prog_id>')
def get_program(prog_id: int):
    try:
        return program.ProgramSchema().dump(prog_container[id])
    except KeyError:
        return flask.Response("Program not found", status=404)


@app.post('/program')
def add_program():
    prog = program.ProgramSchema().load(request.json, partial=['id'])
    prog_container.add(prog)
    return program.ProgramSchema().dump(prog_container[prog])


@app.delete('/program/<int:prog_id>')
def delete_program(prog_id: int):
    try:
        return prog_container.remove(int(flask.escape(prog_id)))
    except KeyError:
        return flask.Response("Program not found", status=404)


@app.put('/rogram/<int:prog_id>')
def update_program(prog_id: int):
    prog = program.ProgramSchema().load(request.json)
    prog_container.modify(prog)
    return program.ProgramSchema().dump(prog_container[prog])


@app.route('/program/run/<prog_id>')
def run_program(prog_id):
    prog = prog_container.get(int(flask.escape(prog_id)))
    if prog is None:
        return flask.Response("Program not found", status=404)
    ps.start_program(prog)
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