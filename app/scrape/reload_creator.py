import requests, json, time, datetime, hashlib
from models import db, Creator

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

	    response = marvel.request("creators", offset)  # No trailing slash allowed here
	    print(response.status_code)
	    assert response.status_code == 200
	    creators = json.loads(response.text)

	    idNum = 0
	    full_name = ""
	    path = ""
	    numComics = ""
	    numSeries = ""  
	    numEvents = ""  


	    for creators_meta_keys, creators_meta_data in creators['data'].items():
		# creators_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
		if creators_meta_keys == 'results':
		    for creators in creators_meta_data:
			if creators['id'] != "":
			#if creators['description'] != "":
			    for creators_attribute_keys, creators_attribute in creators.items():
				# now stepping through title, description, thumbnail, etc.
				if creators_attribute_keys == 'id':
				    idNum = int(creators_attribute)
				    #idNum = idNum.encode('utf-8')
				
				elif creators_attribute_keys == 'fullName':
				    full_name = creators_attribute
				    full_name = full_name.encode('utf-8')
				    #print('Title: ' + title)

				elif creators_attribute_keys == 'thumbnail':
				    path = str(creators_attribute['path'])
				    temp = path.split('/')
				    for v in temp :
				    	if v == 'image_not_available':
				    		path = None
				    if path != None:
				        path =  path + '.' + creators_attribute['extension']
				    #print (path)

				elif creators_attribute_keys == 'comics':
				    #print("Comics in creators: " + str(creators_attribute['available']))
				    numComics = int(creators_attribute['available'])

				elif creators_attribute_keys == 'series':
				    #print("Number of events in series: " + str(series_attribute['available']))
				    numSeries = int(creators_attribute['available'])
				    #uris = []
				    #for series in creators_attribute['items'] :
				    #	resource_path = str(series['resourceURI']).split('/')
				    #	uris += resource_path[-1]


	                        elif creators_attribute_keys == 'events':
				    #print("Number of events in creators: " + str(creators_attribute['available']))
				    numEvents = int(creators_attribute['available'])
				    #	uris = []
				    #for events in creators_attribute['items'] :
				    #	resource_path = str(events['resourceURI']).split('/')
				    #	uris += resource_path[-1]

			    newEntry = Creator(idNum, full_name, path, numComics, numSeries, numEvents)
			    db.session.merge(newEntry)
			    db.session.commit()
			    index += 1	
			    print("processed creators " + str(index))

if __name__ == '__main__':
  main()

