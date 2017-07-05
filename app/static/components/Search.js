var React = require('react');
var Link = require('react-router-dom').Link;
import { FormGroup, FormControl } from 'react-bootstrap';
import { browserHistory, withRouter } from 'react-router';

class Search extends React.Component {
	constructor(props){
		super();
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  	handleChange(e) {
    	this.setState({ value: e.target.value });
  	}

  	handleSubmit(event){
  		event.preventDefault();
  		console.log("did stuff");
  		var searchEndPoint = this.state.value
  		console.log(searchEndPoint);
  		this.props.history.push("/searchResults/" + searchEndPoint);
  	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="formBasicText">
			      		<FormControl type="text" 
			      					 value={this.state.value} 
			      					 placeholder="Search..."
			      					 onChange={this.handleChange} />

			      		<FormControl.Feedback />
			      	</FormGroup>
			     </form>
		    </div>
		)
	}
}

module.exports = withRouter(Search);