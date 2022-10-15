import numpy as np
import sqlite3
import sqlalchemy
import json 

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
from flask_cors import CORS

# ########################################
# Database set-up
# ########################################

engine1 = create_engine("sqlite:///resources/arrivals.sqlite")
engine2 = create_engine("sqlite:///resources/barchart.sqlite")
engine3 = create_engine("sqlite:///resources/world.sqlite")

# reflect existing
Base1 = automap_base()
Base2 = automap_base()
Base3 = automap_base()
# reflect the tables

Base1.prepare(engine1, reflect=True)
Base2.prepare(engine2, reflect=True)
Base3.prepare(engine3, reflect=True)

# save reference to  the table
Arrivals = Base1.classes.arrivals 
Barchart = Base2.classes.barchart
World = Base3.classes.world

# ########################################
# Flask Set up
# ########################################
app = Flask(__name__)
CORS(app)
#  #####################################
# Routes
# ########################################

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/arrivals")
def arrivable():
    # link
    session = Session(engine1)
    db1 = []
    # Query
    results = session.query(Arrivals.year, Arrivals.number).all()
    for i in results:
        arrival = {}
        arrival["year"] = i["year"]
        arrival["number"] = i["number"]
        db1.append(arrival)
    
    session.close()

    return jsonify(db1)
# #################################################################
@app.route("/individuals")
def individual():
    # link
    session = Session(engine2)
    # Query
    results = session.query(Barchart.year, Barchart.total, Barchart.affirmative, Barchart.defensive).all()
    session.close()
    # create dictionary 
    bar_chart = []
    for row in results: 
# year, total, affirmative, defensive in results:
        indiv = {}
        indiv["year"] = row["year"]
        indiv["total"] = row["total"]
        indiv["affirmative"] = row["affirmative"]
        indiv["defensive"] = row["defensive"] 
        bar_chart.append(indiv)

    return jsonify(bar_chart)

@app.route("/world")
def world():
    # link
    session = Session(engine3)
    # Query
    results = session.query(World.country, World.y2012, World.y2013, World.y2014, World.y2015,World.y2016, World.y2017, World.y2018,
    World.y2018, World.y2019, World.y2020, World.y2021).all()
    session.close()
# create a dictionary
    world_data = []
    for row in results:
# country, y2012, y2013, y2014, y2015,y2016, y2017, y2018, y2019, y2020, y2021 in results:
        world_dictionary = {}
        world_dictionary["country"] = row["country"] 
        world_dictionary["y2012"] = row["y2012"]
        world_dictionary["y2013"] = row["y2013"]
        world_dictionary["y2014"] = row["y2014"]
        world_dictionary["y2014"] = row["y2015"]
        world_dictionary["y2016"] = row["y2016"]
        world_dictionary["y2017"] = row["y2017"]
        world_dictionary["y2018"] = row["y2018"]
        world_dictionary["y2019"] = row["y2019"]
        world_dictionary["y2020"] = row["y2020"]
        world_dictionary["y2021"] = row["y2021"]
        world_data.append(world_dictionary)
    return jsonify(world_data)


if __name__ =="__main__":
    app.run(debug=True)
