
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_whooshee import Whooshee # index and search joined queries


# establish connection between flask app and database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://*******:********@localhost/marveldb'
db = SQLAlchemy(app)



# Models a series object. 
class Series(db.Model):
    series_id = db.Column(db.String(10), primary_key=True)	# string or int?
    series_title = db.Column(db.String(150))		# string or unicode?
    series_desc = db.Column(db.String(1300))
    series_url = db.Column(db.String(150))		# image url? 
    series_start = db.Column(db.String(5))		# int?
    series_end = db.Column(db.String(5))		# int?
    series_numChars = db.Column(db.String(5))
    series_numComics = db.Column(db.String(5))
    series_numEvents = db.Column(db.String(5))

    def __init__(self, series_id, series_title, series_desc, series_url, 
		 series_start, series_end, series_numChars, series_numComics, series_numEvents):
    	assert series_title != ""
        assert series_desc != ""
        assert series_url != ""
        assert series_start > 0
        assert series_end > 0


		self.series_id = series_id        
		self.series_title = series_title
	    self.series_desc = series_desc
		self.series_url = series_url
		self.series_start = series_start
		self.series_end = series_end
		self.series_numChars = series_numChars			# necessary?
		self.series_numComics = series_numComics		
		self.series_numEvents = series_numEvents		

    def __repr__(self):
        return '<User %r>' % self.title


# Models a Character object
class Character(db.Model):
	character_id = db.Column(db.String(10), primary_key=True)
	character_name = db.Column(db.String(150))
    character_url = db.Column(db.String(150))
    character_height = db.Column(db.String(5))		# int?
    character_weight = db.Column(db.String(5))
    character_type = db.Column(db.String(50))
    
    # is ID supposed to be in here?
    def __init__(self, character_id, character_name, character_url, 
		 character_height, character_weight, character_type):
    	assert character_name != ""
        assert character_url != ""
        assert character_height > 0
        assert character_weight >= 0
        assert character_type != ""


		self.character_id = series_id        
		self.character_name = series_title
	    self.character_url = character_url
		self.character_height = character_height
		self.character_weight = character_weight
		self.character_type = character_type			



# Models an Event object
class Events(db.Model):
	event_id = db.Column(db.String(10), primary_key=True)
	event_title = db.Column(db.String(150))
	event_url = db.Column(db.String(150))
	event_desc = db.Column(db.String(1300))


	def __init__(self, event_id, event_title, event_url, event_desc):
		assert event_title != ""
        assert event_url != ""
        assert event_desc != ""

		self.event_id = event_id
		self.event_title = event_title
		self.event_url = event_url
		self.event_desc = event_desc



# Models a Comic object
class Comic(db.Model):
	comic_id = db.Column(db.String(10))
	comic_name = db.Column(db.String(150))
	comic_desc = db.Column(db.String(1300))
	comic_url = db.Column(db.String(150))
	comic_UPC = db.Column(db.String(50))
	comic_pageCt = db.Column(db.String(10))
	comic_price = db.Column(db.String(10))


	def __init__(self, comic_id, comic_name, comic_desc, comic_url, comic_UPC,
		comic_pageCt, comic_price):
		assert comic_name != ""
        assert comic_desc != ""
        assert comic_url != ""
        assert comic_UPC != ""
        assert comic_pageCt >= 0
        assert comic_price != ""

		self.event_id = event_id
		self.event_title = event_title
		self.event_url = event_url
		self.event_desc = event_desc