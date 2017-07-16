var React = require('react');
var api = require('./api.js');
//var ReCAPTCHA = require("react-google-recaptcha").default;
import { browserHistory, withRouter } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Button, Col, Row} from 'react-bootstrap';

/* PROPS: modelType (string), getModelTemplate (function) */

var formsToRender = [];

class ContributeEdit extends React.Component{
	constructor(props){
		super(props);
		var modelType = (props.location.pathname.split("/"))[2];
		this.state = {
			modelType: modelType,
			modelInstance: null, //formInput equivalent in ADD
			infoToPost: {},
			formInput: {},
			loaded: false,
			id: null,
			submitButtonDisabled: false	
		}

		this.onChange = this.onChange.bind(this);
		this.onExpired = this.onExpired.bind(this);
		this.submitModel = this.submitModel.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getFormNames = this.getFormNames.bind(this);
	}

	componentWillUpdate(nextProps, nextState){
		if(nextState.modelInstance){
			console.log("updated modelInstance");
			console.log(this.state.modelInstance);
			formsToRender = this.buildForms(nextState.modelInstance);
		}
		else{
			console.log("FUUUUUCK");
		}
	}

	getModelToEdit(){
		api.getModel(this.state.id, this.state.modelType)
		   .then(function(response){
		   		this.setState({modelInstance: response, loaded: true})
		   }.bind(this));
	}
	//Loop through ModelTemplate keys, get only the fields people need to enter information into
	getFormNames(modelTemplate){
		console.log("IN GET FORM NAMES");
		var formNames = {};
		for (var key in modelTemplate) {
		    // skip loop cycle if the property is from prototype
		    if (!modelTemplate.hasOwnProperty(key)) 
		    	continue;

		    if(key != 'img' && key != 'id' && (key.slice(0, 3) != 'num')){
		    	formNames[key] = null;
		    }
		}
		console.log(formNames);
		return formNames;
	}

	//Build forms for a the specific modelType
	buildForms(modelInstance){
		console.log(modelInstance);
		this.state.formInput['attributes'] = modelInstance.attributes;
		this.state.formInput['connections'] = modelInstance.relationships;
		console.log("FORM INPUT");
		console.log(this.state.formInput);
		var formsToRender = [];
		var formNames = this.getFormNames(this.props.getModelTemplate(this.state.modelType));
		for (var key in formNames) {
		    // skip loop cycle if the property is from prototype
		    if (!formNames.hasOwnProperty(key)) 
		    	continue;

		    if(key === 'name' || key === 'title' || key === 'full_name' || key === 'desc'){
		    	formsToRender.push(<FormGroup>
							      <Col componentClass={ControlLabel} sm={2}>
							        {key.charAt(0).toUpperCase() + key.slice(1)}
							      </Col>
							      <Col sm={10}>
							        <FormControl type="text"
							        			 componentClass="textarea"
							        			 value={this.state.formInput.attributes[key]}
							        			 id={key}
							        			 placeholder=""
							        			 onChange={this.handleChange} />
							      </Col>
							    </FormGroup>);
		    }
		    else{
		    	var connectionArray = modelInstance.relationships[key].data;
		    	//for(var i = 0; i < connectionArray.length; i++){

		    	//}
		    }
		    /*
		    formsToRender.push(<FormGroup>
							      <Col componentClass={ControlLabel} sm={2}>
							        {key.charAt(0).toUpperCase() + key.slice(1)}
							      </Col>
							      <Col sm={10}>
							        <FormControl type="text"
							        			 componentClass="textarea"
							        			 value={this.state.formInput[key]}
							        			 id={key}
							        			 placeholder=""
							        			 onChange={this.handleChange} />
							      </Col>
							    </FormGroup>);*/
		}
		return formsToRender;
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
		if(e.target.id === 'id')
  			this.setState({[e.target.id]: e.target.value});
  		else{
  			this.setState({formInput: {[e.target.id]: e.target.value}})
  		}
  	}

  	//build request in here. 
  	submitModel() {
  		console.log(this.state.infoToPost);
  		console.log(this.state.modelInstance);
  		//api.postModel(modelInfo);
  	}

	render(){
		if(!this.state.modelInstance)
		{
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
						        			 placeholder={"Provide the ID of the " + this.state.modelType + "you want to edit."}
						        			 onChange={this.handleChange} />
						      </Col>
						    </FormGroup>
						    <FormGroup>
								<Col smOffset={2} sm={10}>
									<Button onClick={() => this.getModelToEdit()}>
									Get {this.state.modelType} To Edit
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Col>
					<Col md={3}/>
				</Row>
			</div>)
		}
		else{
			return (
			<div>
				<Row>
					<Col md={3}/>
					<Col md={6}>
						<Form horizontal>
							{formsToRender}
							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Button disabled={this.state.submitButtonDisabled}
											onClick={() => this.submitModel()}>
									Submit Changes to this {this.state.modelType}
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
}

module.exports = withRouter(ContributeEdit);