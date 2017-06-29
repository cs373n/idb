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
						<Route path='/creators' component={Creators} />
						<Route path='/events' component={Events} />
						<Route path='/series' component={Series} />
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
