var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
import ReactLoading from 'react-loading';
import { PageHeader, Pagination, Tabs, Tab, Row, Col,
		 FormControl, Button } from 'react-bootstrap';

/*
	Props: modelType, searchString, delimiter
*/

var fixMargin = {
	margin: '0'
}

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
		this.handleChange = this.handleChange.bind(this);
		this.jumpToPage = this.jumpToPage.bind(this);
	}

	componentWillMount() {
	    this.updateSearchResults(null);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.modelType != this.props.modelType || (nextProps.searchString != this.props.searchString)) {
			this.props = nextProps;
			this.updateSearchResults(null);
		}

	}

	updateSearchResults(searchResults) {
		const { modelType } = this.props;
		var filter;

		this.setState(function() {
			return {
				searchResults: searchResults
			}
		});

		if(modelType === 'character') {
				
			filter = this.buildFilter();

			api.getCharacters(this.state.activePage, filter, "")
		      .then(function (chars) {
		        this.setState(function () {
		          return {
		            searchResults: chars.data,
		            numPages: Math.ceil(chars.meta.total / 6)
		          }
		        });
		      }.bind(this));
			}
			else if(modelType === 'event'){

				filter = this.buildFilter();

				api.getEvents(this.state.activePage, filter, "")
			      .then(function (events) {
			        this.setState(function () {
			          return {
			            searchResults: events.data,
		            	numPages: Math.ceil(events.meta.total / 6)
			          }
			        });
			      }.bind(this));
			}
			else if(modelType === 'series'){

				filter = this.buildFilter();

				api.getSeries(this.state.activePage, filter, "")
			      .then(function (series) {
			        this.setState(function () {
			          return {
			            searchResults: series.data,
		            	numPages: Math.ceil(series.meta.total / 6)
			          }
			        });
			      }.bind(this));
			}
			else if(modelType === 'creator'){

				filter = this.buildFilter();

				api.getCreators(this.state.activePage, filter, "")
			      .then(function (creators) {
			        this.setState(function () {
			          return {
			            searchResults: creators.data,
		            	numPages: Math.ceil(creators.meta.total / 6)
			          }
			        });
			      }.bind(this));
			}
			else if(modelType === 'comic'){

				filter = this.buildFilter();

				api.getComics(this.state.activePage, filter, "")
			      .then(function (comics) {
			        this.setState(function () {
			          return {
			            searchResults: comics.data,
		            	numPages: Math.ceil(comics.meta.total / 6)
			          }
			        });
			      }.bind(this));
			}
	}

	buildFilter() {
		const { modelType } = this.props;
		const { searchString } = this.props;
		const { delimiter } = this.props;

		var filter = '[{"'+ delimiter + '":[';
		if(modelType === "character") {
			for(var i = 0; i < searchString.length; i++) {
				if(isNaN(searchString[i])){
					filter += '{"or":[';
					filter += '{"name": "name", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"}]}';
				}
				else{
					filter += '{"or":[';
					filter += '{"name": "name", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"},' +
							  '{"name": "num_comics", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_events", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_series", "op": "==", "val": "' + searchString[i] + '"}]}';
				}
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}
	
		else if(modelType === 'event'){
			for(var i = 0; i < searchString.length; i++) {
				if(isNaN(searchString[i])){
					filter += '{"or":[';
					filter += '{"name": "title", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"}]}';
				}
				else{
					filter += '{"or":[';
					filter += '{"name": "title", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"},' +
							  '{"name": "num_comics", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_characters", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_creators", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_series", "op": "==", "val": "' + searchString[i] + '"}]}';
				}
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}
		else if(modelType === 'series'){
			for(var i = 0; i < searchString.length; i++) {
				if(isNaN(searchString[i])){
					filter += '{"or":[';
					filter += '{"name": "title", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"}]}';
				}
				else{
					filter += '{"or":[';
					filter += '{"name": "title", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"},' +
							  '{"name": "num_comics", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_events", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_creators", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_characters", "op": "==", "val": "' + searchString[i] + '"}]}';
				}
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}
		else if(modelType === 'creator'){
			for(var i = 0; i < searchString.length; i++) {
				if(isNaN(searchString[i])){
					filter += '{"name": "full_name", "op": "ilike", "val": "%' + searchString[i] + '%"}';
				}
				else{
					filter += '{"or":[';
					filter += '{"name": "full_name", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "num_comics", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_events", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_series", "op": "==", "val": "' + searchString[i] + '"}]}';
				}
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}
		else if(modelType === 'comic'){
			for(var i = 0; i < searchString.length; i++) {
				if(isNaN(searchString[i])){
					filter += '{"or":[';
					filter += '{"name": "title", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"}]}';
				}
				else{
					filter += '{"or":[';
					filter += '{"name": "title", "op": "ilike", "val": "%' + searchString[i] + '%"},' + 
							  '{"name": "desc", "op": "ilike", "val": "%' + searchString[i] + '%"},' +
							  '{"name": "num_events", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_creators", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "pg_ct", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "issue_num", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "upc", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "price", "op": "==", "val": "' + searchString[i] + '"},' +
							  '{"name": "num_characters", "op": "==", "val": "' + searchString[i] + '"}]}';
				}
				if(i != searchString.length-1) {
					filter += ",";
				}
			}
			filter += "]}]";
		}

		return JSON.parse(filter);

	}

	handlePageSelect(eventKey){
		this.setState({activePage: eventKey}, function () {
			this.updateSearchResults(null);
		});
	}

	handleChange(e){
		this.state.activePage = Number(e.target.value);
	}

	jumpToPage(){
		this.setState({}, function(){
			this.updateSearchResults(null);
		});
	}

	createSearchCards(){
		var cardsArray = [];
		var { searchResults } = this.state;
		var modelLink = "/" + this.props.modelType + "Instance";
		for(var i = 0; i < searchResults.length; i++) {
				cardsArray.push(<SearchCard modelLink={modelLink}
								      		modelInstance={searchResults[i]} 
								      		modelType={this.props.modelType}
								      		searchString={this.props.searchString}/>);
		}
		return cardsArray;
	}

	loadTable(){
		if(!this.state.searchResults){
            return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='650px' width='375px'
	            						  delay={5} color='red' />
            	   </div>
        }
        else if(this.state.searchResults[0] === {}){
        	return <p>No results match that search criteria.</p>
        }   
        else {
         	return (
         		<div className="text-center">
	         		<Table cards={this.createSearchCards()}/>
	          		<Row>
	         		<Col xs={0} sm={2} md={2}/>
	         		 <Col xs={12} sm={8} md={8}>
		          		<Pagination
				       	prev
				        next
				        ellipsis
				        boundaryLinks
				        style={{marginBottom: '0px'}}
				        items={this.state.numPages}
				        maxButtons={5}
				        activePage={this.state.activePage}
				        onSelect={this.handlePageSelect} />
			        
			       
							<h3 className="text-center" style={fixMargin}>JUMP TO PAGE #:</h3>
							<Col sm={5} md={5}/>
							<Col sm={2} md={2}>
								<FormControl type="text"
										 className="center-block"
										 id="activePage"
										 onChange={this.handleChange} />
								<p/>
								<Button bsStyle="red" onClick={() => this.jumpToPage()}>
										JUMP
								</Button>
							<h3/>
							</Col>
							<Col sm={5} md={5}/>
					</Col>
					<Col xs={0} sm={2} md={2}/>
					</Row>		    	</div>
		    );
		}
	}

	buildTitle(){
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
		return(
			<div>
				<PageHeader className="text-left">
					{this.buildTitle()} 
				</PageHeader>
				{this.loadTable()}
	    	</div>
	    );
	}
}

module.exports = MultiSearch;