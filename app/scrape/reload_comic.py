import requests, json, time, datetime, hashlib
from models import db, Comic


class MarvelRequest():

    def __init__(self):
        self.publicKey = "8097970cb5bc96d3dd151e9f983b76c8"
        self.privateKey = "c0cca37e9e919d673f13d91eadaaa1c7c683c745"
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

    #fcharacters = open('comic_characters.txt', 'a')
    #fcreators = open('comic_creators.txt', 'a')
    #fevents = open('comic_events.txt', 'a')

    marvel = MarvelRequest()

    """
	json.loads(String) takes in json formatted string, and outputs
	 data according to the conversion table at json library website
    """

    index = 0

    for offset in range(0, 10000, 20):

        response = marvel.request("comics", offset)  # No trailing slash allowed here
        print(response.status_code)
        assert response.status_code == 200
        comic = json.loads(response.text)

	idNum = 0
        title = ""
	issue = ""
        desc = ""
	upc = ""
	pg_ct = 0
	comic_price = ""
        path = ""
        numCreators = ""
        numChars = ""
        numEvents = ""

        for comic_meta_keys, comic_meta_data in comic['data'].items():
            # comic_meta_keys: offset, limit, total, count, results[] from
            # Marvel JSON structure
            if comic_meta_keys == 'results':
                for comic in comic_meta_data:
                    if comic['id'] != "":
                        for comic_attribute_keys, comic_attribute in comic.items():
                            # now stepping through title, description, thumbnail, etc.
                            if comic_attribute_keys == 'id':
                                idNum = int(comic_attribute)
                                # idNum = idNum.encode('utf-8')
                            
                            elif comic_attribute_keys == 'title':
                                title = comic_attribute
                                title = title.encode('utf-8')
                                #print('Title: ' + title)

			    elif comic_attribute_keys == 'issueNumber':
			        issue = int(comic_attribute)

			    elif comic_attribute_keys == 'variantDescription':
			        desc = comic_attribute

                            elif comic_attribute_keys == 'description':
                                if (comic_attribute != None) and (comic_attribute != ""):
                                    """
                                    Error arose when using str(description) and
                                    transferring output to text file: You must not
                                    use str(...) to strip away unicode symbols
                                    that often appear in Marvel descriptions!
                                    """
				    desc = comic_attribute
                                    #desc = desc.encode('utf-8')
                                    #print('Description: ' + desc)
			    
                            elif comic_attribute_keys == 'upc':
                                #print("Start Year: " + str(comic_attribute))
                                upc = str(comic_attribute)

                            elif comic_attribute_keys == 'pageCount':
                                #print("End Year: " + str(comic_attribute))
                                pg_ct = int(comic_attribute)

			    elif comic_attribute_keys == 'prices':
			        d = comic_attribute[0]
				comic_price = float(d.get('price'))
			        #print(comic_price)	        
                            
			    elif comic_attribute_keys == 'thumbnail':
                                path = str(comic_attribute['path'])
                                temp = path.split('/')
                                for v in temp :
                                    if v == 'image_not_available':
                                            path = None
                                if path != None:
                                   path =  str(path) + '.' + str(comic_attribute['extension'])
                                #  print (path)
                            
                            #if comic_attribute_keys == 'id':
                            #    idNum = int(comic_attribute)

                            elif comic_attribute_keys == 'creators':
                                # print("Comics in comic: " + str(comic_attribute['available']))
                                numCreators = int(comic_attribute['available'])
                                #creator_ids = [idNum]
                                #for creator_uri in comic_attribute['items']:
                                #    resource_path = creator_uri['resourceURI'].split('/')
                                #    creator_ids.append(int(resource_path[-1]))
                                # fcreators.write(str(creator_ids) + '\n')

                            elif comic_attribute_keys == 'characters':
                                # print("Characters in comic: " + str(comic_attribute['available']))
                                numChars = int(comic_attribute['available'])
                                #character_ids = [comic['id']]
                                #for character in comic_attribute['items']:
                                #    resource_path = character['resourceURI'].split('/')
                                #    character_ids.append(int(resource_path[-1]))
                                #fcharacters.write(str(character_ids) + '\n')

                            elif comic_attribute_keys == 'events':
                                numEvents = int(comic_attribute['available'])
                                #event_ids = [idNum]
                                #for event in comic_attribute['items']:
                                #    resource_path = event['resourceURI'].split('/')
                                #    event_ids.append(int(resource_path[-1]))
                                # fevents.write(str(event_ids) + '\n')
               
	                newEntry = Comic(idNum, title, issue, desc, upc, pg_ct, comic_price, path, numCreators, numChars, numEvents)
		        db.session.merge(newEntry)
			db.session.commit()
                	index += 1
                	print("processed comic " + str(index))

if __name__ == '__main__':
    main()
