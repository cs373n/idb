var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var NavBar = require('./NavBar.js');
var Home = require('./Home.js');

//import NavBar from './NavBar.js'
//import Home from './Home.js'

class App extends React.Component {
	render() {
		return (
		<Router>
			<div>
				<NavBar />
				<Route path='/home' component={Home} />
			</div>
		</Router>
		)
	}
}

ReactDOM.render(
<App />, 
document.getElementById('content')
);
