import requests, json, time, datetime, hashlib
from models import db, Character

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

	fevents = open('character_events.txt', 'w')


	marvel = MarvelRequest()

	"""
	json.loads(String) takes in json formatted string, and outputs 
	 data according to the conversion table at json library website
	"""

	index = 0

	for offset in range(0, 10000, 20):

	    response = marvel.request("characters", offset)  # No trailing slash allowed here
	    print(response.status_code)
	    assert response.status_code == 200
	    characters = json.loads(response.text)

	    idNum = 0
	    name = ""
	    desc = ""
	    path = ""
	    numComics = ""
	    numSeries = ""
	    numEvents = ""    


	    for characters_meta_keys, characters_meta_data in characters['data'].items():
		# characters_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
		if characters_meta_keys == 'results':
		    for characters in characters_meta_data:
			if characters['id'] != "":
			    for characters_attribute_keys, characters_attribute in characters.items():
				# now stepping through title, description, thumbnail, etc.
				'''
				if characters_attribute_keys == 'id':
				    idNum = str(characters_attribute)
				    #idNum = idNum.encode('utf-8')
				
				elif characters_attribute_keys == 'name':
				    name = characters_attribute
				    name = name.encode('utf-8')
				    #print('Title: ' + title)

				elif characters_attribute_keys == 'description':
				    if characters_attribute != None:
					"""
					Error arose when using str(description) and 
					transferring output to text file: You must not
					use str(...) to strip away unicode symbols
					that often appear in Marvel descriptions!
					"""
					desc = characters_attribute
					desc = desc.encode('utf-8')
					#print('Description: ' + desc)

				elif characters_attribute_keys == 'thumbnail':
				    path = str(characters_attribute['path'])
				    temp = path.split('/')
				    for v in temp :
				    	if v == 'image_not_available':
				    		path = None
				    if path != None:
				        path =  path + '.' + characters_attribute['extension']
				    #print (path)
				
				elif characters_attribute_keys == 'comics':
				    #print("Comics in characters: " + str(characters_attribute['available']))
				    numComics = str(characters_attribute['available'])

				elif characters_attribute_keys == 'series':
				    #print("Comics in series: " + str(series_attribute['available']))
				    numSeries = str(characters_attribute['available'])
				    #uris = []
				    #for series in characters_attribute['items'] :
				    #	resource_path = str(series['resourceURI']).split('/')
				    #	uris += resource_path[-1]

				'''

				if characters_attribute_keys == 'id':
				    idNum = int(characters_attribute)
				 
				elif characters_attribute_keys == 'events':
				    #numEvents = str(characters_attribute['available'])
				    uris = [idNum]
				    for events in characters_attribute['items'] :
				    	resource_path = str(events['resourceURI']).split('/')
				    	uris.append(int(resource_path[-1]))
				    fevents.write(str(uris) + '\n')

			    #print('\n')
			    #newEntry = Character(idNum, name, desc, path, numComics, numSeries, numEvents)
			    #db.session.merge(newEntry)
			    #db.session.commit()
			    index += 1	
			    print("processed characters " + str(index))

if __name__ == '__main__':
  main()

