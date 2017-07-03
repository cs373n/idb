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
            
	    from app.idb import db
	    from app.idb import app
	    from app.models import Character
	    from app.models import Series
	    from app.models import Creator
	    from app.models import Event

	    db.drop_all()
	    db.create_all()
	    
	    newCharacter = Character(1009146, "Abomination (Emil Blonsky)", "This is a test description", "http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04.jpg", 44, 2, 4)

	    newCreator = Creator(621, "Adriana Melo", "http://i.annihil.us/u/prod/marvel/i/mg/c/40/4bb45e7cc293b.jpg", 25, 4, 11)

	    newSeries = Series(7524, "Adam: Legend of the Blue Marvel (2008)", "Testing 123", 2008, 2015, "http://i.annihil.us/u/prod/marvel/i/mg/9/20/4bb4f0966a26a.jpg", 12, 16, 11, 8)

	    newEvent = Event(306, "Gene Colan Tribute (2008)", "This is a test description", "http://i.annihil.us/u/prod/marvel/i/mg/3/03/5109a0811486f.jpg", 23, 22, 11, 1)

	    db.session.add(newCharacter)
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




