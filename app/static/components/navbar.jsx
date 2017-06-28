var React = require('react');
var ReactDOM = require('react-dom');
var NavLink = require('react-router-dom').NavLink;

var navStyle = { 
	backgroundColor: 'red', 
	fontSize: '22px'
};

var brandFont = {
	fontSize: '30px'
};

class NavBar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top" style={navStyle}>
  				<div className="container-fluid">
				    <div className="navbar-header">
				      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>                      
				      </button>
				      //<NavLink className="navbar-brand" to="/" style={brandFont}>MARVEL</a>
				    </div>
				    <div className="collapse navbar-collapse" id="myNavbar">
				      <ul className="nav navbar-nav">
				        <li><NavLink exact activeClassName="active" to="/">HOME</NavLink></li>
				        <li><NavLink activeClassName="active" to="/characters">CHARACTERS</NavLink></li>
				        <li><NavLink activeClassName="active" to="/creators">CREATORS</NavLink></li>
				        <li><NavLink activeClassName="active" to="/events">EVENTS</NavLink></li>
				        <li><NavLink activeClassName="active" to="/series">SERIES</NavLink></li>
				        <li><NavLink activeClassName="active" to="/about">ABOUT</NavLink></li>
				      </ul>
				    </div>
				</div>
			</nav>

		)
	}
}

module.exports = NavBar;