"""
Scrapes ComicVine API for images to fill in missing
entries in the Marveldb.net database
"""

import requests, json
from models import db, Character


# parse through json response for relevant image
def process(array):
	count = 0
	for item in array['results']:

		if (('resource_type', 'character') in item.items()):
			for thing in item.items():
				for entry in thing:
					if isinstance(entry, dict):
						for key in entry:
							if key == 'medium_url':
								if "male" in entry[key]:
									continue
								else:
									return(entry[key])
									#count += 1
									#print(count)
									#return



def main():

    f1 = open('comicvine_char_imgs.txt', 'a')

    # get list of ids of characters with no img
    empty = Character.query.filter(Character.img == None).all()

    for character in empty:
        character_id = character.id
        character_name = character.name

	# make serach request to comic vine
        comic_response = requests.get("https://comicvine.gamespot.com/api/search/?api_key=e139c4211c90903add6a17d98a2231f7e69a6158&field_list=image&format=json&query={" + character_name + "}", headers ={ "user-agent": "MarvelDB.net, CS373 Software Engineering Class Project" })
    
        print(str(comic_response.status_code) + " " + character_name)
        f1.write(str(comic_response.status_code) + " ")
	f1.write(character_name.encode('utf-8'))
	f1.write("\n")

	assert (comic_response.status_code == 200)

        array = json.loads(comic_response.text)

	url = process(array)
	print(url)
	f1.write(str(url) + "\n")
	
	character.img = str(url)
	db.session.commit()
	assert(character.img == str(url))
    f1.close()
	
main()
