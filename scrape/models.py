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
character_comic = db.Table('character_comic', 
    db.Column('character_id', db.Integer, ForeignKey('character.id')), 
    db.Column('comic_id', db.Integer, ForeignKey('comic.id'))
)
character_series = db.Table('character_series',
    db.Column('character_id', db.Integer, ForeignKey('character.id')),
    db.Column('series_id', db.Integer, ForeignKey('series.id'))
)
character_event = db.Table('character_event',
    db.Column('character_id', db.Integer, ForeignKey('character.id')),
    db.Column('event_id', db.Integer, ForeignKey('event.id'))
)


# Models a series object. 
class Series(db.Model):
    id = db.Column(db.Integer, primary_key=True)	
    title = db.Column(db.String(150))		# string or unicode?
    desc = db.Column(db.String(1300))
    url = db.Column(db.String(150))		 
    start = db.Column(db.Integer)		
    end = db.Column(db.Integer)
    
    # one-to-many
    comics = db.relationship('Comic', backref='series', lazy='dynamic')

    # many-to-many
    # characters, events

    def __init__(self, id, title, desc, img, start, end):
    	assert title != ""
        #assert series_desc != ""
        assert img != ""
        assert start > 0
        assert end > 0

	self.id = id        
	self.title = title
	self.desc = desc
	self.img = img
	self.start = start
	self.end = end


# Models a Character object
class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    desc = db.Column(db.String(1300))
    img = db.Column(db.String(150))
    
    #character_height = db.Column(db.String(5))		# int?
    #character_weight = db.Column(db.String(5))
    #character_type = db.Column(db.String(50))
    
    def __init__(self, id, name, desc, img):
    	assert name != ""
        assert img != ""
        #assert character_height > 0
        #assert character_weight >= 0
        #assert character_type != ""

	self.id = id        
	self.name = name
	self.desc = desc
	self.img = img
	#self.character_height = character_height
	#self.character_weight = character_weight
	#self.character_type = character_type			


# Models an Event object
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    desc = db.Column(db.String(1300))
    img = db.Column(db.String(150))
    
    # one-to-many
    comics = db.relationship('Comic', backref='event', lazy='dynamic')
    

    def __init__(self, id, title, desc, img):
	assert event_title != ""
        assert event_url != ""
        assert event_desc != ""

	self.id = id
	self.title = title
	self.desc = desc
	self.img = img



# Models a Comic object
class Comic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    issue = db.Column(db.Integer)
    desc = db.Column(db.String(1300))
    upc = db.Column(db.Integer)
    pages = db.Column(db.Integer)
    price = db.Column(db.Float)  
    img = db.Column(db.String(150))

    # one-to-one
    series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    

    def __init__(self, id, title, issue, desc, upc, pages, price, img):
        assert comic_name != ""
        #assert comic_desc != ""
        assert img != ""
        #assert comic_UPC != ""
        assert comic_pages >= 0
        #assert comic_price != ""

	self.id = id
	self.title = title
	self.issue = issue
	self.desc = desc
	self.upc = upc
	self.pages = pages
	self.price = price
	self.img = img
