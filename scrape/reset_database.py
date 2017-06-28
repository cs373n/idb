'''
WARNING running this will erase the entire Series table from the database
'''

def main():

    x = raw_input("\nWARNING: About to ERASE the database, type 'delete' to continue erasing: ")

    if x=="delete":
        from models import db
        from models import Series

 	
	# delete existing table
	db.drop_all()

	# reinitialize blank table
	db.create_all()
   	
	print("\nDatabase erased and reinitialized\n")
    else:
	print("\nNothing deleted.  Have a good day.\n")

main()
