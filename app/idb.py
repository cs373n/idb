# pylint: disable = invalid-name
# pylint: disable = import-error
# pylint: disable = missing-docstring
# pylint: disable = no-member
# pylint: disable = no-name-in-module
# pylint: disable = relative-import
# pylint: disable = ungrouped-imports
# pylint: disable = unused-argument
# pylint: disable = wrong-import-order
# pylint: disable = wrong-import-position


"""
Main Flask application. Flask reroutes the request from a browser (e.g., marveldb.net/)
to the appropriate function with the @app.route('/') decorator

APIManager creates the Flask-Restless application which serves requests made to the
database.  The manager decalaration includes the models, types of API requests, and number
of results returned per page
"""


from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask.exthook import ExtDeprecationWarning
from models import Character, Event, Creator, Series

# latest stable version of flask-restless uses deprecated import syntax
import warnings
warnings.simplefilter('ignore', ExtDeprecationWarning)
import flask.ext.restless


app = Flask(__name__)

CORS(app, headers=['Content-Type'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:idb@localhost/marveldb'
app.config['SQLALCHEMY_POOL_SIZE'] = 100

db = SQLAlchemy(app)

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
