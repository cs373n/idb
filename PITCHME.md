## MARVELDB.net
##### <span style="font-family:Helvetica Neue; font-weight:bold">A <span style="color="red"">Marvel</span> database.</span>

---

## The Website
#### <a href="http://marveldb.net/about">Marveldb.net</a>

+++

## What did we do well?
#### Separate front end and back end
#### Full react; only one HTML file
#### Used our API to get data

+++

## What can we do better?

#### More attributes for our models

+++

## What did we learn?

#### Dynamically loading with React

+++

## What puzzles us?

#### React router history

---

## Backend Boyz

---

## What did we do well?

+++

## Our database is fully loaded
![PGAdmin](http://i.imgur.com/GBVCClT.jpg)

+++

## Switching to the new Flask-Restless 1.0.0B1
<br>
#### Adheres to jsonapi.org specifications
<br>
#### Eliminated need to use pre/post processors for patching
<br>
#### Required a large amount of front-end refactoring
<br>
#### Required adjusting Unit Tests 

---

## What can we do better?

+++

#### Unscraped entries
<br>
#### Missing descriptions and images
<br>
#### Associations are limited

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

## What puzzles us?

+++

### The new flask restless takes a while to access our data in the API

