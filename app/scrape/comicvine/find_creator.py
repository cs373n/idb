import requests, json
from models import db, Creator

def main():

    count = 0

    # get list of ids of creators with no img
    empty = Creator.query.filter(Creator.img == None).all()

    for creator in empty:
        creator_id = creator.id
        creator_name = creator.full_name.split(' ')
	print(creator_name)
        creator_last_name = creator_name[-1]

	# make serach request to comic vine
        comic_response = requests.get("https://comicvine.gamespot.com/api/search/?api_key=e139c4211c90903add6a17d98a2231f7e69a6158&field_list=image&format=json&query={" + creator_last_name + "}", headers ={ "user-agent": "MarvelDB.net, CS373 Software Engineering Class Project" })
    
        print(comic_response.status_code)
        assert (comic_response.status_code == 200)

        array = json.loads(comic_response.text)

    	for item in array['results']:
        
		if (('resource_type', 'person') in item.items()):
			for thing in item.items():
				for entry in thing:
					if isinstance(entry, dict):
						for key in entry:
							if key == 'medium_url':
								if "male" in entry[key]:
									continue
								else:
									print(entry[key])
									count += 1
									print(count)

main()
