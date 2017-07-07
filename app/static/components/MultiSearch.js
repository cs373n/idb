var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

var orderByAsc = [{'field': 'name', 'direction': 'asc'}];

/*
	Props: modelType, searchString, delimiter
*/

class MultiSearch extends React.Component{
	constructor(props) {
		super();
		this.state = {
			searchResults: null,
			activePage: 1,
	      	numPages: 0
	    }

	    this.updateSearchResults = this.updateSearchResults.bind(this);
		this.createSearchCards = this.createSearchCards.bind(this);
		this.handlePageSelect = this.handlePageSelect.bind(this);
		this.loadTable = this.loadTable.bind(this);
		this.buildFilter = this.buildFilter.bind(this);
		this.buildTitle = this.buildTitle.bind(this);
	}

	componentWillMount() {
		console.log("MS: Component will mount");
	    this.updateSearchResults(null);
	}

	componentWillReceiveProps(nextProps){
		console.log("MS: Component will receive props")
		if(nextProps.modelType != this.props.modelType || (nextProps.searchString != this.props.searchString)) {
			this.props = nextProps;
			this.updateSearchResults(null);
		}

	}

	updateSearchResults(searchResults) {
		console.log("MS: updateSearchResults");
		const { modelType } = this.props;
		var filter;

		this.setState(function() {
			return {
				searchResults: searchResults
			}
		});

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
	}

	buildFilter() {
		console.log("MS: build filter");
		const { modelType } = this.props;
		const { searchString } = this.props;
		const { delimiter } = this.props;

		var filter = '[{"'+ delimiter + '":[';
		if(modelType === "character") {
			for(var i = 0; i < searchString.length; i++) {
				filter += '{"or":[';
				filter += '{"name": "name", "op": "ilike", "val": "%' + searchString[i] + '%"}, ' + 
						  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"}]}';
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}
			/*return [{"or": [{"name": "name", "op": "ilike", "val": "%" + searchString + "%"}, 
							{"name": "desc", "op": "ilike", "val": "%" + searchString + "%"}]}];*/
	
		else if(modelType === 'event' || modelType === 'series'){
			for(var i = 0; i < searchString.length; i++) {
				filter += '{"or":[';
				filter += '{"name": "title", "op": "ilike", "val": "%' + searchString[i] + '%"}, ' + 
						  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"}]}';
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}

		else if(modelType === 'creator'){
			for(var i = 0; i < searchString.length; i++) {
				//filter += '{"or":[';
				filter += '{"name": "full_name", "op": "ilike", "val": "%' + searchString[i] + '%"} '	
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}

		console.log("builtFilter: " + filter);
		return JSON.parse(filter);

	}

	handlePageSelect(eventKey){
		console.log("MS: handlePageSelect");
		this.setState({activePage: eventKey}, function () {
			this.updateSearchResults(null);
		});
	}

	createSearchCards(){
		console.log("MS: createSearchCards");
		var cardsArray = [];
		var { searchResults } = this.state;
		var modelLink = "/" + this.props.modelType + "Instance";
		for(var i = 0; i < searchResults.length; i++) {
				cardsArray.push(<SearchCard modelLink={modelLink}
								      		modelInstance={searchResults[i]} 
								      		modelType={this.props.modelType}/>);
		}
		return cardsArray;
	}

	loadTable(){
		console.log("MS: loadTable");
		if(!this.state.searchResults){
            return <p>LOADING!</p>;
        }
        else if(this.state.searchResults[0] === {}){
        	return <p>No results match that search criteria.</p>
        }   
        else {
        	console.log("MS: loadTable else{}");
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

	buildTitle(){
		console.log("MS: buildTitle");
		const { searchString } = this.props;
		if(searchString) {
			var title = "'";
			for(var i = 0; i < searchString.length; i++){
				title += searchString[i];
				if(i != searchString.length-1)
					title += " " + (this.props.delimiter).toUpperCase() + " ";
			}
			title += "'";
			return title;
		}
		else {
			return "loading"
		}
		
	}

	render(){
		console.log("MS: render")
		return(
			<div>
				<h1>{this.buildTitle()}</h1>
				{this.loadTable()}
	    	</div>
	    );
	}
}

module.exports = MultiSearch;