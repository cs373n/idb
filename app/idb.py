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
#from flask.exthook import ExtDeprecationWarning
#from models import Character, Comic, Creator, Event, Series
from models import db, Character, Comic, Creator, Event, Series



from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import ForeignKey
from flask import request



# latest stable version of flask-restless uses deprecated import syntax
#import warnings
#warnings.simplefilter('ignore', ExtDeprecationWarning)
#import flask.ext.restless

app = Flask(__name__)

app.config['DEBUG'] = False

CORS(app, headers=['Content-Type'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:idb@localhost/marveldb'
app.config['SQLALCHEMY_POOL_SIZE'] = 100

#db = SQLAlchemy(app)
db.init_app(app)
#
## many-to-many relationship tables
#character_series = db.Table('character_series',
#                            db.Column(
#                                'character_id', db.Integer, ForeignKey('character.id')),
#                            db.Column(
#                                'series_id', db.Integer, ForeignKey('series.id'))
#                           )
#comic_series = db.Table('comic_series',
#                        db.Column(
#                            'comic_id', db.Integer, ForeignKey('comic.id')),
#                        db.Column(
#                            'series_id', db.Integer, ForeignKey('series.id'))
#                       )
#creator_series = db.Table('creator_series',
#                          db.Column(
#                              'creator_id', db.Integer, ForeignKey('creator.id')),
#                          db.Column(
#                              'series_id', db.Integer, ForeignKey('series.id'))
#                         )
#event_series = db.Table('event_series',
#                        db.Column(
#                            'event_id', db.Integer, ForeignKey('event.id')),
#                        db.Column(
#                            'series_id', db.Integer, ForeignKey('series.id'))
#                       )
#character_event = db.Table('character_event',
#                           db.Column(
#                               'character_id', db.Integer, ForeignKey('character.id')),
#                           db.Column(
#                               'event_id', db.Integer, ForeignKey('event.id'))
#                          )
#comic_event = db.Table('comic_event',
#                       db.Column(
#                           'comic_id', db.Integer, ForeignKey('comic.id')),
#                       db.Column(
#                           'event_id', db.Integer, ForeignKey('event.id'))
#                      )
#
#creator_event = db.Table('creator_event',
#                         db.Column(
#                             'creator_id', db.Integer, ForeignKey('creator.id')),
#                         db.Column(
#                             'event_id', db.Integer, ForeignKey('event.id'))
#                        )
#character_comic = db.Table('character_comic',
#                           db.Column(
#                               'character_id', db.Integer, ForeignKey('character.id')),
#                           db.Column(
#                               'comic_id', db.Integer, ForeignKey('comic.id'))
#                          )
#comic_creator = db.Table('comic_creator',
#                         db.Column(
#                             'comic_id', db.Integer, ForeignKey('comic.id')),
#                         db.Column(
#                             'creator_id', db.Integer, ForeignKey('creator.id'))
#                        )
#
#
#
## Models a series object.
#class Series(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    title = db.Column(db.String(150))
#    desc = db.Column(db.String(1300))
#    start = db.Column(db.Integer)
#    end = db.Column(db.Integer)
#    img = db.Column(db.String(150))
#    num_creators = db.Column(db.Integer)
#    num_characters = db.Column(db.Integer)
#    num_comics = db.Column(db.Integer)
#    num_events = db.Column(db.Integer)
#
#    characters = db.relationship(
#        'Character', secondary=character_series, backref=db.backref('series', lazy='dynamic'))
#    comics = db.relationship(
#        'Comic', secondary=comic_series, backref=db.backref('series', lazy='dynamic'))
#    creators = db.relationship(
#        'Creator', secondary=creator_series, backref=db.backref('series', lazy='dynamic'))
#    events = db.relationship(
#        'Event', secondary=event_series, backref=db.backref('series', lazy='dynamic'))
#
##    def __init__(self, id, title, desc, start, end, img, num_creators,
##                 num_characters, num_comics, num_events):
##        assert title != ""
##        assert img != ""
##        assert start > 0
##        assert end > 0
##
##        self.id = id
##        self.title = title
##        self.desc = desc
##        self.start = start
##        self.end = end
##        self.img = img
##        self.num_creators = num_creators
##        self.num_characters = num_characters
##        self.num_comics = num_comics
##        self.num_events = num_events
##
#
## Models a Character object
#class Character(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(50))
#    desc = db.Column(db.String(1300))
#    img = db.Column(db.String(150))
#    num_comics = db.Column(db.Integer)
#    num_series = db.Column(db.Integer)
#    num_events = db.Column(db.Integer)
#
#    events = db.relationship(
#        'Event', secondary=character_event, backref=db.backref('characters', lazy='dynamic'))
#    comics = db.relationship(
#        'Comic', secondary=character_comic, backref=db.backref('characters', lazy='dynamic'))
#
##    def __init__(self, id, name, desc, img, num_comics, num_series, num_events):
##        assert name != ""
##
##        self.id = id
##        self.name = name
##        self.desc = desc
##        self.img = img
##        self.num_comics = num_comics
##        self.num_series = num_series
##        self.num_events = num_events
##
#
## Models an Event object
#class Event(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    title = db.Column(db.String(150))
#    desc = db.Column(db.String(1300))
#    img = db.Column(db.String(150))
#    num_creators = db.Column(db.Integer)
#    num_characters = db.Column(db.Integer)
#    num_comics = db.Column(db.Integer)
#    num_series = db.Column(db.Integer)
#
#    creators = db.relationship(
#        'Creator', secondary=creator_event, backref=db.backref('events', lazy='dynamic'))
#    comics = db.relationship(
#        'Comic', secondary=comic_event, backref=db.backref('events', lazy='dynamic'))
#
##    def __init__(self, id, title, desc, img, num_creators, num_characters, num_comics, num_series):
##
##        self.id = id
##        self.title = title
##        self.desc = desc
##        self.img = img
##        self.num_creators = num_creators
##        self.num_characters = num_characters
##        self.num_comics = num_comics
##        self.num_series = num_series
##
#
## Models a Creator object
#class Creator(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    full_name = db.Column(db.String(150))
#    img = db.Column(db.String(150))
#    num_comics = db.Column(db.Integer)
#    num_series = db.Column(db.Integer)
#    num_events = db.Column(db.Integer)
#
#    comics = db.relationship(
#        'Comic', secondary=comic_creator, backref=db.backref('creators', lazy='dynamic'))
#
##    def __init__(self, id, full_name, img, num_comics, num_series, num_events):
##
##        self.id = id
##        self.full_name = full_name
##        self.img = img
##        self.num_comics = num_comics
##        self.num_series = num_series
##        self.num_events = num_events
##
#
## Models a Comic object
#class Comic(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    title = db.Column(db.String(150))
#    issue_num = db.Column(db.Integer)
#    desc = db.Column(db.String(2500))
#    upc = db.Column(db.String(30))
#    pg_ct = db.Column(db.Integer)
#    price = db.Column(db.Float)
#    img = db.Column(db.String(150))
#    num_creators = db.Column(db.Integer)
#    num_characters = db.Column(db.Integer)
#    num_events = db.Column(db.Integer)
#

manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)
with app.app_context():
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
