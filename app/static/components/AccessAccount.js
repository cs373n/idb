var React = require('react');
import { Row, Col, Form, FormGroup, FormControl, PageHeader, Button } from 'react-bootstrap';
var md5 = require('js-md5');
var api = require('./api.js');
import { browserHistory, withRouter } from 'react-router';

class AccessAccount extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			signUpUsername: "",
			signUpPassword: "",
			loginUsername: "",
			loginPassword: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
		/*
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);*/
	}

	// Can't do this :(
	/*handleUserChange(e) {
    	this.setState({ username: e.target.value });
  	}

  	handlePasswordChange(e) {
    	this.setState({ hashPassword: e.target.value });
  	}*/ 

  	handleChange(e) {
  		if(e.target.id === 'loginUsername' || e.target.id === 'signUpUsername'){
  			this.setState({[e.target.id]: e.target.value});
  		}
  		else{
  			this.setState({[e.target.id]: md5(e.target.value)})
  		}
  	}

	signUp(){
		console.log("USERNAME: " + this.state.signUpUsername + ", PASSWORD: " + this.state.signUpPassword);
		
	}
	//dean -> 48767461cb09465362c687ae0c44753b
	login(){
		console.log("USERNAME: " + this.state.loginUsername + ", PASSWORD: " + this.state.loginPassword);
		this.props.updateUsername(this.state.loginUsername);
		this.props.history.push("/contribute");
		/*api.login(this.state.loginUsername, hashedPassword)
			.then(function (loginSucceeded) {
		        // if loginSucceeded is True, launch App.js
		        // if False, then display something telling them the login failed, and set the username & password to null
		      }.bind(this)); */



	}

	render(){
		return(
			<div>
				<Row>
					<Col md={6}>
						<PageHeader>LOG IN</PageHeader>
						<Form horizontal >
						    <FormGroup >
						      <Col sm={2}>
						        Username
						      </Col>
						      <Col sm={10}>
						        <FormControl type="text" 
						        			 id="loginUsername"
						        			 placeholder="Username" 
						        			 
						        			 onChange={this.handleChange} />
						        <FormControl.Feedback />
						      </Col>
						    </FormGroup>

						    <FormGroup >
						      <Col  sm={2}>
						        Password
						      </Col>
						      <Col sm={10}>
						        <FormControl type="password"
						        			 id="loginPassword" 
						        			 placeholder="Password" 
						        			 
						        			 onChange={this.handleChange} />
						        <FormControl.Feedback />
						      </Col>
						    </FormGroup>

						    <FormGroup>
						      <Col smOffset={2} sm={10}>
						        <Button onClick={() => this.login()}>
						          LOG IN
						        </Button>
						      </Col>
						    </FormGroup>
						  </Form>
					</Col>
					<Col md={6}>
						<PageHeader>SIGN UP</PageHeader>
						<Form horizontal>
						    <FormGroup >
						      <Col sm={2}>
						        Username
						      </Col>
						      <Col sm={10}>
						        <FormControl type="text"
						        			 id="signUpUsername"
						        			 placeholder="username"
						        			 
						        			 onChange={this.handleChange}
						        			  />
						      </Col>
						    </FormGroup>

						    <FormGroup >
						      <Col  sm={2}>
						        Password
						      </Col>
						      <Col sm={10}>
						        <FormControl type="password"
						        			 id="signUpPassword"
						        			 placeholder="Password"
						        			 
						        			 onChange={this.handleChange}
						        			  />
						      </Col>
						    </FormGroup>

						    <FormGroup>
						      <Col smOffset={2} sm={10}>
						        <Button type="submit" onClick={() => this.signUp()}>
						          SIGN UP
						        </Button>
						      </Col>
						    </FormGroup>
						  </Form>
					</Col>
				</Row>
			</div>
		)
	}
}

module.exports = withRouter(AccessAccount);