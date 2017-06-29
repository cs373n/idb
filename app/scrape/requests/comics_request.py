import json
from request import MarvelRequest

"""
Requests comics data from the Marvel API
"""

marvel = MarvelRequest()

"""
json.loads(String) takes in json formatted string, and outputs 
 data according to the conversion table at json library website
"""

for offset in range(0, 200, 20): # only 75 total comics in Marvel universe

    response = marvel.request("comics", offset)  # No trailing slash allowed here
    assert response.status_code == 200
    comics = json.loads(response.text)

    for comics_meta_keys, comics_meta_data in comics['data'].items():
        # comics_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
        if comics_meta_keys == 'results':
            for comic in comics_meta_data:
                if comic['description'] != None:
                    for comics_attribute_keys, comics_attribute in comic.items():
                        # now stepping through title, description, thumbnail, etc.
                        if comics_attribute_keys == 'title':
                            temp_title = comics_attribute
                            temp_title = temp_title.encode('utf-8')
                            print('Title: ' + temp_title) 

                        elif comics_attribute_keys == 'description':
                            """
                            Error arose when using str(description) and 
                            transferring output to text file: You must not
                            use str(...) to strip away unicode symbols
                            that often appear in Marvel descriptions!
                            """
                            desc = comics_attribute
                            desc = desc.encode('utf-8')
                            print('Description: ' + desc)

                        elif comics_attribute_keys == 'thumbnail':
                            pic_path = comics_attribute['path'] + '.' + comics_attribute['extension']
                            print(pic_path)

                        elif comics_attribute_keys == 'characters':
                            print("Characters in comics: " + str(comics_attribute['available']))
                            for character in comics_attribute['items']:
                                name = character['name']
                                name = name.encode('utf-8')
                                print("Characters: " + name)

                        elif comics_attribute_keys == 'events':
                            print("Number of events in comic: " + str(comics_attribute['available']))
                            for events in comics_attribute['items']:
                                print("Events: " + events['name'])

                    print('\n')
