'''
WARNING running this with command line argument 'delete' will 
erase the entire database and reinitialize the tables

travis_init.py deletes and reiniitializes a mock database with the same
table structure as marveldb.net for TravisCI to user for unit testing
'''

import sys

def main():
    
    try:
        if sys.argv[1] == 'delete':
            
	    from app.idb import app
	    from app.models import db, Character, Comic, Creator, Event, Series
	    
	    with app.app_context():
		    db.drop_all()
		    db.create_all()
		    
		    newCharacter = Character(id=1009146, name="Abomination (Emil Blonsky)", desc="This is a test description", img="http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04.jpg", num_comics=44, num_series=2, num_events=4)

		    newCreator = Creator(id=621, full_name="Adriana Melo", img="http://i.annihil.us/u/prod/marvel/i/mg/c/40/4bb45e7cc293b.jpg", num_comics=25, num_series=4, num_events=11)

		    newSeries = Series(id=7524, title="Adam: Legend of the Blue Marvel (2008)", desc="Testing 123", start=2008, end=2015, img="http://i.annihil.us/u/prod/marvel/i/mg/9/20/4bb4f0966a26a.jpg", num_creators=12, num_characters=16, num_comics=11, num_events=8)

		    newEvent = Event(id=306, title="Gene Colan Tribute (2008)", desc="This is a test description", img="http://i.annihil.us/u/prod/marvel/i/mg/3/03/5109a0811486f.jpg", num_creators=23, num_characters=22, num_comics=11, num_series=1)

		    newComic = Comic(id=428, title="Ant-Man (2003) #4", issue_num=4, desc="This is a test description", upc="12345", pg_ct=0, price=2.99, img="http://i.annihil.us/u/prod/marvel/i/mg/4/20/4bc697c680890.jpg", num_creators=2, num_characters=0, num_events=0)


		    db.session.add(newCharacter)
		    db.session.add(newComic)
		    db.session.add(newCreator)
		    db.session.add(newSeries)
		    db.session.add(newEvent)
		    
		    db.session.commit()

		    print("\nDatabase erased, reinitialized and prepped for TravisCI Build\n")
		
	else:
	    
	    print("\nNothing deleted.  Have a good day.\n")
    
    except Exception:

        print("\nNothing deleted.  Have a good day.\n")

main()




