"""
Main Flask application. Flask reroutes the request from a browser (e.g., marveldb.net/) 
to the appropriate function with the @app.route('/') decorator
""" 

from flask import Flask
from flask.ext.cors import CORS
import flask.ext.restless
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, headers=['Content-Type'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:idb@localhost/marveldb'

db = SQLAlchemy(app)

from models import Character, Event, Creator, Series

manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

manager.create_api(Character, methods=['GET'], results_per_page=6)
manager.create_api(Series, methods=['GET'], results_per_page=6)
manager.create_api(Creator, methods=['GET'], results_per_page=6)
manager.create_api(Event, methods=['GET'], results_per_page=6)

@app.route('/<path:path>')
def index(path):
    return flask.render_template('index.html')

@app.route('/')
def home():
	"""
	Displays the index page accessible at '/'
	"""
	return flask.render_template('index.html')


if __name__ == '__main__':
	app.run()
