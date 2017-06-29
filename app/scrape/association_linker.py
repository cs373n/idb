from models import db, Series, Event, Character, Creator

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
	        event_object.event_series_backref.append(series_object)
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
	        creator_object.creator_series_backref.append(series_object)
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
		continue

	    # other items are associated characters
	    for character_id in p:
	        character_object = Character.query.filter_by(id=character_id).first()

	        # append series_event_ids into association table
	        character_object.character_series_backref.append(series_object)
                db.session.commit()    
	        index += 1
	        print("associated series to characters" + str(index))
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

	        # append series_event_ids into association table
	        event_object.character_event_backref.append(character_object)
                db.session.commit() 
	        index += 1
	        print("associated characters to events" + str(index))
    f1.close()


def events_creators():
    
    index = 0
    f1 = open('events_creators.txt', 'r')
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
    
	# first item in list is event
	if (len(creators) > 1):
            p = iter(creators)
	    event = next(p)
	    
	    # retrieve event object
	    event_object = Event.query.filter_by(id=event).first()
	    if event_object == None:
		continue
	    
	    # other items are associated creators
	    for creator_id in p:
	        creator_object = Creator.query.filter_by(id=creator_id).first()

		# append event_creator_ids into association table
		creator_object.creator_event_backref.append(event_object)
                db.session.commit()
		index += 1
	        print("associated event to creators" + str(index))
    f1.close()



def main():

    #series_events()
    #series_creators()
    #series_characters()
    #character_events()
    events_creators()

if __name__ == '__main__':
    main()
