# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = no-member
# pylint: disable = relative-import

from unittest import main, TestCase
import json
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

    def test_character_get_request(self):

        api_request = requests.get("http://75.101.247.182/api/characters/1009146")
        api_id = (json.loads(api_request.text))["id"]
        api_img = (json.loads(api_request.text))["img"]

        db_request = db.session.query(Character).get(1009146)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_series_get_request(self):

        api_request = requests.get("http://75.101.247.182/api/series/7524")
        api_id = (json.loads(api_request.text))["id"]
        api_img = (json.loads(api_request.text))["img"]

        db_request = db.session.query(Series).get(7524)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_creator_get_request(self):

        api_request = requests.get("http://75.101.247.182/api/creators/621")
        api_id = (json.loads(api_request.text))["id"]
        api_img = (json.loads(api_request.text))["img"]

        db_request = db.session.query(Creator).get(621)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_event_get_request(self):

        api_request = requests.get("http://75.101.247.182/api/events/306")
        api_id = (json.loads(api_request.text))["id"]
        api_img = (json.loads(api_request.text))["img"]

        db_request = db.session.query(Event).get(306)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)

    def test_comic_get_request(self):

        api_request = requests.get("http://75.101.247.182/api/comics/428")
        api_id = (json.loads(api_request.text))["id"]
        api_img = (json.loads(api_request.text))["img"]

        db_request = db.session.query(Comic).get(428)
        db_id = db_request.id
        db_img = db_request.img
        self.assertEqual(api_id, db_id)
        self.assertEqual(api_img, db_img)



if __name__ == "__main__":
    main()
