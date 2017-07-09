import requests, json, time, datetime, hashlib
from models import db, Series, Event, Character, Creator


class MarvelRequest():

    def __init__(self):
        self.publicKey = ""
        self.privateKey = ""
        self.timeStamp = str(datetime.datetime.utcnow())
        self.baseurl = "http://gateway.marvel.com/v1/public/"

    # Marvel requires MD5 hash code for server side access
    # Must be ts+publickey+privatekey
    def compute_md5(self):
        return hashlib.md5((self.timeStamp + self.privateKey + self.publicKey).encode('utf-8')).hexdigest()

    def request(self, endpoint, offset):
        # Parameters for the call to Marvel API
        payload = { "ts": self.timeStamp, "apikey": self.publicKey, "hash": self.compute_md5(), "offset": offset}

        # Make the HTTP request, return a Response object
        return requests.get(self.baseurl + endpoint, params=payload)


def main():

	fcharacters = open('series_characters.txt', 'w')
	fcreators = open('series_creators.txt', 'w')
	fcomics = open('series_comics.txt', 'w')
	fevents = open('series_events.txt', 'w')

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

	    idNum = 0
	    title = ""
	    desc = ""
	    path = ""
	    start = ""
	    end = ""
	    numCreators = ""
	    numChars = ""
	    numComics = ""
	    numEvents = ""

	    for series_meta_keys, series_meta_data in series['data'].items():
		# series_meta_keys: offset, limit, total, count, results[] from Marvel
		# JSON structure
			if series_meta_keys == 'results':
			    for series in series_meta_data:
				if series['id'] != "":
				    for series_attribute_keys, series_attribute in series.items():
					# now stepping through title, description, thumbnail, etc.
#					if series_attribute_keys == 'id':
#					    idNum = int(series_attribute)
#					    # idNum = idNum.encode('utf-8')
#					
#					elif series_attribute_keys == 'title':
#					    title = series_attribute
#					    title = title.encode('utf-8')
#					    # print('Title: ' + title)
#
#					elif series_attribute_keys == 'description':
#					    if series_attribute != None:
#						"""
#						Error arose when using str(description) and 
#						transferring output to text file: You must not
#						use str(...) to strip away unicode symbols
#						that often appear in Marvel descriptions!
#						"""
#						desc = series_attribute
#						desc = desc.encode('utf-8')
#						# print('Description: ' + desc)
#					elif series_attribute_keys == 'startYear':
#					    # print("Start Year: " + str(series_attribute))
#					    start = str(series_attribute)
#
#					elif series_attribute_keys == 'endYear':
#					    # print("End Year: " + str(series_attribute))
#					    end = str(series_attribute)
#
#					elif series_attribute_keys == 'thumbnail':
#					    path = str(series_attribute['path'])
#					    temp = path.split('/')
#					    for v in temp :
#					    	if v == 'image_not_available':
#					    		path = None
#					    if path != None:
#					       path =  str(path) + '.' + str(series_attribute['extension'])
#					    #  print (path)
#					
					if series_attribute_keys == 'creators':
					    # print("Comics in series: " + str(series_attribute['available']))
					    #numCreators = int(series_attribute['available'])
					    creator_ids = [series['id']]
					    for creator_uri in series_attribute['items']:
				                resource_path = creator_uri['resourceURI'].split('/')
					    	creator_ids.append(int(resource_path[-1]))
					    fcreators.write(str(creator_ids) + '\n')
				
					elif series_attribute_keys == 'characters':
					    # print("Characters in series: " + str(series_attribute['available']))
					    #numChars = int(series_attribute['available'])
					    character_ids = [series['id']]
					    for character in series_attribute['items']:
				                resource_path = character['resourceURI'].split('/')
                                              	character_ids.append(int(resource_path[-1]))
					    fcharacters.write(str(character_ids) + '\n')

					elif series_attribute_keys == 'comics':
					    #numComics = int(series_attribute['available'])
					    comic_ids = [series['id']]
					    for comic in series_attribute['items']:
				                resource_path = comic['resourceURI'].split('/')
                                              	comic_ids.append(int(resource_path[-1]))
					    fcomics.write(str(comic_ids) + '\n')

					elif series_attribute_keys == 'events':
					    #numEvents = str(series_attribute['available'])
					    event_ids = [series['id']]
					    for event in series_attribute['items']:
				                resource_path = event['resourceURI'].split('/')
					    	event_ids.append(int(resource_path[-1]))
					    fevents.write(str(event_ids) + '\n')

				   # newEntry = Series(idNum, title, desc, start, end, path, numCreators, numChars, numComics, numEvents)
				   # db.session.merge(newEntry)
				   # db.session.commit()
				    index += 1	
				    print("processed series " + str(index))

if __name__ == '__main__':
  main()

