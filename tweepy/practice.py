import tweepy



consumer_token =  "UbOT9ecxAUTjmnAqi3Dxw1S03"
consumer_secret = " OsbTgBmPLnsTculpurDFLYaLbjRBcQB6ENdIxUFfmMICUxFo84"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(" 939517986-ixg8lkgygc9YK79X7depujcwQUMHqz0epHxOoCmn", "K42q6R3JZhXVBLirYO3yLjE8SBoQVGJc7RNq6GdMK4o33")

api = tweepy.API(auth)

public_tweets = api.home_timeline()
for tweet in public_tweets:
    print tweet.text