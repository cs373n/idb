var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var NavBar = require('./NavBar.js');

// Models Home Pages
var Home = require('./Home.js');
var Characters = require('./Characters.js')
var Creators = require('./Creators.js');
var Events = require('./Events.js');
var Series = require('./Series.js');

// Instance Pages
var CharacterInstance = require('./CharacterInstance.js');
var CreatorInstance = require('./CreatorInstance.js');
var EventInstance = require('./EventInstance.js');
var SeriesInstance = require('./SeriesInstance.js');
var SearchResults = require('./SearchResults.js');

// Home Pages Cards
var Card = require('./Card.js');

// Misc
var Footer = require('./Footer.js');
var About = require('./About.js');

import { Button, Navbar } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(Button,'red');
bootstrapUtils.addStyle(Navbar, ['red']);


class App extends React.Component {
	render() {
		return (
			<div>
				<style type="text/css">{`
			    .btn-red {
			        background-color: red;
			        color: white;
			    }
			    .navbar-red{
			    	background-color: red;
			    	color: white
			    }
			    `}
			    </style>
				<Router history={history}>
					<div>
						<NavBar />
						<div>
							<Switch>
								<Route exact path='/' component={Home} />
								
								<Route path='/characters' component={Characters} />
								<Route path='/characterInstance/:charID' component={CharacterInstance} />

								<Route path='/events' component={Events} />
								<Route path='/eventInstance/:eventID' component={EventInstance} />

								<Route path='/series' component={Series} />
								<Route path='/seriesInstance/:seriesID' component={SeriesInstance} />

								<Route path='/creators' component={Creators} />
								<Route path='/creatorInstance/:creatorID' component={CreatorInstance} />

								<Route path='/about' component={About} />

								<Route path='/searchResults/:searchString' component={SearchResults} />

								<Route render={function() {
									return <p>Page Not Found!</p>
								}} />
							</Switch>
						<Footer/>
						</div>
					</div>
				</Router>
			</div>
		)
	}
}

ReactDOM.render(
<App />, 
document.getElementById('content')
);
