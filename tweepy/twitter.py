#Import the necessary methods from tweepy library
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
import time

#Variables that contains the user credentials to access Twitter API
access_token = "939517986-ixg8lkgygc9YK79X7depujcwQUMHqz0epHxOoCmn"
access_token_secret = "K42q6R3JZhXVBLirYO3yLjE8SBoQVGJc7RNq6GdMK4o33"
consumer_key = "UbOT9ecxAUTjmnAqi3Dxw1S03"
consumer_secret = "OsbTgBmPLnsTculpurDFLYaLbjRBcQB6ENdIxUFfmMICUxFo84"


#This is a basic listener that just prints received tweets to stdout.
class StdOutListener(StreamListener): 
	def on_data(self, data): 
		decoded = json.loads(data) 
		print (decoded['user']['screen_name'], decoded['text'].encode('ascii', 'ignore')) 
		return True 

		def on_error(self, status): 
			print(status)


if __name__ == '__main__': 
#This handles Twitter authetification and the connection to Twitter Streaming API 
	l = StdOutListener() 
	auth = OAuthHandler(consumer_key, consumer_secret) 
	auth.set_access_token(access_token, access_token_secret) 
	stream = Stream(auth, l) 
	
	while True :
		try :
			#This line filter Twitter Streams to capture data by the keyword: 'marvel' 
			stream.filter(track=['marvel'])
		except TweepError as e:
			print ("Error: overload reading tweets. Will resume reading in 1 minute.")
			time.sleep(120) # will put the program to sleep for 60 seconds and run again
			continue
