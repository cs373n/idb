var React = require('react');
var api = require('./api.js');
//var ReCAPTCHA = require("react-google-recaptcha").default;
import { browserHistory, withRouter } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Button, Col, Row} from 'react-bootstrap';

/* PROPS: modelType (string), getModelTemplate (function) */

class ContributeAdd extends React.Component{
	constructor(props){
		super(props);
		var modelType = (props.location.pathname.split("/"))[2];
		this.state = {
			modelType: modelType,
			id: null,
			submitButtonDisabled: false	
		}
		this.onChange = this.onChange.bind(this);
		this.onExpired = this.onExpired.bind(this);
		this.submitModel = this.submitModel.bind(this);
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

  	//delete request in here. 
  	submitModel() {
  		api.deleteModel(this.state.modelType, this.state.id);
  	}

	render(){
		return(
			<div>
				<Row>
					<Col md={3}/>
					<Col md={6}>
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
						        <Button disabled={this.state.submitButtonDisabled}
						 
						        	    onClick={() => this.submitModel()}>
						          DELETE {this.state.modelType}
						        </Button>
						      </Col>
						    </FormGroup>
						</Form>
					</Col>
					<Col md={3}/>
				</Row>
			</div>
		)
	}
}

module.exports = withRouter(ContributeAdd);