from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import ForeignKey
#from flask_whooshee import Whooshee # index and search joined queries


# establish connection between flask app and database
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:idb@localhost/marveldb'
db = SQLAlchemy(app)


# many-to-many relationship tables
creator_series = db.Table('creator_series', 
    db.Column('creator_id', db.Integer, ForeignKey('creator.id')), 
    db.Column('series_id', db.Integer, ForeignKey('series.id'))
)
creator_events = db.Table('creator_event',
    db.Column('creator_id', db.Integer, ForeignKey('creator.id')),
    db.Column('event_id', db.Integer, ForeignKey('event_id'))
)
character_series = db.Table('character_series',
    db.Column('character_id', db.Integer, ForeignKey('character.id')),
    db.Column('series_id', db.Integer, ForeignKey('series.id'))
)
character_event = db.Table('character_event',
    db.Column('character_id', db.Integer, ForeignKey('character.id')),
    db.Column('event_id', db.Integer, ForeignKey('event.id'))
)
event_series = db.Table('event_id',
    db.Column('event_id', db.Integer, ForeignKey('event.id')),
    db.Column('series_id', db.Integer, ForeignKey('series.id'))
)



# Models a series object. 
class Series(db.Model):
    id = db.Column(db.Integer, primary_key=True)	
    title = db.Column(db.String(150))		# string or unicode?
    desc = db.Column(db.String(1300))	 
    start = db.Column(db.Integer)		
    end = db.Column(db.Integer)
    img = db.Column(db.String(150)) 
    num_creators = db.Column(db.Integer)
    num_characters = db.Column(db.Integer)
    num_comics = db.Column(db.Integer)
    num_events = db.Column(db.Integer)
    
    # one-to-many
    #comics = db.relationship('Comic', backref='series', lazy='dynamic')


    # many-to-many
    # characters, events, creator


    def __init__(self, id, title, desc, start, end, img, num_creators, num_characters, num_comics, num_events):
    	assert title != ""
        #assert series_desc != ""
        assert img != ""
        assert start > 0
        assert end > 0

    	self.id = id 
    	self.title = title
    	self.desc = desc
    	self.start = start
    	self.end = end
        self.img = img
        self.num_creators = num_creators
        self.num_characters = num_characters
        self.num_comics = num_comics
        self.num_events = num_events



# Models a Character object
class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    desc = db.Column(db.String(1300))
    img = db.Column(db.String(150))
    num_comics = db.Column(db.Integer)
    num_series = db.Column(db.Integer)
    num_events = db.Column(db.Integer)
    

    def __init__(self, id, name, desc, img, num_comics, num_series, num_events):
    	assert name != ""

       # assert img != ""
       

    	self.id = id        
    	self.name = name
    	self.desc = desc
    	self.img = img
        self.num_comics = num_comics
        self.num_series = num_series
        self.num_events = num_events
				


# Models an Event object
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    desc = db.Column(db.String(1300))
    img = db.Column(db.String(150))
    num_creators = db.Column(db.Integer)
    num_characters = db.Column(db.Integer)
    num_comics = db.Column(db.Integer)
    num_series = db.Column(db.Integer)

   

    def __init__(self, id, title, desc, img, num_creators, num_characters, num_comics, num_series):

    	self.id = id
    	self.title = title
    	self.desc = desc
    	self.img = img
        self.num_creators = num_creators
        self.num_characters = num_characters
        self.num_comics = num_comics
        self.num_series = num_series


# Models a Creator object
class Creator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150))
    img = db.Column(db.String(150))
    num_comics = db.Column(db.Integer)
    num_series = db.Column(db.Integer)
    num_events = db.Column(db.Integer)


    def __init__(self, id, full_name, img, num_comics, num_series, num_events):
        

    	self.id = id
    	self.full_name = full_name
    	self.img = img
        self.num_comics = num_comics
        self.num_series = num_series
        self.num_events = num_events
