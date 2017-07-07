var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
var MultiSearch = require('./MultiSearch.js');
var SingleSearch = require('./SingleSearch.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

class SearchResults extends React.Component {
	constructor(props) {
		console.log("SR: Constructor");
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
		console.log("SR: componentWillMount. searchString:" + this.props.match.params.searchString);
	    this.updateSearchResults((this.props.match.params.searchString).split(" "));
	}

	componentWillReceiveProps(nextProps){
		console.log("SR: componentWillReceiveProps. nextProps: " + nextProps);
		this.setState({searchString: (nextProps.match.params.searchString).split(" ")}, 
					  function() {
					  	this.updateSearchResults(this.state.searchString);
					  });
	}

	updateSearchResults(searchString) {
		console.log("SR: updateSearchResults. searchString: " + searchString);
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
		console.log("SR: buildTitle");
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
			console.log("SR: chooseSearch(MultiSearch). modelType: " + modelType);
			return (
				<div>
					<MultiSearch searchString = {this.state.searchString}
								 modelType = {modelType}
								 delimiter = "and" />
					<MultiSearch searchString = {this.state.searchString}
								 modelType = {modelType}
								 delimiter = "or" />
				</div>
			);
		}
		else {
			console.log("SR: chooseSearch(SingleSearch). modelType: " + modelType);
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
		console.log("SR: render");	
		return(
			<div className="container">
				<PageHeader className="text-left">SEARCH RESULTS FOR: {this.buildTitle()}</PageHeader>
				<Tabs animation bsStyle="pills" onSelect={this.handleTabSelect}>
					<Tab unmountOnExit={true}eventKey={1} title="CHARACTERS">
						{console.log("SR: Tab 1")}
						<br/>
						{this.chooseSearch("character")}
					</Tab>
					<Tab unmountOnExit={true} eventKey={2} title="EVENTS">
						{console.log("SR: Tab 2")}
						<br/>
						{this.chooseSearch("event")}
					</Tab>
					<Tab unmountOnExit={true} eventKey={3} title="SERIES">
						{console.log("SR: Tab 3")}
						<br/>
						{this.chooseSearch("series")}
					</Tab>	
					<Tab unmountOnExit={true} eventKey={4} title="CREATORS">
						{console.log("SR: Tab 4")}
						<br/>
						{this.chooseSearch("creator")}
					</Tab>		
				</Tabs>
			</div>
		)
	}
}

module.exports = SearchResults;