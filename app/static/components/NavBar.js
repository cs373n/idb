var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var LinkContainer = require('react-router-bootstrap').LinkContainer;
var SearchForm = require('./SearchForm.js');
import { Nav, Navbar, NavItem, FormGroup, FormControl, SplitButton, MenuItem } from 'react-bootstrap';


class NavBar extends React.Component {
	/*
	renderButton(){
		return (
			<SplitButton bsStyle="primary" title={this.props.username? this.props.username: "Account"} key={1} id={'split-button-basic-${i}'}>
				{this.props.username ? 
					<LinkContainer to="/contribute">
						<MenuItem eventKey={1}>Contribute</MenuItem>
					</LinkContainer>
					:
					<div>
					<LinkContainer to="/accessAccount">
						<MenuItem eventKey={1}>Contribute</MenuItem>
					</LinkContainer>
					<MenuItem divider />
					<LinkContainer to="/accessAccount">
						<MenuItem eventKey={2}>Log In</MenuItem>
					</LinkContainer>
					
					<LinkContainer to="/accessAccount">
						<MenuItem eventKey={3}>Sign Up</MenuItem>
					</LinkContainer>
					</div>
				}
			</SplitButton>
		)
	}*/

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

					
					{/*this.renderButton()*/} 
			      </Nav>

				</Navbar.Collapse>
			</Navbar>
			</div>
		)
	}
}

module.exports = NavBar;

