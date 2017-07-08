var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

var orderByAsc = [{'field': 'name', 'direction': 'asc'}];

/*
	Props: modelType, searchString
*/

class SingleSearch extends React.Component {
	constructor(props) {
		console.log("SS: Constructor entered");
		super();
		this.state = {
			searchResults: null,
			activePage: 1,
	      	numPages: 0,
		}

		this.updateSearchResults = this.updateSearchResults.bind(this);
		this.createSearchCards = this.createSearchCards.bind(this);
		this.handlePageSelect = this.handlePageSelect.bind(this);
		this.loadTable = this.loadTable.bind(this);
		this.buildFilter = this.buildFilter.bind(this);
	}

	componentWillMount() {
		console.log("SS: Component will mount");
	    this.updateSearchResults(null);
	}

	componentWillReceiveProps(nextProps){
		console.log("SS: Component will receive props")
		if(nextProps.modelType != this.props.modelType || (nextProps.searchString != this.props.searchString)) {
			this.props = nextProps;
			this.updateSearchResults(null);
		}
	}

	updateSearchResults(searchResults) {
		console.log("SS: updateSearchResults");
		const { modelType } = this.props;
		var filter;

		this.setState(function() {
			return {
				searchResults: searchResults
			}
		});

		if(modelType === 'character') {
				
				filter = this.buildFilter();

				api.getCharacters(this.state.activePage, filter, {})
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
	}

	buildFilter() {
		console.log("SS: build filter");
		const { modelType } = this.props;
		var searchString = this.props.searchString[0];

		if(modelType === 'character') {
			if(isNaN(searchString)){
				return [{"or": [{"name": "name", "op": "ilike", "val": "%" + searchString + "%"}, 
								{"name": "desc", "op": "ilike", "val": "%" + searchString + "%"}]}];
			}
			else{
				return [{"or": [{"name": "name", "op": "ilike", "val": "%" + searchString + "%"}, 
								{"name": "desc", "op": "ilike", "val": "%" + searchString + "%"},
								{"name": "id", "op": "==", "val": searchString}, 
								{"name": "num_comics", "op": "==", "val": searchString},
								{"name": "num_events", "op": "==", "val": searchString}, 
								{"name": "num_series", "op": "==", "val": searchString}]}];
			}
		}
		else if(modelType === 'event'){
			if(isNaN(searchString)){
				return [{"or": [{"name": "title", "op": "ilike", "val": "%" + searchString + "%"}, 
								{"name": "desc", "op": "ilike", "val": "%" + searchString + "%"}]}];
			}
			else{
				return [{"or": [{"name": "title", "op": "ilike", "val": "%" + searchString + "%"}, 
								{"name": "desc", "op": "ilike", "val": "%" + searchString + "%"},
								{"name": "id", "op": "==", "val": searchString}, 
								{"name": "num_comics", "op": "==", "val": searchString},
								{"name": "num_creators", "op": "==", "val": searchString}, 
								{"name": "num_series", "op": "==", "val": searchString},
								{"name": "num_characters", "op": "==", "val": searchString}]}];
			}
		}
		else if(modelType === 'series'){
			if(isNaN(searchString)){
				return [{"or": [{"name": "title", "op": "ilike", "val": "%" + searchString + "%"}, 
								{"name": "desc", "op": "ilike", "val": "%" + searchString + "%"}]}];
			}
			else{
				return [{"or": [{"name": "title", "op": "ilike", "val": "%" + searchString + "%"}, 
								{"name": "desc", "op": "ilike", "val": "%" + searchString + "%"},
								{"name": "id", "op": "==", "val": searchString}, 
								{"name": "num_comics", "op": "==", "val": searchString},
								{"name": "num_events", "op": "==", "val": searchString}, 
								{"name": "num_creators", "op": "==", "val": searchString},
								{"name": "num_characters", "op": "==", "val": searchString}]}];
			}
		}
		else if(modelType === 'creator'){
			if(isNaN(searchString)){
				return [{"name": "full_name", "op": "ilike", "val": "%" + searchString + "%"}];
			}
			else{
				return [{"or": [{"name": "full_name", "op": "ilike", "val": "%" + searchString + "%"}, 
								{"name": "id", "op": "==", "val": searchString},
								{"name": "num_comics", "op": "==", "val": searchString}, 
								{"name": "num_events", "op": "==", "val": searchString},
								{"name": "num_series", "op": "==", "val": searchString}]}];
			}
		}
	}

	handlePageSelect(eventKey){
		console.log("SS: handlePageSelect");
		this.setState({activePage: eventKey}, function () {
			this.updateSearchResults(null);
		});
	}

	createSearchCards(){
		console.log("SS: createSearchCards");
		var cardsArray = [];
		var { searchResults } = this.state;
		var modelLink = "/" + this.props.modelType + "Instance";
		for(var i = 0; i < searchResults.length; i++) {
				cardsArray.push(<SearchCard modelLink={modelLink}
								      		modelInstance={searchResults[i]} 
								      		modelType={this.props.modelType}
								      		searchType="single"
								      		searchString={this.props.searchString}/>);
		}
		return cardsArray;
	}

	loadTable(){
		console.log("SS: loadTable");
		if(!this.state.searchResults){
            return <p>LOADING!</p>;
        }
        else if(this.state.searchResults[0] === {}){
        	return <p>No results match that search criteria.</p>
        }   
        else {
        	console.log("SS: loadTable else{}");
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
			        onSelect={this.handlePageSelect} />
		    	</div>
		    );
		}
	}

	render() {
		console.log("SS: render");
		return (
			<div>
				{this.loadTable()}
			</div>
		);
	}
}

module.exports = SingleSearch;