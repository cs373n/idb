var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var LinkContainer = require('react-router-bootstrap').LinkContainer;
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';


class NavBar extends React.Component {
	render() {
		return (
			<div>
			<Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			    	<LinkContainer to="/">
			      		<Navbar.Brand>MARVEL</Navbar.Brand>
			     	</LinkContainer>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
			      	<LinkContainer exact={true} to="/">
				        <NavItem eventKey={1} >HOME</NavItem>
				    </LinkContainer>
				    <LinkContainer to="/characters">
				        <NavItem eventKey={2} >CHARACTERS</NavItem>
				    </LinkContainer>
				    <LinkContainer to="/events">
				        <NavItem eventKey={4} >EVENTS</NavItem>
				    </LinkContainer>
				    <LinkContainer to="/series">
				        <NavItem eventKey={5} >SERIES</NavItem>
				    </LinkContainer>
				    <LinkContainer to="/creators">
				        <NavItem eventKey={3} >CREATORS</NavItem>
				    </LinkContainer>			    
				    <LinkContainer to="/about">
				        <NavItem eventKey={6} >ABOUT</NavItem>
				    </LinkContainer>    
			      </Nav>
				</Navbar.Collapse>
			</Navbar>
			</div>
		)
	}
}

module.exports = NavBar;

