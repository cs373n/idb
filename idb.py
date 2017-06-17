"""
Main Flask application. Flask reroutes the request from a browser (e.g., marveldb.net/) 
to the appropriate function with the @app.route('/') decorator
""" 

import flask

app = flask.Flask(__name__)

@app.route('/')
def home():
	"""
	Displays the index page accessible at '/'
	"""
	return flask.render_template('index.html')


if __name__ == '__main__':
	app.run()
