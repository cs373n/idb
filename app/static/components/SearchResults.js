var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

var orderByAsc = [{'field': 'name', 'direction': 'asc'}];

class SearchResults extends React.Component {
	constructor(props) {
		super();
		this.state = {
			searchString: null,
			searchResults: null,
			modelType: 'character', // CharactER, not CharactERS (╯°□°)╯︵ ┻━┻ 
			activePage: 1,
	      	numPages: 0
		}


		this.updateSearchResults = this.updateSearchResults.bind(this);
		this.createSearchCards = this.createSearchCards.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleTabSelect = this.handleTabSelect.bind(this);
		this.loadTable = this.loadTable.bind(this);
		this.buildFilter = this.buildFilter.bind(this);
	}

	componentDidMount() {
	    this.updateSearchResults(this.state.searchString, this.state.searchResults);
	}

	componentWillReceiveProps(nextProps){
		this.setState({searchString: this.props.match.params.searchString}, 
					  function() {
					  	this.updateSearchResults(this.state.searchString, null);
					  });
	}

	updateSearchResults(searchString, searchResults) {
		console.log(this.props.match.params.searchString);
		this.setState({searchString: this.props.match.params.searchString, searchResults: searchResults}, function() {
		var filter;
		console.log(this.state.searchString);
		const { modelType } = this.state;
		if(modelType === 'character') {

			filter = this.buildFilter();

			api.getCharacters(this.state.activePage, filter, orderByAsc)
		      .then(function (chars) {
		        this.setState(function () {
		          return {
		            searchResults: chars.objects,
		            numPages: chars.total_pages
		          }
		        });
		      }.bind(this));
		}
		else if(modelType === 'event'){

			filter = this.buildFilter();

			api.getEvents(this.state.activePage, filter, {})
		      .then(function (chars) {
		        this.setState(function () {
		          return {
		            searchResults: chars.objects,
		            numPages: chars.total_pages
		          }
		        });
		      }.bind(this));
		}
		else if(modelType === 'series'){

			filter = this.buildFilter();

			api.getSeries(this.state.activePage, filter, {})
		      .then(function (chars) {
		        this.setState(function () {
		          return {
		            searchResults: chars.objects,
		            numPages: chars.total_pages
		          }
		        });
		      }.bind(this));
		}
		else if(modelType === 'creator'){

			filter = this.buildFilter();

			api.getCreators(this.state.activePage, filter, {})
		      .then(function (chars) {
		        this.setState(function () {
		          return {
		            searchResults: chars.objects,
		            numPages: chars.total_pages
		          }
		        });
		      }.bind(this));
		}
	});
	}

	buildFilter() {
		const { modelType } = this.state;
		const { searchString } = this.state;
		if(modelType === 'character') {
			return [{"or": [{"name": "name", "op": "like", "val": "%" + searchString + "%"}, 
							{"name": "desc", "op": "like", "val": "%" + searchString + "%"}]}];
			//return [{'name': 'desc','op': 'any', 'val': searchString}];
		}
		else if(modelType === 'event' || modelType === 'series'){
			return [{"or": [{"name": "title", "op": "like", "val": "%" + searchString + "%"}, 
							{"name": "desc", "op": "like", "val": "%" + searchString + "%"}]}];
		}
		else if(modelType === 'creator'){
			return [{"name": "full_name", "op": "like", "val": "%" + searchString + "%"}];
		}
	}

	handleSelect(eventKey){
		this.setState({activePage: eventKey}, function () {
			this.updateSearchResults(this.state.searchString, null);
		});
	}

	handleTabSelect(eventKey){
		var modelType;
		if(eventKey === 1){
			modelType = 'character';
		}
		else if(eventKey === 2){
			modelType = 'event';
		}
		else if(eventKey === 3){
			modelType = 'series';
		}
		else if(eventKey === 4){
			modelType = 'creator';
		}

		this.setState({modelType: modelType,
					   activePage: 1},
					  function(){
					  	this.updateSearchResults(this.state.searchString, null);
					  });
	}

	createSearchCards(){
		var cardsArray = [];
		var { searchResults } = this.state;
		var modelLink = "/" + this.state.modelType + "Instance";
		for(var i = 0; i < searchResults.length; i++) {
				cardsArray.push(<SearchCard modelLink={modelLink}
								      		modelInstance={searchResults[i]} 
								      		modelType={this.state.modelType}/>);
		}
		return cardsArray;
	}

	loadTable(){
		if(!this.state.searchResults){
            return <p>LOADING!</p>;
        }
        else if(this.state.searchResults[0] === {}){
        	return <p>No results match that search criteria.</p>
        }   
        else{
         	return (
         		<div>
	         		<Table cards={this.createSearchCards()}/>
	          		<Pagination
			       	prev
			        next
			        first
			        last
			        ellipsis
			        boundaryLinks
			        items={this.state.numPages}
			        maxButtons={5}
			        activePage={this.state.activePage}
			        onSelect={this.handleSelect} />
		    	</div>
		    );
		}
	}

	render(){
		
		return(
			<div className="container">
				<PageHeader className="text-left">SEARCH RESULTS FOR: "{this.state.searchString}"</PageHeader>
				<Tabs animation bsStyle="pills" defaultActiveKey={1} onSelect={this.handleTabSelect}>
					<Tab eventKey={1} title="CHARACTERS">
						<br/>
						{this.loadTable()}
					</Tab>
					<Tab eventKey={2} title="EVENTS">
						<br/>
						{this.loadTable()}
					</Tab>
					<Tab eventKey={3} title="SERIES">
						<br/>
						{this.loadTable()}
					</Tab>	
					<Tab eventKey={4} title="CREATORS">
						<br/>
						{this.loadTable()}
					</Tab>		
				</Tabs>
			</div>
		)
	}
}

module.exports = SearchResults;