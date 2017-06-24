import requests, json, time, datetime, hashlib
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://XXXXX:XXXXX@localhost/idb_chars'      
db = SQLAlchemy(app)


class Series(db.Model):
    title = db.Column(db.String(150), primary_key=True)
    description = db.Column(db.String(1300))
    num_characters = db.Column(db.String(5))
    start_year = db.Column(db.String(5), primary_key=True)
    end_year = db.Column(db.String(5), primary_key=True)
    num_events = db.Column(db.String(5))

    def __init__(self, title, description, num_characters, start_year,
		 end_year, num_events):
        self.title = title
        self.description = description
	self.num_characters = num_characters
	self.start_year = start_year
	self.end_year = end_year
	self.num_events = num_events

    def __repr__(self):
        return '<User %r>' % self.title


class MarvelRequest():
    def __init__(self):
        self.privateKey = "*******************************"
        self.publicKey = "*******************************"
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

	for offset in range(0, 100000, 20):

	    response = marvel.request("series", offset)  # No trailing slash allowed here
	    print(response.status_code)
	    assert response.status_code == 200
	    series = json.loads(response.text)

	    temp_title = ""
	    desc = ""
	    numChars = ""
	    startYear = ""
	    endYear = ""
	    numEvents = ""    


	    for series_meta_keys, series_meta_data in series['data'].items():
		# series_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
		if series_meta_keys == 'results':
		    for series in series_meta_data:
			if series['description'] != "":
			    for series_attribute_keys, series_attribute in series.items():
				# now stepping through title, description, thumbnail, etc.
				if series_attribute_keys == 'title':
				    temp_title = series_attribute
				    temp_title = temp_title.encode('utf-8')
				    #print('Title: ' + temp_title)

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
				    pic_path = series_attribute['path'] + '.' + series_attribute['extension']
				    #print(pic_path)

				elif series_attribute_keys == 'startYear':
				    #print("Start Year: " + str(series_attribute))
				    startYear = str(series_attribute)

				elif series_attribute_keys == 'endYear':
				    #print("End Year: " + str(series_attribute))
				    endYear = str(series_attribute)

				elif series_attribute_keys == 'characters':
				    #print("Characters in series: " + str(series_attribute['available']))
				    numChars = str(series_attribute['available'])
				    #for character in series_attribute['items']:
				    #    name = character['name']
				    #    name = name.encode('utf-8')
				    #    print("Characters: " + name)

				elif series_attribute_keys == 'events':
				    #print("Number of events in series: " + str(series_attribute['available']))
				    numEvents = str(series_attribute['available'])
				    #for events in series_attribute['items']:
				    #    print("Events: " + events['name'])

			    #print('\n')
			    newEntry = Series(temp_title, desc, numChars, startYear, endYear, numEvents)
			    db.session.merge(newEntry)
			    db.session.commit()
			    index += 1	
			    print("processed series " + str(index))

if __name__ == '__main__':
  main()

