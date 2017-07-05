var React = require('react');
var Link = require('react-router-dom').Link;
import { FormGroup, FormControl } from 'react-bootstrap';

class Search extends React.Component {
	constructor(props){
		super();
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

  	handleChange(e) {
    	this.setState({ value: e.value });
  	}

  	handleSubmit(event){
  		event.preventDefault();
  		console.log("did stuff");
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

module.exports = Search;