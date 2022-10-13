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
# route to render index.html
@app.route("/")
def home():
# template for index.html 

# https://flask.palletsprojects.com/en/2.2.x/patterns/sqlite3/
# for arrivals
# @app.route("/api/v1.0/from80to2021")
    def connect_to_db():
        db1 = getattr(g, '_database1', None)
        if db1 is None:
            db1 = g._database1 = sqlite3.connect('../resources/arrivals.sqlite')
        return db1

def lite_get_db1():
    db1 = []
    try:
        conn = sqlite3.connect(g._database1)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM arrivals")
        rows = cur.fetchall()

        #covert to dictionary
        for i in rows:
            arrival = {}
            arrival["year"] = i["year"]
            arrival["number"] = i["number"]
            db1.append(arrival)
    except:
            db1=[]

    conn.close()
    return db1
            
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
        conn = sqlite3.connect(g._database2)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM barchart")
        rows = cur.fetchall()

        #covert to dictionary
        for i in rows:
            indiv = {}
            db2["year"] = i["year"]
            db2["total"] = i["total"]
            db2["affirmative"] = i["affirmative"]
            db2["defensive"] = i["defensive"]
            db2.append(indiv)
    except:
            db2=[]
    conn.close()
    return db2


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
        conn = sqlite3.connect(g._database3)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM world")
        rows = cur.fetchall()

        #covert to dictionary
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
    conn.close()
    return db3

# @app.teardown_appcontext
# def close_connection(exception):
#     db3 = getattr(g, '_database3', None)
#     if db3 is not None:
       


@app.route("/")

@app.route("/api/v1.0/from80to2021", methods=['GET'])
def lite_get_db1():
    return jsonify(db1())


@app.route("/api/v1.0/individual-aslyum", methods=['GET'])
def lite_get_db2():
    return jsonify(barchart())


@app.route("/api/v1.0/worldwide", methods=['GET'])
def lite_get_db3():
    return jsonify(db3())




# @app.route('/api/users', methods=['GET'])
# def api_get_users():
 # return jsonify(get_users())

# app= Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ =="__main__":
    app.run(debug=True)




