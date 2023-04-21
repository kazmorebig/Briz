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

program_list = []
if os.path.exists('programs.json'):
    with open('programs.json', 'r') as f:
        json_data = json.load(f)
        prog_container: program.ProgramContainer = program.ProgramListSchema().load(json_data)
        program_list = json_data.get('programs', [])
else:
    prog_container = program.ProgramContainer([])


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route('/assets/<path:path>')
def send_report(path):
    return send_from_directory('static/assets', path)


@sock.route('/status')
def status_sock(ws):
    for status_json in ps.status_generator():
        ws.send(status_json)


@app.get('/sessions')
def get_sessions():
    return ps.get_sessions()


@app.get('/program/list')
def get_programs():
    return program_list


@app.get('/program/<int:id>')
def get_program(id: int):
    try:
        return program.ProgramSchema().dump(prog_container[id])
    except KeyError:
        return flask.Response("Program not found", status=404)


@app.post('/program/add')
def add_program():
    prog = program.ProgramSchema().load(request.json)
    prog_container.add(prog)
    return program.ProgramSchema().dump(prog_container[prog])


@app.route('/program/run/<id>')
def run_program(id):
    prog = prog_container.get(int(flask.escape(id)))
    if prog is None:
        return flask.Response("Program not found", status=404)
    ps.start_program(prog)
    return flask.Response('1')


@app.route('/program/stop/<id>')
def stop_program(id):
    ps.stop_program()
    return flask.Response('1')


@app.route('/program/pause/<id>')
def pause_program(id):
    ps.pause_program()
    return flask.Response('1')


@app.route('/program/resume/<id>')
def resume_program(id):
    ps.resume_program()
    return flask.Response('1')