import json
from request import MarvelRequest

"""
Requests series data from the Marvel API
"""

marvel = MarvelRequest()

"""
json.loads(String) takes in json formatted string, and outputs 
 data according to the conversion table at json library website
"""

for offset in range(100, 200, 20):

    response = marvel.request("series", offset)  # No trailing slash allowed here
    print(response.status_code)
    assert response.status_code == 200
    series = json.loads(response.text)

    for series_meta_keys, series_meta_data in series['data'].items():
        # series_meta_keys: offset, limit, total, count, results[] from Marvel JSON structure
        if series_meta_keys == 'results':
            for series in series_meta_data:
                if series['description'] != "":
                    for series_attribute_keys, series_attribute in series.items():
                        # now stepping through title, description, thumbnail, etc.
                        if series_attribute_keys == 'title':
                            print('Title: ' + series_attribute)

                        elif series_attribute_keys == 'description':
                            if series_attribute != None:
                                print('Description: ' + series_attribute)

                        elif series_attribute_keys == 'thumbnail':
                            pic_path = series_attribute['path'] + '.' + series_attribute['extension']
                            print(pic_path)

                        elif series_attribute_keys == 'startYear':
                            print("Start Year: " + str(series_attribute))

                        elif series_attribute_keys == 'endYear':
                            print("End Year: " + str(series_attribute))

                        elif series_attribute_keys == 'characters':
                            print("Characters in series: " + str(series_attribute['available']))
                            for character in series_attribute['items']:
                                print("Characters: " + character['name'])

                        elif series_attribute_keys == 'events':
                            print("Number of events in series: " + str(series_attribute['available']))
                            for events in series_attribute['items']:
                                print("Events: " + events['name'])

                    print('\n')
