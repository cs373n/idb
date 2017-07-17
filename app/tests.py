# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = no-member
# pylint: disable = relative-import

from unittest import main, TestCase
import json, simplejson
import requests
from idb import db
from models import Character, Comic, Event, Series, Creator


class UnitTest(TestCase):

    def test_add_series(self):

        newSeries = Series(9021090, "Testing 123", "This is a test Series",
                           2015, 2018, "http://www.whitehouse.gov/logo.jpg", 1,
                           8, 289, 4)
        db.session.add(newSeries)
        db.session.commit()
        query = db.session.query(Series).filter_by(id="9021090").first()
        self.assertEqual(query.id, 9021090)
        self.assertEqual(query.title, "Testing 123")
        self.assertEqual(query.desc, "This is a test Series")
        self.assertEqual(query.start, 2015)
        self.assertEqual(query.end, 2018)
        self.assertEqual(query.img, "http://www.whitehouse.gov/logo.jpg")
        self.assertEqual(query.num_creators, 1)
        self.assertEqual(query.num_characters, 8)
        self.assertEqual(query.num_comics, 289)
        self.assertEqual(query.num_events, 4)
        db.session.delete(newSeries)
        db.session.commit()

    def test_add_comic(self):

        newComic = Comic(9021090, "Test Comic", 4, "Test Desc", "12345678",
                         88, 4.99, "http://www.utexas.edu/diploma.gif", 6, 7, 3)
        db.session.add(newComic)
        db.session.commit()
        query = db.session.query(Comic).filter_by(id="9021090").first()
        self.assertEqual(query.id, 9021090)
        self.assertEqual(query.title, "Test Comic")
        self.assertEqual(query.img, "http://www.utexas.edu/diploma.gif")
        self.assertEqual(query.num_creators, 6)
        self.assertEqual(query.num_characters, 7)
        self.assertEqual(query.num_events, 3)
        db.session.delete(newComic)
        db.session.commit()

    def test_add_creator(self):

        newCreator = Creator(9021090, "Fake Creator",
                             "http://www.whitehouse.gov/obama.jpg", 1, 8, 44)
        db.session.add(newCreator)
        db.session.commit()
        query = db.session.query(Creator).filter_by(id="9021090").first()
        self.assertEqual(query.id, 9021090)
        self.assertEqual(query.full_name, "Fake Creator")
        self.assertEqual(query.img, "http://www.whitehouse.gov/obama.jpg")
        self.assertEqual(query.num_comics, 1)
        self.assertEqual(query.num_series, 8)
        self.assertEqual(query.num_events, 44)
        db.session.delete(newCreator)
        db.session.commit()

    def test_add_character(self):

        newCharacter = Character(9021090, "Manchurian Candidate",
                                 "This guy is some Character",
                                 "http://www.kremlin.org/trump.png",
				                             1001, 88, 0)
        db.session.add(newCharacter)
        db.session.commit()
        query = db.session.query(Character).filter_by(id="9021090").first()
        self.assertEqual(query.id, 9021090)
        self.assertEqual(query.name, "Manchurian Candidate")
        self.assertEqual(query.desc, "This guy is some Character")
        self.assertEqual(query.img, "http://www.kremlin.org/trump.png")
        self.assertEqual(query.num_comics, 1001)
        self.assertEqual(query.num_series, 88)
        self.assertEqual(query.num_events, 0)
        db.session.delete(newCharacter)
        db.session.commit()

    def test_add_event(self):

        newEvent = Event(9021090, "The Big Short",
	                        "Wall Street trips and falls",
                         "http://www.boa.com/freemoney.jpg", 987654,
				                     1000, 787, 1)
        db.session.add(newEvent)
        db.session.commit()
        query = db.session.query(Event).filter_by(id="9021090").first()
        self.assertEqual(query.id, 9021090)
        self.assertEqual(query.title, "The Big Short")
        self.assertEqual(query.desc, "Wall Street trips and falls")
        self.assertEqual(query.img, "http://www.boa.com/freemoney.jpg")
        self.assertEqual(query.num_creators, 987654)
        self.assertEqual(query.num_characters, 1000)
        self.assertEqual(query.num_comics, 787)
        self.assertEqual(query.num_series, 1)
        db.session.delete(newEvent)
        db.session.commit()

    def test_add_character_with_null_img(self):

        newCharacter = Character(9021090, "Argent",
                                 "She is a Character",
                                 None, 0, 0, 0)
        db.session.add(newCharacter)
        db.session.commit()
        query = db.session.query(Character).filter_by(id="9021090").first()
        self.assertEqual(query.id, 9021090)
        self.assertEqual(query.name, "Argent")
        self.assertEqual(query.desc, "She is a Character")
        self.assertEqual(query.img, None)
        self.assertEqual(query.num_comics, 0)
        self.assertEqual(query.num_series, 0)
        self.assertEqual(query.num_events, 0)
        db.session.delete(newCharacter)
        db.session.commit()

    def test_add_creator_with_null_img(self):

        newCreator = Creator(9021090, "Alan Hopkins",
                             None, 0, 0, 0)
        db.session.add(newCreator)
        db.session.commit()
        query = db.session.query(Creator).filter_by(id="9021090").first()
        self.assertEqual(query.id, 9021090)
        self.assertEqual(query.full_name, "Alan Hopkins")
        self.assertEqual(query.img, None)
        self.assertEqual(query.num_comics, 0)
        self.assertEqual(query.num_series, 0)
        self.assertEqual(query.num_events, 0)
        db.session.delete(newCreator)
        db.session.commit()


    def test_character_get_request(self):
	
	headers = {"Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json"}
	api_request = requests.get("http://52.91.216.189/api/characters/500", headers=headers)	
	
        api_id = (int)((json.loads(api_request.text))['data']["id"])
        api_img = (json.loads(api_request.text))['data']['attributes']["img"]

        db_request = db.session.query(Character).get(500)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_series_get_request(self):
	
	headers = {"Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json"}
        api_request = requests.get("http://52.91.216.189/api/series/7524", headers=headers)
        api_id = (int)((json.loads(api_request.text))['data']["id"])
        api_img = (json.loads(api_request.text))['data']['attributes']["img"]

        db_request = db.session.query(Series).get(7524)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_creator_get_request(self):

	headers = {"Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json"}
        api_request = requests.get("http://52.91.216.189/api/creators/621", headers=headers)
        api_id = (int)((json.loads(api_request.text))['data']["id"])
        api_img = (json.loads(api_request.text))['data']['attributes']["img"]

        db_request = db.session.query(Creator).get(621)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_event_get_request(self):

	headers = {"Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json"}
        api_request = requests.get("http://52.91.216.189/api/events/306", headers=headers)
        api_id = (int)((json.loads(api_request.text))['data']["id"])
        api_img = (json.loads(api_request.text))['data']['attributes']["img"]

        db_request = db.session.query(Event).get(306)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_comic_get_request(self):
	
	headers = {"Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json"}
        api_request = requests.get("http://52.91.216.189/api/comics/428", headers=headers)
        api_id = (int) ((json.loads(api_request.text))['data']["id"])
        api_img = (json.loads(api_request.text))['data']['attributes']["img"]

        db_request = db.session.query(Comic).get(428)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)


    def test_character_POST_request(self):


#	with app.app_context():
		headers = {"Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json"}
	 
		data = {"data": {"attributes": {"desc": "testing", "img": "test bruh", "name": "test man", "num_comics": 7, "num_events": 7, "num_series": 7},
		"id": "3000000", "links": {"self": "http://52.91.216.189/api/characters/3000000"},
		"relationships": {"comics": {"data": [], "links": {"related": "/api/characters/3000000/comics", "self": "/api/characters/3000000/relationships/comics"}},
		"events": {"data": [], "links": {"related": "/api/characters/3000000/events", "self": "/api/characters/3000000/relationships/events"}},
		"series": {"data": [], "links": {"related": "/api/characters/3000000/series", "self": "/api/characters/3000000/relationships/series"}}},
		"type": "characters" }, "jsonapi": {"version": "1.0"}, "links": {"self": "/api/characters"}, "meta": {}}

		postreq = requests.post("http://52.91.216.189/api/characters", simplejson.dumps(data),  headers=headers)

		self.assertEqual(201, postreq.status_code) 
		
		data = {"type": "characters", "id":"3000000", "attributes": {"id": "3000000", "name": "bubba", "desc" : "gump", "img" : "shellfish company", "num_comics": "7", "num_series": "7", "num_events": "7"}}

		patchreq = requests.patch("http://52.91.216.189/api/characters/3000000", simplejson.dumps({"data": data}), headers=headers)
		self.assertEqual(204, patchreq.status_code)

		deletereq = requests.delete("http://52.91.216.189/api/characters/3000000", headers=headers)
		
		self.assertEqual(204, deletereq.status_code)




if __name__ == "__main__":
    main()

