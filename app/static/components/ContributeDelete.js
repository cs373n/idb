var React = require('react');
var api = require('./api.js');
var ReCAPTCHA = require("react-google-recaptcha").default;
import { browserHistory, withRouter } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, PageHeader} from 'react-bootstrap';

/* PROPS: modelType (string), getModelTemplate (function) */

class ContributeAdd extends React.Component{
	constructor(props){
		super(props);
		var modelType = (props.location.pathname.split("/"))[2];
		this.state = {
			modelType: modelType,
			id: null,
			response: null,
			submitButtonDisabled: true
		}
		this.onChange = this.onChange.bind(this);
		this.onExpired = this.onExpired.bind(this);
		this.deleteModel = this.deleteModel.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	// Executed when captcha succeeds
	onChange(value) {
	 	this.setState({submitButtonDisabled: false});
	}

	// If Captcha expires, set the button state to disabled
	onExpired(value) {
		this.setState({submitButtonDisabled: true})
	}

	handleChange(e) {
  		this.setState({[e.target.id]: e.target.value});
  	}

  	goBack(){
  		this.setState({response: null, submitButtonDisabled: true});
  	}

  	//delete request in here. 
  	deleteModel() {
  		api.deleteModel(this.state.modelType, this.state.id)
  		.then(function(response){
		   		console.log(response);
		   		if(response.status >= 200 && response.status < 300){
		   			var stateResponse = [];
		   			stateResponse.push(
  					<PageHeader className="text-center">{this.state.modelType.toUpperCase()} with ID: {this.state.id} successfully deleted.</PageHeader>);
  					this.setState({response: stateResponse});
		   		}
		   		else{
		   			console.log("Penis");
		   			var stateResponse = [];
		   			stateResponse.push(<div>
  					<PageHeader className="text-center">Ooops, something was wrong with your input. 
  					<br/>
  					<br/>
  					Double check your input
  					and try again.
  					<br/>
  					<br/>
  					<Button className="center-block" bsStyle="red" onClick={() => this.goBack()}> TRY AGAIN </Button>
  					</PageHeader>
  					
  					</div>);
  					this.setState({response: stateResponse});
		   		}
		   }.bind(this));
  	}

	render(){
			if(this.state.response){
				return (<div>
							{this.state.response}
						</div>);
			}
			else{
				return (
					<div>
				<Row>
					<Col md={3}/>
					<Col md={6}>
					<PageHeader className="text-center">Provide ID of {this.state.modelType.toUpperCase()} to DELETE</PageHeader>
						<Form horizontal>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									ID
								</Col>
								<Col sm={10}>
									<FormControl type="text"
										 id="id"
										 placeholder={"Provide the ID of the " + this.state.modelType + "you want to delete."}
										 onChange={this.handleChange} />
								</Col>
							</FormGroup>

						    <FormGroup>

						      <Col smOffset={2} sm={10}>
						      <ReCAPTCHA
 				    sitekey="6LcdHykUAAAAAChYDSaQB5WY23YqpwI5mKQndCph"
 				    onChange={this.onChange}
 				    onExpired={this.onExpired}
 				/>
 				<br/>
						        <Button disabled={this.state.submitButtonDisabled}
						 				bsStyle="red"
						        	    onClick={() => this.deleteModel()}>
						          DELETE {this.state.modelType.toUpperCase()}
						        </Button>
						      </Col>
						    </FormGroup>
						</Form>
					</Col>
					<Col md={3}/>
				</Row>
			</div>
				);
			}
	}
}

module.exports = withRouter(ContributeAdd);