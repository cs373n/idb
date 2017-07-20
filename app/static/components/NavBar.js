var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var LinkContainer = require('react-router-bootstrap').LinkContainer;
var SearchForm = require('./SearchForm.js');
import { Nav, Navbar, NavItem} from 'react-bootstrap';


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
			    <Nav pullRight>
			      	<SearchForm />
			    </Nav>
			    <Navbar.Collapse>
			      <Nav >

			      	<LinkContainer exact={true} to="/">
				        <NavItem eventKey={1} >HOME</NavItem>
				    </LinkContainer>

				    <LinkContainer to="/characters">
				        <NavItem eventKey={2} >CHARACTERS</NavItem>
				    </LinkContainer>

				    <LinkContainer to="/events">
				        <NavItem eventKey={3} >EVENTS</NavItem>
				    </LinkContainer>

				    <LinkContainer to="/series">
				        <NavItem eventKey={4} >SERIES</NavItem>
				    </LinkContainer>

				    <LinkContainer to="/comics">
				        <NavItem eventKey={5} >COMICS</NavItem>
				    </LinkContainer>

				    <LinkContainer to="/creators">
				        <NavItem eventKey={6} >CREATORS</NavItem>
				    </LinkContainer>	

				    <LinkContainer to="/about">
				        <NavItem eventKey={7} >ABOUT</NavItem>
				    </LinkContainer>

				    <LinkContainer to="/contribute">
				        <NavItem eventKey={8} >CONTRIBUTE</NavItem>
				    </LinkContainer>

			      </Nav>

				</Navbar.Collapse>
			</Navbar>
			</div>
		)
	}
}

module.exports = NavBar;

