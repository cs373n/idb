var React = require('react');
var api = require('./api.js');
var Link = require('react-router-dom').Link;
//var ReCAPTCHA = require("react-google-recaptcha").default;
import { browserHistory, withRouter } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, 
		Button, Col, Row} from 'react-bootstrap';

/* PROPS: modelType (string), getModelTemplate (function) */

var formsToRender = [];

class ContributeAdd extends React.Component{
	constructor(props){
		super(props);
		var modelType = (props.location.pathname.split("/"))[2];
		this.state = {
			modelType: modelType,
			formInput: {},
			infoToPost: {},
			response: null,
			submitButtonDisabled: false	
		}
		this.onChange = this.onChange.bind(this);
		this.onExpired = this.onExpired.bind(this);
		this.submitModel = this.submitModel.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getFormNames = this.getFormNames.bind(this);
		this.buildForms = this.buildForms.bind(this);
	}

	componentWillMount(){
		formsToRender = this.buildForms();
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
		console.log(formNames);
		return formNames;
	}

	//Build forms for a the specific modelType
	buildForms(){
		var formsToRender = [];
		var formNames = this.getFormNames(this.props.getModelTemplate(this.state.modelType));
		for (var key in formNames) {
		    // skip loop cycle if the property is from prototype
		    if (!formNames.hasOwnProperty(key)) 
		    	continue;

		    var placeholder = "";
		    if(key === 'name' || key === 'title' || key === 'full_name' || key === 'desc'){
		    	placeholder = key.charAt(0).toUpperCase() + key.slice(1);
		    	if(key === 'desc'){
		    		placeholder = "Description";
		    	}
		    }
		    else{
		    	placeholder = "Enter the " + key + " you would like this " + this.state.modelType + " to be connected to. " +
		    				  "Please use the form 'id1,id2,id3,...' with the id's corresponding to certain " + key;
		    }

		    formsToRender.push(<FormGroup>
							      <Col componentClass={ControlLabel} sm={2}>
							        {key.charAt(0).toUpperCase() + key.slice(1)}
							      </Col>
							      <Col sm={10}>
							        <FormControl type="text"
							        			 componentClass="textarea"
							        			 id={key}
							        			 placeholder={placeholder}
							        			 onChange={this.handleChange} />
							      </Col>
							    </FormGroup>);
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

	//All formInput fields stored as strings
	handleChange(e) {
  		this.state.formInput[e.target.id] = e.target.value;
  	}
  	
  	//format formInput to prepare it for POSTing
  	buildInfoToPost(){
  		const {formInput} = this.state;
  		var modelType = this.state.modelType;

  		//Make modelType plural
  		if(modelType != 'series'){
  			modelType += "s";
  		}

  		this.state.infoToPost['type'] = modelType;
  		this.state.infoToPost['attributes'] = {};
  		this.state.infoToPost['relationships'] = {};

  		for(var key in formInput){
  			// skip loop cycle if the property is from prototype
  			if (!formInput.hasOwnProperty(key)) 
		    	continue;

		    if(key === 'series' ||
		       key === 'comics' 	||
		       key === 'characters' ||
		       key === 'creators' ||
		       key === 'events'){
		    	var connectionArray = (formInput[key].split(","));
		    	var data = [];
		    	for(var i = 0; i < connectionArray.length; i++){
		    		data[i] = {id: connectionArray[i], type: key};
		    	}

		    	if(key === 'series' && modelType === 'comics'){
		    		this.state.infoToPost.relationships[key] = {data: data};
		    	}
		    	else{
		    		this.state.infoToPost.attributes['num_' + key] = connectionArray.length;
		    		this.state.infoToPost.relationships[key] = {data: data};
		    	}
		    	
		    }
		    else{
		    	this.state.infoToPost.attributes[key] = this.state.formInput[key];
		    }
  		}
  	}
	
  	submitModel() {
  		this.buildInfoToPost();
  		console.log(this.state.infoToPost);
  		console.log(this.state.formInput);
  		//api.postModel(this.state.modelType, this.state.infoToPost)
  		api.postModel2(this.state.modelType, this.state.infoToPost)
  		.then(function(response){
  			if(response.status >= 200 && response.status < 300){
  				var stateResponse = [];
  				stateResponse.push(
  					<h1>Your {this.state.modelType} was successfully created!
  						You can view your {this.state.modelType} 
  						<Link to={"/" + this.state.modelType + "Instance/" + response.data.data.id}>
  							HERE
  						</Link>
  					</h1>
  				);
  				this.setState({response: stateResponse});
  			}
  			else{
  				var stateResponse = [];
  				stateResponse.push(
  					<h1>Ooops, something was wrong with your input. Double check your input
  					and try again</h1>);
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
			return(
				<div>
					<Row>
						<Col md={3}/>
						<Col md={6}>
							<Form horizontal>
								{formsToRender}

								<FormGroup>
									<Col smOffset={2} sm={10}>
										<Button disabled={this.state.submitButtonDisabled}
												/*type="submit"*/
												onClick={() => this.submitModel()}>
										Submit {this.state.modelType}
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

module.exports = withRouter(ContributeAdd);