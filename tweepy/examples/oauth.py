from __future__ import absolute_import, print_function

import tweepy

# == OAuth Authentication ==
#
# This mode of authentication is the new preferred way
# of authenticating with Twitter.

# The consumer keys can be found on your application's Details
# page located at https://dev.twitter.com/apps (under "OAuth settings")
consumer_key="UbOT9ecxAUTjmnAqi3Dxw1S03"
consumer_secret="OsbTgBmPLnsTculpurDFLYaLbjRBcQB6ENdIxUFfmMICUxFo84"

# The access tokens can be found on your applications's Details
# page located at https://dev.twitter.com/apps (located
# under "Your access token")
access_token="939517986-ixg8lkgygc9YK79X7depujcwQUMHqz0epHxOoCmn"
access_token_secret=" K42q6R3JZhXVBLirYO3yLjE8SBoQVGJc7RNq6GdMK4o33"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.secure = True
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

# If the authentication was successful, you should
# see the name of the account print out
print(api.me().name)

# If the application settings are set for "Read and Write" then
# this line should tweet out the message to your account's
# timeline. The "Read and Write" setting is on https://dev.twitter.com/apps
api.update_status(status='Updating using OAuth authentication via Tweepy!')
