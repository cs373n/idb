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

// Home Pages Cards
var Card = require('./Card.js');

class App extends React.Component {
	render() {
		return (
		<Router>
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

						<Route render={function() {
							return <p>Page Not Found!</p>
						}} />
					</Switch>
				</div>
			</div>	
		</Router>
		)
	}
}

ReactDOM.render(
<App />, 
document.getElementById('content')
);
