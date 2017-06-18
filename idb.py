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

@app.route('/charactersHome')
def charactersHome():
    """
    Displays list of all characters
    """
    return flask.render_template('charactersHome.html')

@app.route('/hulk')
def hulk():
	return flask.render_template('hulk.html')

@app.route('/captainAmerica')
def captainAmerica():
	return flask.render_template('captainAmerica.html')

@app.route('/hawkeye')
def hawkeye():
	return flask.render_template('hawkeye.html')


if __name__ == '__main__':
	app.DEBUG = True
	app.run()
