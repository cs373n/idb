var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BroswerRouter;
var Route = ReactRouter.Route;
var NavBar = require('NavBar');


class App extends React.Component {
	render() {
		return (
		<Router>
			<NavBar />
			<Route path='/home' component={Home}
		</Router>
		)
	}
}

ReactDOM.render(
<App />, 
document.getElementById('content')
);
