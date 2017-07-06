var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

class MultiSearch extends React.Component{
	constructor(props) {
		super();
		this.state = {
			searchResults: null,
			activePage: 1,
	      	numPages: 0
	    }
	}

	render(){
		return(
			<div>
				<h1>wassssssup</h1>
	    	</div>
	    );
	}
}

module.exports = MultiSearch;