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

import flask
import flask_sqlalchemy
import flask_restless

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db, Character, Comic, Creator, Event, Series


from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import ForeignKey
from flask import request


app = Flask(__name__)

app.config['DEBUG'] = False

CORS(app, headers=['Content-Type'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:idb@localhost/marveldb'
app.config['SQLALCHEMY_POOL_SIZE'] = 100

#db = SQLAlchemy(app)
db.init_app(app)


manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Character,  collection_name='characters', allow_functions=True, allow_client_generated_ids=True, allow_to_many_replacement=True, allow_delete_from_to_many_relationships=True, methods=['GET', 'POST', 'DELETE', 'PATCH'], page_size=6)

manager.create_api(Comic,  collection_name='comics', allow_functions=True ,allow_client_generated_ids=True, allow_to_many_replacement=True, allow_delete_from_to_many_relationships=True, methods=['GET', 'POST', 'DELETE', 'PATCH'], page_size=6)

manager.create_api(Creator, collection_name='creators', allow_functions=True, allow_client_generated_ids=True, allow_to_many_replacement=True, allow_delete_from_to_many_relationships=True, methods=['GET', 'POST', 'DELETE', 'PATCH'], page_size=6)

manager.create_api(Event, collection_name='events', allow_functions=True, allow_client_generated_ids=True,  allow_to_many_replacement=True, allow_delete_from_to_many_relationships=True, methods=['GET', 'POST', 'DELETE', 'PATCH'], page_size=6)

manager.create_api(Series, collection_name='series', allow_functions=True, allow_client_generated_ids=True, allow_to_many_replacement=True, allow_delete_from_to_many_relationships=True, methods=['GET', 'POST', 'DELETE', 'PATCH'], page_size=6)

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
