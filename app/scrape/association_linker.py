from models import db, Series, Event, Character, Creator, Comic

def series_events():
    
    index = 0
    f1 = open('series_events.txt', 'r')
   
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    events = hold.split(',')
	    
	# first item in list is series
	if (len(events) > 1):
            p = iter(events)
	    series = next(p)

	    # retrieve series object
	    series_object = Series.query.filter_by(id=series).first()
	    if series_object == None:
                continue

	    # other items are associated events
	    for event_id in p:
	        event_object = Event.query.filter_by(id=event_id).first()

	        # append series_event_ids into association table
	        event_object.series.append(series_object)
                db.session.commit()    
		index += 1
	        print("associated series to events" + str(index))
    f1.close()


def series_creators():
    
    index = 0
    f1 = open('series_creators.txt', 'r')
   
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    creators = hold.split(',')
	    
	# first item in list is series
	if (len(creators) > 1):
            p = iter(creators)
	    series = next(p)

	    # retrieve series object
	    series_object = Series.query.filter_by(id=series).first()
	    if series_object == None:
                continue

	    # other items are associated creators
	    for creator_id in p:
	        creator_object = Creator.query.filter_by(id=creator_id).first()

	        # append series_creator_ids into association table
	        creator_object.series.append(series_object)
                db.session.commit()    
		index += 1
	        print("associated series to creators" + str(index))
    f1.close()


def series_characters():
    
    index = 0
    f1 = open('series_characters.txt', 'r')
   
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    characters = hold.split(',')
	    
	# first item in list is series
	if (len(characters) > 1):
            p = iter(characters)
	    series = next(p)

	    # retrieve series object
	    series_object = Series.query.filter_by(id=series).first()
	    if series_object == None:
		db.session.rollback()
		continue

	    # other items are associated characters
	    for character_id in p:
	        character_object = Character.query.filter_by(id=character_id).first()

	        # append series_character_ids into association table
	        character_object.series.append(series_object)
                db.session.commit()    
	        index += 1
	        print("associated series to characters" + str(index))
    f1.close()


def series_comics():
    
    index = 0
    f1 = open('series_comics.txt', 'r')
   
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']' and ch != " ":
 	        hold += ch
	    comics = hold.split(',')
	# first item in list is series
	if (len(comics) > 1):
            p = iter(comics)
	    series = next(p)
	    
	    # retrieve series object
	    series_object = Series.query.filter_by(id=series).first()
	    if series_object == None:
		continue

	    # other items are associated comics
	    for comic_id in p:
	        comic_object = Comic.query.filter_by(id=comic_id).first()
	        if comic_object == None:
		    continue

		# append series_comic_ids into association table
	        comic_object.series.append(series_object)
                db.session.commit()    
	        index += 1
	        print("associated series to comics" + str(index))
    f1.close()


def character_events():
    
    index = 0
    f1 = open('character_events.txt', 'r')
   
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    events = hold.split(',')
	    
	# first item in list is series
	if (len(events) > 1):
            p = iter(events)
	    character = next(p)

	    # retrieve series object
	    character_object = Character.query.filter_by(id=character).first()
	    if character_object == None:
		continue

            # other items are associated characters
	    for event_id in p:
	        event_object = Event.query.filter_by(id=event_id).first()

	        # append charcter_event_ids into association table
	        event_object.characters.append(character_object)
                db.session.commit() 
	        index += 1
	        print("associated characters to events" + str(index))
    f1.close()


def creator_events():
    
    index = 0
    f1 = open('creator_events.txt', 'r')
    print("1") 
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    events = hold.split(',')
    
	# first item in list is creator
	if (len(events) > 1):
            p = iter(events)
	    creator = next(p)
	    
	    # retrieve creator object
	    creator_object = Creator.query.filter_by(id=creator).first()
	    if creator_object == None:
		continue
	    
	    # other items are associated events
	    for event_id in p:
	        event_object = Event.query.filter_by(id=event_id).first()

		# append creator_event_ids into association table
		creator_object.events.append(event_object)
                db.session.commit()
		index += 1
	        print("associated creator to events" + str(index))
    f1.close()


def comic_events():
    
    index = 0
    f1 = open('comic_events.txt', 'r')
    print("1") 
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    events = hold.split(',')
    
	# first item in list is comic
	if (len(events) > 1):
            p = iter(events)
	    comic = next(p)
	    
	    # retrieve comic object
	    comic_object = Comic.query.filter_by(id=comic).first()
	    if comic_object == None:
		continue
	    
	    # other items are associated events
	    for event_id in p:
	        event_object = Event.query.filter_by(id=event_id).first()

		# append comic_event_ids into association table
		comic_object.events.append(event_object)
                db.session.commit()
		index += 1
	        print("associated comic to events" + str(index))
    f1.close()


def comic_creators():
    
    index = 0
    f1 = open('comic_creators.txt', 'r')
    print("1") 
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    creators = hold.split(',')
    
	# first item in list is comic
	if (len(creators) > 1):
            p = iter(creators)
	    comic = next(p)
	    
	    # retrieve comic object
	    comic_object = Comic.query.filter_by(id=comic).first()
	    if comic_object == None:
		continue
	    
	    # other items are associated creators
	    for creator_id in p:
	        creator_object = Creator.query.filter_by(id=creator_id).first()

		# append comic_creator_ids into association table
		comic_object.creators.append(creator_object)
                db.session.commit()
		index += 1
	        print("associated comic to creators" + str(index))
    f1.close()


def comic_characters():
    
    index = 0
    f1 = open('comic_characters.txt', 'r')
    print("1") 
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    characters = hold.split(',')
    
	# first item in list is comic
	if (len(characters) > 1):
            p = iter(characters)
	    comic = next(p)
	    
	    # retrieve comic object
	    comic_object = Comic.query.filter_by(id=comic).first()
	    if comic_object == None:
		continue
	    
	    # other items are associated characters
	    for character_id in p:
	        character_object = Character.query.filter_by(id=character_id).first()

		# append comic_character_ids into association table
		comic_object.characters.append(character_object)
                db.session.commit()
		index += 1
	        print("associated comic to characters" + str(index))
    f1.close()


def comic_series():
    
    index = 0
    f1 = open('comic_series.txt', 'r')
    print("1") 
    # read each line from file
    for line in f1:
        temp = line.strip()
	hold = ""

	# format into a list
	for ch in temp:
	    if ch != '[' and ch != ']':
 	        hold += ch
	    series = hold.split(',')
    
	# first item in list is comic
	if (len(series) > 1):
            p = iter(series)
	    comic = next(p)
	    
	    # retrieve comic object
	    comic_object = Comic.query.filter_by(id=comic).first()
	    if comic_object == None:
		continue
	    
	    # other items are associated series
	    for series_id in p:
	        series_object = Series.query.filter_by(id=series_id).first()
		if series_object == None:
	            continue

		# append comic_series_ids into association table
		comic_object.series.append(series_object)
                db.session.commit()
		index += 1
	        print("associated comic to series" + str(index))
    f1.close()



def main():

    print("1 series_events()")
    print("2 series_creators()")
    print("3 series_characters()")
    print("4 series_comics()")
    print("5 character_events()")
    print("6 creator_events()")
    print("7 comic_events()")
    print("8 comic_creators()")
    print("9 comic_characters()")
    print("10 comic_series()")

    x = int(raw_input("\nEnter the number for the function you wish to process: "))

    if  x == 1:
        series_events()
    
    elif x == 2:
        series_creators()
    
    elif x == 3:
        series_characters()
    
    elif x == 4:
        series_comics()
    
    elif x == 5:
        character_events()
    
    elif x == 6:
        creator_events()
    
    elif x == 7:
        comic_events()
    
    elif x == 8:
        comic_creators()
    
    elif x == 9:
        comic_characters()
    elif x == 10:
        comic_series()
    
    else:
        print("Wtf did you type?")


if __name__ == '__main__':
    main()
