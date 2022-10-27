import json
import os.path

import flask
from flask import Flask, request
from flask_sock import Sock

import program

app = Flask(__name__)
sock = Sock(app)

if os.path.exists('programs.json'):
    with open('programs.json', 'r') as f:
        prog_container: program.ProgramContainer = program.ProgramListSchema().load(json.load(f))
else:
    prog_container = program.ProgramContainer([])


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.get('/program/list')
def get_programs():
    return program.ProgramListSchema().dump(prog_container)


@app.get('/program/<name>')
def get_program(name):
    try:
        return program.ProgramSchema().dump(prog_container[name])
    except KeyError:
        return flask.Response("Program not found", status=404)


@app.post('/program/add')
def add_program():
    prog = program.ProgramSchema().load(request.json)
    prog_container.add(prog)
    return program.ProgramSchema().dump(prog_container[prog])


@app.route('/program/run/<name>')
def run_program(name):
    prog = prog_container.get(flask.escape(name))
    if prog is None:
        return flask.Response("Program not found", status=404)
    return 1


if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')
