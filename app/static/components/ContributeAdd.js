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
			newModelInfo: {},
			submitButtonDisabled: false	
		}
		this.onChange = this.onChange.bind(this);
		this.onExpired = this.onExpired.bind(this);
		this.submitModel = this.submitModel.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getFormNames = this.getFormNames.bind(this);
		this.buildForms = this.buildForms.bind(this);
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
	buildForms(){
		console.log("IN BUILD FORMS");
		console.log(this.state.modelType);
		console.log(this.props.getModelTemplate(this.state.modelType));
		var formsToRender = [];
		var formNames = this.getFormNames(this.props.getModelTemplate(this.state.modelType));
		for (var key in formNames) {
		    // skip loop cycle if the property is from prototype
		    if (!formNames.hasOwnProperty(key)) 
		    	continue;

		    formsToRender.push(<FormGroup>
							      <Col componentClass={ControlLabel} sm={2}>
							        {key.charAt(0).toUpperCase() + key.slice(1)}
							      </Col>
							      <Col sm={10}>
							        <FormControl type="text"
							        			 id={key}
							        			 placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
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

	//Set newModelInfo in here...this may be tricky.
	handleChange(e) {
		if(e.target.id === 'name' || e.target.id === 'desc'){
  			this.setState({[e.target.id]: e.target.value});
  		}
  	}

  	//build request in here. 
  	submitModel() {
  		var modelInfo = {
  			name: "Dean",
  			desc: "hey"
  		}
  		api.postModel(modelInfo);
  	}

	render(){
		return(
			<div>
				<Row>
					<Col md={3}/>
					<Col md={6}>
						<Form horizontal>
							{this.buildForms()}

							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Button disabled={this.state.submitButtonDisabled}
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

module.exports = withRouter(ContributeAdd);