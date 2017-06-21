import json
from request import MarvelRequest

"""
Requests character data from the Marvel API
"""

marvel = MarvelRequest()

"""
json.loads(String) takes in json formatted string, and outputs 
 data according to the conversion table at json library website
"""

for offset in range(100, 200, 20):

    response = marvel.request("characters", offset)  # No trailing slash allowed here
    print(response.status_code)
    assert response.status_code == 200
    characters = json.loads(response.text)

    for char_meta_keys, char_meta_data in characters['data'].items():
        # char_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
        if char_meta_keys == 'results':
            for char in char_meta_data:
                if char['description'] != None:
                    for char_attribute_keys, char_attribute in char.items():
                        # now stepping through name, description, thumbnail, etc.
                        if char_attribute_keys == 'name':
                            print('Name: ' + char_attribute)

                        elif char_attribute_keys == 'description':
                            print('Description: ' + char_attribute)

                        elif char_attribute_keys == 'thumbnail':
                            pic_path = char_attribute['path'] + '.' + char_attribute['extension']
                            print(pic_path)

                        elif char_attribute_keys == 'comics':
                            print("Number of comics appeared in: " + str(char_attribute['available']))
                            for comic in char_attribute['items']:
                                print("Comics: " + comic['name'])

                        elif char_attribute_keys == 'series':
                            print("Number of series appeared in: " + str(char_attribute['available']))
                            for series in char_attribute['items']:
                                print("Series: " + series['name'])

                        elif char_attribute_keys == 'events':
                            print("Number of events appeared in: " + str(char_attribute['available']))
                            for events in char_attribute['items']:
                                print("Events: " + series['name'])

                    print('\n')
