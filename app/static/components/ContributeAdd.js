var React = require('react');
var api = require('./api.js');
var Link = require('react-router-dom').Link;
var ReCAPTCHA = require("react-google-recaptcha").default;
import { browserHistory, withRouter } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, 
		Button, Col, Row, PageHeader} from 'react-bootstrap';

/* PROPS: modelType (string), getModelTemplate (function) */
//Some refactorings to do: dont need formInput and formNames, make a formInfo in the state.
//Try to make the global forms to render not a thing. Why not state?
//Same in EDIT.

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
			submitButtonDisabled: true	
		}
		this.onChange = this.onChange.bind(this);
		this.onExpired = this.onExpired.bind(this);
		this.postModel = this.postModel.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getFormNames = this.getFormNames.bind(this);
		this.buildForms = this.buildForms.bind(this);
		this.backToEdit = this.backToEdit.bind(this);
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
		    if(key != 'comics' && key != 'series' && key != 'characters' && key != 'events' && key != 'creators'){
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
		    				  "Please use the form 'id, id, id...' with the id's corresponding to certain " + key;
		    }

		    //formInput should have all formNames default.
		    //Dont actually need formInput, need formInfo. Two objects not needed
		    this.state.formInput[key] = "";

		    formsToRender.push(<FormGroup>
							      <Col componentClass={ControlLabel} sm={2}>
							        {key.charAt(0).toUpperCase() + key.slice(1)}
							      </Col>
							      <Col sm={10}>
							        <FormControl type="text"
							        			 componentClass="textarea"
							        			 placeholder={placeholder}
							        			 id={key}
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

  	backToEdit(){
  		this.setState({response: null, submitButtonDisabled: true});
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

		    	//Comics does not have a num_series attribute, always 1
		    	if(key === 'series' && modelType === 'comics'){
		    		if(connectionSet.has(""))
		    			delete this.state.infoToPost.relationships[key];
		    		else
		    			this.state.infoToPost.relationships[key] = {data: data};
		    	}
		    	else{
		    		if(connectionSet.has("")){
		    			this.state.infoToPost.attributes['num_' + key] = 0;
		    			delete this.state.infoToPost.relationships[key];
		    		}
		    		else{
		    			this.state.infoToPost.attributes['num_' + key] = connectionSet.size;
		    			this.state.infoToPost.relationships[key] = {data: data};
		    		}
		    	}
		    }
		    else{
		    	if(this.state.formInput[key] != "")
		    		this.state.infoToPost.attributes[key] = this.state.formInput[key];
		    	else if(key === 'price')
		    		this.state.infoToPost.attributes[key] = 0;
		    	else
		    		this.state.infoToPost.attributes[key] = null;

		    }
  		}
  	}
	
  	postModel() {
  		this.buildInfoToPost();
  		//api.postModel(this.state.modelType, this.state.infoToPost)
  		api.postModel(this.state.modelType, this.state.infoToPost)
  		.then(function(response){
  			if(response.status >= 200 && response.status < 300){
  				var stateResponse = [];
  				stateResponse.push(
  					<PageHeader className="text-center">Your {this.state.modelType.toUpperCase()} was successfully created!
  						<br/>
  						<br/>
  						<Link to={"/" + this.state.modelType + "Instance/" + response.data.data.id}>
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
		if(this.state.response){
			return (<div>
						{this.state.response}
					</div>);
		}
		else{
			return(
				<div>
					<Row>
						<Col md={2}/>
						<Col md={8}>
							<PageHeader className="text-center">ADD {this.state.modelType.toUpperCase()}</PageHeader>
							<Form horizontal>
								{formsToRender}
								
								<FormGroup>

									<Col smOffset={2} sm={10}>
									<ReCAPTCHA
 				    sitekey= "6LdgbikUAAAAALt-i50b8TbvB8D9WiIIS0Osp5rU"
 				    onChange={this.onChange}
 				    onExpired={this.onExpired}
 				/>
 				<br/>
										<Button disabled={this.state.submitButtonDisabled}
												bsStyle="red"
												onClick={() => this.postModel()}>
										Submit {this.state.modelType.toUpperCase()}
										</Button>
									</Col>
								</FormGroup>
							</Form>
						</Col>
						<Col md={2}/>
					</Row>
				</div>
			)
		}
	}
}

module.exports = withRouter(ContributeAdd);
