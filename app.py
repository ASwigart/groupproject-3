# 
import sqlite3
import sqlalchemy
import json

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, g
from flask_cors import CORS, cross_origin 



Database1 = '../resources/arrivals.sqlite'
Database2 = '../resources/barchart.sqlite'
Database3 = '../resources/world.sqlite'

def connect_to_db1():
    conn1 = sqlite3.connect(Database1)
    return conn1
def connect_to_db2():
    conn2 = sqlite3.connect(Database2)
    return conn2
def connect_to_db3():
    conn3 = sqlite3.connect(Database3)


# imported from old flask attempt disregard unless needed
# # DB set-up
# engine = create_engine("sqlite:///___________.sqlite")
# # reflect an existing DB
# Base = automap_base()
# # reflect tables
# Base.prepare(engine, reflect=True)
# # save reference to table
# Refugee = Base.classes

# https://flask.palletsprojects.com/en/2.2.x/patterns/sqlite3/
# for arrivals
# @app.route("/api/v1.0/from80to2021")

def connect_to_db1():
    conn = sqlite3.connect('../resources/arrivals.sqlite')
    conn.row_factory = sqlite3.Row
    return conn


def lite_get_db1():
    db1 = []
    try:
        conn1 = sqlite3.connect(g._database1)
        conn1.row_factory = sqlite3.Row
        cur = conn1.cursor()
        cur.execute("SELECT * FROM arrivals")
        rows = cur.fetchall()

        #convert to dictionary
        for i in rows:
            arrival = {}
            arrival["year"] = i["year"]
            arrival["number"] = i["number"]
            db1.append(arrival)
    except:
            db1=[]
    finally:        
        conn1.close()
    return jsonify({arrival})



# @app.teardown_appcontext
# def close_connection(exception):
#     db1 = getattr(g, '_database1', None)
#     if db1 is not None:
        

# barchart 
# @app.route("/api/v1.0/individual-aslyum")

def connect_to_db():
    db2 = getattr(g, '_database2', None)
    if db2 is None:
        db2 = g._database2 = sqlite3.connect('../resources/barchart.sqlite')
    return db2

def lite_get_db2():
    db2 = []
    try:
        conn2 = sqlite3.connect(g._database2)
        conn2.row_factory = sqlite3.Row
        cur = conn2.cursor()
        cur.execute("SELECT * FROM barchart")
        rows = cur.fetchall()

        #convert to dictionary
        for i in rows:
            indiv = {}
            db2["year"] = i["year"]
            db2["total"] = i["total"]
            db2["affirmative"] = i["affirmative"]
            db2["defensive"] = i["defensive"]
            db2.append(indiv)
    except:
            db2=[]
    finally:        
        conn2.close()

    return  jsonify(indiv)


# @app.teardown_appcontext
# def close_connection(exception):
#     db2 = getattr(g, '_database2', None)
#     if db2 is not None:
        

# for cholopath
# @app.route("/api/v1.0/worldwide")
def connect_to_db():
    db3 = getattr(g, '_database3', None)
    if db3 is None:
        db3 = g._database3 = sqlite3.connect('../resources/world.sqlite')
    return db3

def lite_get_db3():
    db3 = []
    try:
        conn3 = sqlite3.connect(g._database3)
        conn3.row_factory = sqlite3.Row
        cur = conn3.cursor()
        cur.execute("SELECT * FROM world")
        rows = cur.fetchall()

        #convert to dictionary
        for i in rows:
            world = {}
            db3["country"] = i["country"]
            db3["2012"] = i["y2012"]
            db3["2013"] = i["y2013"]
            db3["2014"] = i["y2014"]
            db3["2015"] = i["y2015"]
            db3["2016"] = i["y2016"]
            db3["2017"] = i["y2017"]
            db3["2018"] = i["y2018"]
            db3["2019"] = i["y2019"]
            db3["2020"] = i["y2020"]
            db3["2021"] = i["y2021"]
            db3.append(world)
    except:
            db3=[]
    finally:        
        conn3.close()
    return jsonify(world)


# insert    
# db3 =[]
# for i in db3:
#     (print(insert_db3(i)))

# @app.teardown_appcontext
# def close_connection(exception):
#     db3 = getattr(g, '_database3', None)
#     if db3 is not None:
       

app=Flask(__name__)
CORS(app)
#  resources={r"/*":{"origins": "*"}})

@app.route("/")
@cross_origin()

def welcome():
    return (f"welcome")

# ##########################################
@app.route("/arrivals", methods=['GET'])
@cross_origin()

def lite_get_db1():    
        arrivals = {
            "year": "year",
            "number": "number"
        }
        return jsonify(arrivals)


# ########################################
@app.route("/individuals", methods=['GET'])
@cross_origin()
def lite_get_db2():
    return jsonify(lite_get_db2())

# ########################################
@app.route("/world", methods=['GET'])
@cross_origin()
def lite_get_db3():
    return jsonify(lite_get_db3())




# @app.route('/api/users', methods=['GET'])
# def api_get_users():
 # return jsonify(get_users())

# app= Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ =="__main__":
    app.run(debug=True)




