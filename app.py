# 
import sqlite3
import json


from flask import Flask, jsonify, g
from flask_cors import CORS 

app=Flask(__name__)
CORS(app)

Database1 = '../resources/arrivals.sqlite'
Database2 = '../resources/barchart.sqlite'
Database3 = '../resources/world.sqlite'

@app.route("/")
# template for index.html 

# https://flask.palletsprojects.com/en/2.2.x/patterns/sqlite3/
# for arrivals
@app.route("/api/v1.0/from80to2021")
def connect_to_db():
    db1 = getattr(g, '_database1', None)
    if db1 is None:
        db1 = g._database1 = sqlite3.connect('../resources/arrivals.sqlite')
    return db1

@app.teardown_appcontext
def close_connection(exception):
    db1 = getattr(g, '_database1', None)
    if db1 is not None:
        db1.close()
# barchart 
@app.route("/api/v1.0/individual-aslyum")

def connect_to_db():
    db2 = getattr(g, '_database2', None)
    if db2 is None:
        db2 = g._database2 = sqlite3.connect('../resources/barchart.sqlite')
    return db2




@app.teardown_appcontext
def close_connection(exception):
    db2 = getattr(g, '_database2', None)
    if db2 is not None:
        db2.close()

# for cholopath
@app.route("/api/v1.0/worldwide")
def connect_to_db():
    db3 = getattr(g, '_database3', None)
    if db3 is None:
        db3 = g._database3 = sqlite3.connect('../resources/world.sqlite')
    return db3
@app.teardown_appcontext
def close_connection(exception):
    db3 = getattr(g, '_database3', None)
    if db3 is not None:
        db3.close()
# app= Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})



