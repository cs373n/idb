var React = require('react');
import { Row, Col, Form, FormGroup, FormControl, PageHeader, Button } from 'react-bootstrap';

class AccessAccount extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName: "",
			hashPassword: ""
		}

		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	handleUserChange(e) {
    	this.setState({ username: e.target.value });
  	}

  	handlePasswordChange(e) {
    	this.setState({ hashPassword: e.target.value });
  	}

	signUp(){

	}

	logIn(){

	}

	render(){
		return(
			<div>
				<Row>
					<Col md={6}>
						<PageHeader>LOG IN</PageHeader>
						<Form horizontal >
						    <FormGroup controlId="formHorizontalEmail">
						      <Col sm={2}>
						        Email
						      </Col>
						      <Col sm={10}>
						        <FormControl type="text" placeholder="Username" value={this.state.userName} onChange={this.handleUserChange} />
						      </Col>
						    </FormGroup>

						    <FormGroup controlId="formHorizontalPassword">
						      <Col  sm={2}>
						        Password
						      </Col>
						      <Col sm={10}>
						        <FormControl type="password" placeholder="Password" value={this.state.userName} onChange={this.handlePasswordChange} />
						      </Col>
						    </FormGroup>

						    <FormGroup>
						      <Col smOffset={2} sm={10}>
						        <Button type="submit" onClick={this.logIn()}>
						          LOG IN
						        </Button>
						      </Col>
						    </FormGroup>
						  </Form>
					</Col>
					<Col md={6}>
						<PageHeader>SIGN UP</PageHeader>
						<Form horizontal>
						    <FormGroup controlId="formHorizontalEmail">
						      <Col sm={2}>
						        Email
						      </Col>
						      <Col sm={10}>
						        <FormControl type="username" placeholder="Username" />
						      </Col>
						    </FormGroup>

						    <FormGroup controlId="formHorizontalPassword">
						      <Col  sm={2}>
						        Password
						      </Col>
						      <Col sm={10}>
						        <FormControl type="password" placeholder="Password" />
						      </Col>
						    </FormGroup>

						    <FormGroup>
						      <Col smOffset={2} sm={10}>
						        <Button type="submit" onClick={this.signUp()}>
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

module.exports = AccessAccount;