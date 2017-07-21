## MARVELDB.net
##### <span style="font-family:Helvetica Neue; font-weight:bold">A <span style="color="red"">Marvel</span> database.</span>

---

## The Website
#### <a href="http://marveldb.net/about">Marveldb.net</a>

---

## Backend Boys
#### 

---

## What did we do well?

+++

## Our database is fully loaded
![PGAdmin](http://i.imgur.com/GBVCClT.jpg)
#### Scraping Marvel/ComicVine APIs
#### Large volume of data scraped/associated
+++

## Upgrading to Flask-Restless 1.0.0B1
#### Adheres to jsonapi.org specifications
#### Eliminated need to use pre/post processors for patching
#### Required a large amount of front-end refactoring
#### Required adjusting Unit Tests 

---

## What puzzles us?

+++

### The new flask restless takes a while to access our data in the API

---

## What did we learn?

+++

##### flask restless and the magic of the API manager

+++

![characters](http://i.imgur.com/DoajTVG.png)

+++

##### Postgres SQL, associating models together
'''
character_series = db.Table('character_series',
                            db.Column(
                                'character_id', db.Integer, ForeignKey('character.id')),
                            db.Column(
                                'series_id', db.Integer, ForeignKey('series.id'))
                           )

characters = db.relationship(
        'Character', secondary=character_series, backref=db.backref('series', lazy='dynamic'))
'''
---

## What can we do better?

+++

#### Unscraped entries
#### Missing descriptions and images
#### Associations are limited
