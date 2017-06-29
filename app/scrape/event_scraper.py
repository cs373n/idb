import requests, json, time, datetime, hashlib
from models import db, Event

class MarvelRequest():
    def __init__(self):
        self.privateKey = ""
	self.publicKey = ""
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

	    response = marvel.request("events", offset)  # No trailing slash allowed here
	    print(response.status_code)
	    assert response.status_code == 200
	    events = json.loads(response.text)

	    idNum = ""
	    title = ""
	    desc = ""
	    path = ""
	    numCreators = ""
            numChars = ""
	    numComics = ""
	    numSeries = ""    


	    for events_meta_keys, events_meta_data in events['data'].items():
		# events_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
		if events_meta_keys == 'results':
		    for events in events_meta_data:
			if events['id'] != "":
			    for events_attribute_keys, events_attribute in events.items():
				# now stepping through title, description, thumbnail, etc.
				if events_attribute_keys == 'id':
				    idNum = str(events_attribute)
				    #idNum = idNum.encode('utf-8')
				
				elif events_attribute_keys == 'title':
				    title = events_attribute
				    title = title.encode('utf-8')
				    #print('Title: ' + title)

				elif events_attribute_keys == 'description':
				    if events_attribute != None:
					"""
					Error arose when using str(description) and 
					transferring output to text file: You must not
					use str(...) to strip away unicode symbols
					that often appear in Marvel descriptions!
					"""
					desc = events_attribute
					desc = desc.encode('utf-8')
				
				elif events_attribute_keys == 'thumbnail':
				    path = str(events_attribute['path'])
				    temp = path.split('/')
				    for v in temp :
				    	if v == 'image_not_available':
				    		path = None
				    if path != None:
				        path =  path + '.' + events_attribute['extension']
				    #print (path)

				elif events_attribute_keys == 'creators':
				    #print("Comics in events: " + str(series_attribute['available']))
				    numCreators = str(events_attribute['available'])

				elif events_attribute_keys == 'characters':
				    #print("Characters in events: " + str(series_attribute['available']))
				    numChars = str(events_attribute['available'])
				
				elif events_attribute_keys == 'comics':
				    #print("Comics in events: " + str(series_attribute['available']))
				    numComics = str(events_attribute['available'])

				elif events_attribute_keys == 'series':
				    #print("Number of series in event: " + str(series_attribute['available']))
				    numSeries = str(events_attribute['available'])
				    #uris = []
				    #fori events in events_attribute['items'] :
				    #	resource_path = str(events['resourceURI']).split('/')
				    #	uris += resource_path[-1]

			    #print('\n')
			    newEntry = Event(idNum, title, desc, path, numCreators, numChars, numComics, numSeries)
			    db.session.merge(newEntry)
			    db.session.commit()
			    index += 1	
			    print("processed events " + str(index))

if __name__ == '__main__':
  main()

