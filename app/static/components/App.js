var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var NavBar = require('./NavBar.js');
var Home = require('./Home.js');
var Creators = require('./Creators.js');

class App extends React.Component {
	render() {
		return (
		<Router>
			<div>
				<NavBar />
				<Route exact path='/' component={Home} />
				<Route path='/creators' component={Creators} />
			</div>
		</Router>
		)
	}
}

ReactDOM.render(
<App />, 
document.getElementById('content')
);
