import requests, json, time, datetime, hashlib
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://*******:********@localhost/marveldb'
db = SQLAlchemy(app)


class Series(db.Model):
    series_id = db.Column(db.String(10), primary_key=True)
    series_title = db.Column(db.String(150))
    series_desc = db.Column(db.String(1300))
    series_url = db.Column(db.String(150))		# image url? 
    series_start = db.Column(db.String(5))
    series_end = db.Column(db.String(5))
    series_numChars = db.Column(db.String(5))
    series_numComics = db.Column(db.String(5))
    series_numEvents = db.Column(db.String(5))

    def __init__(self, series_id, series_title, series_desc, series_url, 
		 series_start, series_end, series_numChars, series_numComics, series_numEvents):
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


class Characters(db.Model):
	character_id = db.Column(db.String(10), primary_key=True)
	character_name = db.Column(db.String(150))
    character_url = db.Column(db.String(150))
    character_height = db.Column(db.String(5))
    character_weight = db.Column(db.String(5))
    character_type = db.Column(db.String(50))
    
    def __init__(self, character_id, character_name, character_url, 
		 character_height, character_weight, character_type):
	self.character_id = series_id        
	self.character_name = series_title
    self.character_url = character_url
	self.character_height = character_height
	self.character_weight = character_weight
	self.character_type = character_type			



class Events(db.Model):
	event_id = db.Column(db.String(10), primary_key=True)
	event_title = db.Column(db.String(150))
	event_url = db.Column(db.String(150))
	event_desc = db.Column(db.String(1300))


	def __init__(self, event_id, event_title, event_url, event_desc):
	self.event_id = event_id
	self.event_title = event_title
	self.event_url = event_url
	self.event_desc = event_desc




class Comics(db.Model):
	comic_id = db.Column(db.String(10))
	comic_name = db.Column(db.String(150))
	comic_desc = db.Column(db.String(1300))
	comic_url = db.Column(db.String(150))
	comic_UPC = db.Column(db.String(50))
	comic_pageCt = db.Column(db.String(10))
	comic_price = db.Column(db.String(10))


	def __init__(self, comic_id, comic_name, comic_desc, comic_url, comic_UPC,
		comic_pageCt, comic_price):
	self.comic_id = comic_id
	self.comic_name = comic_name
	self.comic_desc = comic_desc
	self.comic_url = comic_url
	self.comic_UPC = comic_UPC
	self.comic_pageCt = comic_pageCt
	self.comic_price = comic_price




class MarvelRequest():
    def __init__(self):
        self.privateKey = "******************************"
        self.publicKey = "**********************"
        self.timeStamp = str(datetime.datetime.utcnow())
        self.baseurl = "http://gateway.marvel.com/v1/public/"

    # Marvel requires MD5 hash code for server side access
    # Must be ts+publickey+privatekey
    def compute_md5(self):
        return hashlib.md5((self.timeStamp + self.privateKey + self.publicKey).encode('utf-8')).hexdigest()

    def request(self, endpoint, offset):
        # Parameters for the call to Marvel API
        payload = {"ts": self.timeStamp, "apikey": self.publicKey, "hash": self.compute_md5(), "offset": offset}

        # Make the HTTP request, return a Response object
        return requests.get(self.baseurl + endpoint, params=payload)


def main():
	marvel = MarvelRequest()

	"""
	json.loads(String) takes in json formatted string, and outputs 
	 data according to the conversion table at json library website
	"""

	index = 0

	for offset in range(0, 10000, 20):

	    response = marvel.request("series", offset)  # No trailing slash allowed here
	    print(response.status_code)
	    assert response.status_code == 200
	    series = json.loads(response.text)
	    
	    idNum = ""
	    title = ""
	    desc = ""
	    path = ""
	    start = ""
	    end = ""
           numChars = ""
	    numComics = ""
	    numEvents = ""    


	    for series_meta_keys, series_meta_data in series['data'].items():
		# series_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
		if series_meta_keys == 'results':
		    for series in series_meta_data:
			#if series['id'] != "":
			if series['description'] != "":
			    for series_attribute_keys, series_attribute in series.items():
				# now stepping through title, description, thumbnail, etc.
				if series_attribute_keys == 'id':
				    idNum = str(series_attribute)
				    #idNum = idNum.encode('utf-8')
				
				elif series_attribute_keys == 'title':
				    title = series_attribute
				    title = title.encode('utf-8')
				    #print('Title: ' + title)

				elif series_attribute_keys == 'description':
				    if series_attribute != None:
					"""
					Error arose when using str(description) and 
					transferring output to text file: You must not
					use str(...) to strip away unicode symbols
					that often appear in Marvel descriptions!
					"""
					desc = series_attribute
					desc = desc.encode('utf-8')
					#print('Description: ' + desc)

				elif series_attribute_keys == 'thumbnail':
				    path = str(series_attribute['path'] + '.' + series_attribute['extension'])
				    print(path)		
			
				elif series_attribute_keys == 'startYear':
				    #print("Start Year: " + str(series_attribute))
				    start = str(series_attribute)

				elif series_attribute_keys == 'endYear':
				    #print("End Year: " + str(series_attribute))
				    end = str(series_attribute)

				elif series_attribute_keys == 'characters':
				    #print("Characters in series: " + str(series_attribute['available']))
				    numChars = str(series_attribute['available'])
				    #for character in series_attribute['items']:
				    #    name = character['name']
				    #    name = name.encode('utf-8')
				    #    print("Characters: " + name)
				
				elif series_attribute_keys == 'comics':
				    #print("Comics in series: " + str(series_attribute['available']))
				    numComics = str(series_attribute['available'])
				    #for comic in series_attribute['items']:
				    #    name = comic['name']
				    #    name = name.encode('utf-8')
				    #    print("Comics: " + name)

				elif series_attribute_keys == 'events':
				    #print("Number of events in series: " + str(series_attribute['available']))
				    numEvents = str(series_attribute['available'])
				    #for events in series_attribute['items']:
				    #    print("Events: " + events['name'])

			    #print('\n')
			    newEntry = Series(idNum, title, desc, path, start, end, numChars, numComics, numEvents)
			    db.session.merge(newEntry)
			    db.session.commit()
			    index += 1	
			    print("processed series " + str(index))

if __name__ == '__main__':
  main()

