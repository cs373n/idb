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
var Comics = require('./Comics.js');

// Instance Pages
var CharacterInstance = require('./CharacterInstance.js');
var CreatorInstance = require('./CreatorInstance.js');
var EventInstance = require('./EventInstance.js');
var SeriesInstance = require('./SeriesInstance.js');
var ComicInstance = require('./ComicInstance.js')
var SearchResults = require('./SearchResults.js');


// Home Pages Cards
var Card = require('./Card.js');

// Misc
var Footer = require('./Footer.js');
var About = require('./About.js');

import { Button, Navbar } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(Button,'red');

class App extends React.Component {
	render() {
		return (
			<div>
				<style type="text/css">{`
			    .btn-red {
			        background-color: red;
			        color: white;
			    }

			    nav.navbar.navbar-inverse {
			    	background-color: red;
			    	position: fixed-top;
			    }

			    .navbar-inverse .navbar-brand {
				    color: white;
				    font-size: 30px;
				}

				.navbar-inverse .navbar-nav>li>a:hover{
					color: black;
				}

			    .navbar-inverse .navbar-nav>li>a {
				    color: #9d9d9d;
				    color: white;
				}

				ul.nav.navbar-nav.navbar-right {
					height: 35px;
				}
				
				.form-control {
					margin-top: 7px;
				}

				@media (min-width: 768px) {
				  .navbar-collapse.collapse {
				    display: flex !important;
				   }
				}

				.mark, mark{
					background-color: black;
					padding: 0px;
					color: #e8cc33;
				}

				.well{
			      background-color: black;
			    }

			    .well:hover{
			    	background-color: #252525;
			    }

			    .well:hover mark{
			    	background-color: #252525;
			    }


			    `}
			    </style>
				<Router history={history}>
					<div>
						<NavBar />
						<div className="container">
							<Switch>
								<Route exact path='/' component={Home} />
								
								<Route path='/characters' component={Characters} />
								<Route path='/characterInstance/:charID' component={CharacterInstance} />

								<Route path='/comics' component={Comics} />
								<Route path='/comicInstance/:comicID' component={ComicInstance} />

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
						</div>
						<Footer/>
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
