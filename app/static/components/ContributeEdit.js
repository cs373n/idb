var React = require('react');
var api = require('./api.js');
var Link = require('react-router-dom').Link;
var ReCAPTCHA = require("react-google-recaptcha").default;
import { browserHistory, withRouter } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, PageHeader} from 'react-bootstrap';

/* PROPS: modelType (string), getModelTemplate (function) */

var formsToRender = [];

class ContributeEdit extends React.Component{
	constructor(props){
		super(props);
		var modelType = (props.location.pathname.split("/"))[2];
		this.state = {
			modelType: modelType,
			modelInstance: null,
			formInput: {},
			infoToPatch: {},
			response: null,
			loaded: 0,
			id: null,
			submitButtonDisabled: true	
		}

		this.onChange = this.onChange.bind(this);
		this.onExpired = this.onExpired.bind(this);
		this.patchModel = this.patchModel.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getFormNames = this.getFormNames.bind(this);
		this.buildinfoToPatch = this.buildinfoToPatch.bind(this);
	}

	componentWillUpdate(nextProps, nextState){
		if(nextState.loaded === 1){
			formsToRender = this.buildForms(nextState.modelInstance);
		}
	}

	//Loop through ModelTemplate keys, get only the fields people need to enter information into
	getFormNames(modelTemplate){
		var formNames = {};
		for (var key in modelTemplate) {
		    // skip loop cycle if the property is from prototype
		    if (!modelTemplate.hasOwnProperty(key)) 
		    	continue;

		    if(key != 'img' && key != 'id' && (key.slice(0, 3) != 'num')){
		    	formNames[key] = null;
		    }
		}
		return formNames;
	}

	//Build forms for a the specific modelType
	buildForms(modelInstance){
		var formsToRender = [];
		var formNames = this.getFormNames(this.props.getModelTemplate(this.state.modelType));
		for (var key in formNames) {
			//variables for each form that we make
			var placeholder = "";
		    var defaultValue = "";

		    // skip loop cycle if the property is from prototype
		    if (!formNames.hasOwnProperty(key)) 
		    	continue;

		    //Logic to handle defaultValue and placeholder for different keys
		    if(key != 'comics' && key != 'series' && key != 'characters' && key != 'events' && key != 'creators'){
		    	defaultValue = modelInstance.attributes[key];
		    	placeholder = key.charAt(0).toUpperCase() + key.slice(1);
		    	if(key === 'desc'){
		    		placeholder = "Description";
		    	}
		    	else if(key === 'start' || key === 'end'){
		    		placeholder += " Year";
		    	}
		    }
		    else{
		    	placeholder = "Enter the " + key + " you would like this " + this.state.modelType + " to be connected to. " +
		    				  "Please use the form 'id, id, id,...' with the id's corresponding to certain " + key;
		    	var connectionArray = modelInstance.relationships[key].data;
		    	for(var i = 0; i < connectionArray.length; i++)
		    	{
		    		defaultValue += (connectionArray[i].id);
		    		if(i != connectionArray.length-1){
		    			defaultValue += ", ";
		    		}
		    	}
		    }

		    //Build formInput to hold the preliminary content
		    this.state.formInput[key] = defaultValue;

		    formsToRender.push(<FormGroup>
							      <Col componentClass={ControlLabel} sm={2}>
							        {key.charAt(0).toUpperCase() + key.slice(1)}
							      </Col>
							      <Col sm={10}>
							        <FormControl type="text"
							        			 componentClass="textarea"
							        			 defaultValue={defaultValue}
							        			 placeholder={placeholder}
							        			 id={key}
							        			 onChange={this.handleChange} />
							      </Col>
							    </FormGroup>);
		}
		return formsToRender;
	}

	//format formInput to prepare it for PATCHing
  	buildinfoToPatch(){
  		const {formInput} = this.state;
  		var modelType = this.state.modelType;

  		//Make modelType plural
  		if(modelType != 'series'){
  			modelType += "s";
  		}

  		this.state.infoToPatch['type'] = modelType;
  		this.state.infoToPatch['attributes'] = {};
  		this.state.infoToPatch['relationships'] = {};
  		this.state.infoToPatch['id'] = this.state.id;

  		for(var key in formInput){
  			// skip loop cycle if the property is from prototype or field is ""
  			if (!formInput.hasOwnProperty(key)) 
		    	continue;

		    if(key === 'series' ||
		       key === 'comics' 	||
		       key === 'characters' ||
		       key === 'creators' ||
		       key === 'events'){
		    	var connectionSet = new Set(formInput[key].split(", "));
		    	var data = [];
		    	for(let id of connectionSet){
		    		data.push({id: id, type: key});
		    	}

		    	if(key === 'series' && modelType === 'comics'){
		    		if(connectionSet.has(""))
		    			this.state.infoToPatch.relationships[key] = {data: []};
		    		else
		    			this.state.infoToPatch.relationships[key] = {data: data};
		    	}
		    	else{
		    		if(connectionSet.has("")){
		    			this.state.infoToPatch.attributes['num_' + key] = 0;
		    			this.state.infoToPatch.relationships[key] = {data: []};
		    		}
		    		else{
		    			this.state.infoToPatch.attributes['num_' + key] = connectionSet.size;
		    			this.state.infoToPatch.relationships[key] = {data: data};
		    		}
		    	}
		    	
		    }
		    else{
		    	if(this.state.formInput[key] != "")
		    		this.state.infoToPatch.attributes[key] = this.state.formInput[key];
		    	else if(key === 'price')
		    		this.state.infoToPatch.attributes[key] = 0;
		    	else
		    		this.state.infoToPatch.attributes[key] = null;
		    }
  		}
  	}

	// Executed when captcha succeeds
	onChange(value) {
	 	this.setState({submitButtonDisabled: false});
	}

	// If Captcha expires, set the button state to disabled
	onExpired(value) {
		this.setState({submitButtonDisabled: true})
	}

	//set state when people are typing into fields
	handleChange(e) {
		if(e.target.id === 'id')
  			this.setState({[e.target.id]: e.target.value});
		else
			this.state.formInput[e.target.id] = e.target.value;

  		this.setState({loaded: 2});
  	}

  	goBack(){
  		this.setState({response: null, modelInstance: null});
  	}

  	backToEdit(){
  		this.setState({response: null, submitButtonDisabled: true});
  	}

  	//Fetch the model info that users can then edit
  	getModelToEdit(){
		api.getModel(this.state.id, this.state.modelType)
		   .then(function(response){
		   		if(response.status >= 200 && response.status < 300){
		   			this.setState({modelInstance: response.data.data, loaded: 1})
		   		}
		   		else{
		   			var stateResponse = [];
		   			stateResponse.push(
  					<div>
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
  					this.setState({response: stateResponse, modelInstance: {}});
		   		}
		   }.bind(this));
	}

  	//Submit a patch request on the edited model info. 
  	patchModel() {
  		this.buildinfoToPatch();
  		api.patchModel(this.state.modelType, this.state.id, this.state.infoToPatch)
  		.then(function(response){
  			if(response.status >= 200 && response.status < 300){
  				var stateResponse = [];
  				stateResponse.push(
  					<PageHeader className="text-center">The {this.state.modelType.toUpperCase()} was successfully updated!
  						<br/>
  						<br/>
  						<Link to={"/" + this.state.modelType + "Instance/" + this.state.id}>
  							CLICK HERE TO VIEW
  						</Link>
  					</PageHeader>
  				);
  				this.setState({response: stateResponse});
  			}
  			else{
  				var stateResponse = [];
  				stateResponse.push(
  					<div>
  					<PageHeader className="text-center">Ooops, something was wrong with your input. 
  					<br/>
  					<br/>
  					Double check your input
  					and try again.
  					<br/>
  					<br/>
  					<Button className="center-block" bsStyle="red" onClick={() => this.backToEdit()}> TRY AGAIN </Button>
  					</PageHeader>
  					
  					</div>);
  				this.setState({response: stateResponse});
  			}
  		}.bind(this));
  	}

	render(){
		if(!this.state.modelInstance)
		{
			return(
			<div>
				<Row>
					<Col md={2}/>
					<Col md={8}>
						<PageHeader className="text-center">Provide ID of {this.state.modelType.toUpperCase()} to EDIT</PageHeader>
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
									<Button bsStyle="red" onClick={() => this.getModelToEdit()}>
									Get {this.state.modelType.toUpperCase()} To Edit
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Col>
					<Col md={2}/>
				</Row>
			</div>)
		}
		else if(this.state.response){
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
						<PageHeader className="text-center">EDIT {this.state.modelType.toUpperCase()}</PageHeader>
							<Form horizontal>
								{formsToRender}
								<FormGroup>
									<Col smOffset={2} sm={10}>
										<ReCAPTCHA
 				    sitekey="6LcdHykUAAAAAChYDSaQB5WY23YqpwI5mKQndCph"
 				    onChange={this.onChange}
 				    onExpired={this.onExpired}
 				/>
 				<br/>
										<Button disabled={this.state.submitButtonDisabled}
												onClick={() => this.patchModel()}
												bsStyle="red">
										Submit Changes to this {this.state.modelType.toUpperCase()}
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