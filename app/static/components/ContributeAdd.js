var React = require('react');
var api = require('./api.js');
//var ReCAPTCHA = require("react-google-recaptcha").default;
import {Form, FormGroup, FormControl, ControlLabel, Button, Col} from 'react-bootstrap';


class ContributeAdd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modelType: this.props.match.params.model,
			name: null,
			desc: null,
			series: null,
			events: null,
			comics: null,
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
		if(e.target.id === 'name' || e.target.id === 'desc'){
  			this.setState({[e.target.id]: e.target.value});
  		}
  	}

  	submitModel() {
  		var modelInfo = {
  			name: "Dean",
  			desc: "hey"
  		}
  		api.postModel(modelInfo);
  	}

	render(){
		return(
			<Form horizontal>
			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Name
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text"
			        			 id="name"
			        			 placeholder="Name"
			        			 onChange={this.handleChange} />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Description
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text"
			        			 id="desc"
			        			 placeholder="Description"
			        			 onChange={this.handleChange} />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Comics
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text"
			        			 id="comics"
			        			 placeholder="Series IDs"
			        			 onChange={this.handleChange} />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Events
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text"
			        			 id="events"
			        			 placeholder="Event IDs"
			        			 onChange={this.handleChange} />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Series
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text"
			        			 id="series"
			        			 placeholder="Series IDs"
			        			 onChange={this.handleChange} />
			      </Col>
			    </FormGroup>
{/*
			    <ReCAPTCHA
				    sitekey="6LcdHykUAAAAAChYDSaQB5WY23YqpwI5mKQndCph"
				    onChange={this.onChange}
				    onExpired={this.onExpired}
				/> */}

			    <FormGroup>
			      <Col smOffset={2} sm={10}>
			        <Button disabled={this.state.submitButtonDisabled}
			 
			        	    onClick={() => this.submitModel()}>
			          Submit {this.state.modelType}
			        </Button>
			      </Col>
			    </FormGroup>
			  </Form>
		)
	}
}

module.exports = ContributeAdd;