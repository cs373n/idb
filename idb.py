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
    return flask.render_template('Models/charactersHome.html')

@app.route('/comicsHome')
def comicsHome():
    """
    Displays list of all comics
    """
    return flask.render_template('Models/comicsHome.html')

@app.route('/eventsHome')
def eventsHome():
    """
    Displays list of all events
    """
    return flask.render_template('Models/eventsHome.html')

@app.route('/seriesHome')
def seriesHome():
    """
    Displays list of all series
    """
    return flask.render_template('Models/seriesHome.html')

"""
Individual Character Pages
"""
@app.route('/hulk')
def hulk():
	return flask.render_template('Models/Characters/hulk.html')

@app.route('/captainAmerica')
def captainAmerica():
	return flask.render_template('Models/Characters/captainAmerica.html')

@app.route('/hawkeye')
def hawkeye():
	return flask.render_template('Models/Characters/hawkeye.html')

"""
Individual Comic Pages
"""
@app.route('/capAmer10')
def capAmer10():
	return flask.render_template('Models/Comics/capAmer10.html')

@app.route('/chaosWar5')
def chaosWar5():
	return flask.render_template('Models/Comics/chaosWar5.html')

@app.route('/capMar15')
def capMar15():
	return flask.render_template('Models/Comics/capMar15.html')

"""
Individual Events Pages
"""
@app.route('/infinity')
def infinity():
	return flask.render_template('Models/Events/infinity.html')

@app.route('/houseOfM')
def houseOfM():
	return flask.render_template('Models/Events/houseOfM.html')

@app.route('/chaosWar')
def chaosWar():
	return flask.render_template('Models/Events/chaosWar.html')

"""
Individual Series Pages
"""
@app.route('/avengers')
def avengers():
	return flask.render_template('Models/Series/avengers.html')

@app.route('/exiles')
def exiles():
	return flask.render_template('Models/Series/exiles.html')

@app.route('/incredibleHulks')
def incredibleHulks():
	return flask.render_template('Models/Series/incredibleHulks.html')


if __name__ == '__main__':
	app.run()
