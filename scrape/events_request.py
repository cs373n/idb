import json
from request import MarvelRequest

"""
Requests events data from the Marvel API
"""

marvel = MarvelRequest()

"""
json.loads(String) takes in json formatted string, and outputs 
 data according to the conversion table at json library website
"""

for offset in range(0, 75, 15): # only 75 total events in Marvel universe

    response = marvel.request("events", offset)  # No trailing slash allowed here
    assert response.status_code == 200
    events = json.loads(response.text)

    for events_meta_keys, events_meta_data in events['data'].items():
        # events_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
        if events_meta_keys == 'results':
            for event in events_meta_data:
                if event['description'] != None:
                    for events_attribute_keys, events_attribute in event.items():
                        # now stepping through title, description, thumbnail, etc.
                        if events_attribute_keys == 'title':
                            temp_title = events_attribute
                            temp_title = temp_title.encode('utf-8')
                            print('Title: ' + temp_title)                            

                        elif events_attribute_keys == 'description':
                            """
                            Error arose when using str(description) and 
                            transferring output to text file: You must not
                            use str(...) to strip away unicode symbols
                            that often appear in Marvel descriptions!
                            """
                            desc = events_attribute
                            desc = desc.encode('utf-8')
                            print('Description: ' + desc)

                        elif events_attribute_keys == 'thumbnail':
                            pic_path = events_attribute['path'] + '.' + events_attribute['extension']
                            print(pic_path)

                        elif events_attribute_keys == 'characters':
                            print("Characters in events: " + str(events_attribute['available']))
                            for character in events_attribute['items']:
                                name = character['name']
                                name = name.encode('utf-8')
                                print("Characters: " + name)

                        elif events_attribute_keys == 'series':
                            print("Number of series in event: " + str(events_attribute['available']))
                            for series in events_attribute['items']:
                                print("Series in event: " + series['name'])

                    print('\n')
