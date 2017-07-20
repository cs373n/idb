var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
var MultiSearch = require('./MultiSearch.js');
var SingleSearch = require('./SingleSearch.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

class SearchResults extends React.Component {
	constructor(props) {
		super();
		this.state = {
			searchString: null,
			multiSearch: false
		}

		this.updateSearchResults = this.updateSearchResults.bind(this);
		this.chooseSearch = this.chooseSearch.bind(this);
		this.buildTitle = this.buildTitle.bind(this);
	}

	componentWillMount() {
	    this.updateSearchResults((this.props.match.params.searchString).split(" "));
	}

	componentWillReceiveProps(nextProps){
		this.setState({searchString: (nextProps.match.params.searchString).split(" ")}, 
					  function() {
					  	this.updateSearchResults(this.state.searchString);
					  });
	}

	updateSearchResults(searchString) {
		var multiSearch;
		if(searchString.length <= 1){
			multiSearch = false;
		}
		else{
			multiSearch = true;
		}

		this.setState({searchString: searchString, multiSearch: multiSearch});
	}


	buildTitle(){
		const { searchString } = this.state;
		var title = "'";
		for(var i = 0; i < searchString.length; i++){
			title += searchString[i];
			if(i != searchString.length-1)
				title += " ";
		}
		title += "'";
		return title;
	}

	chooseSearch(modelType) {
		if(this.state.multiSearch) {
			return (
				<div>
					<MultiSearch searchString = {this.state.searchString}
								 modelType = {modelType}
								 delimiter = "or" />
					<MultiSearch searchString = {this.state.searchString}
								 modelType = {modelType}
								 delimiter = "and" />
				</div>
			);
		}
		else {
			return (
				<div>
					<SingleSearch searchString = {this.state.searchString}
								  modelType = {modelType}
					/>
				</div>
			);
		}
	}

	render(){
		return(
			<div>
				<PageHeader className="text-left" 
							style={{marginBottom: '0px', width: '100%', borderBottom: '2px solid white'}}>
							SEARCH RESULTS FOR: {this.buildTitle()}
							{this.state.multiSearch ? 
							 <div className="pull-right"><small>Scroll down for more search combinations</small></div> : <div/>}
							
				</PageHeader>

				<Tabs animation bsStyle="pills" onSelect={this.handleTabSelect} justified>
					<Tab unmountOnExit={true} eventKey={1} title="CHARACTERS">
						<br/>
						{this.chooseSearch("character")}
					</Tab>
					<Tab unmountOnExit={true} eventKey={2} title="EVENTS">
						<br/>
						{this.chooseSearch("event")}
					</Tab>
					<Tab unmountOnExit={true} eventKey={3} title="SERIES">
						<br/>
						{this.chooseSearch("series")}
					</Tab>	
					<Tab unmountOnExit={true} eventKey={4} title="COMICS">
						<br/>
						{this.chooseSearch("comic")}
					</Tab>		
					<Tab unmountOnExit={true} eventKey={5} title="CREATORS">
						<br/>
						{this.chooseSearch("creator")}
					</Tab>
				</Tabs>
			</div>
		)
	}
}

module.exports = SearchResults;