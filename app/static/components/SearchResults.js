var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var SearchCard = require('./SearchCard.js');
import { PageHeader, Pagination, Tabs, Tab } from 'react-bootstrap';

class SearchResults extends React.Component {
	constructor(props) {
		super();
		this.state = {
			searchString: null,
			searchResults: null,
			modelType: null,
			activePage: 1,
	      	numPages: 0
		}
		this.updateSearchResults = this.updateSearchResults.bind(this);
		this.createSearchCards = this.createSearchCards.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.loadTable = this.loadTable.bind(this);
	}

	componentDidMount() {
	    this.updateSearchResults(this.state.searchString, this.state.searchResults);
	}

	componentWillReceiveProps(nextProps){
		this.setState({searchString: this.props.match.params.searchString}, 
					  function() {
					  	this.updateSearchResults(this.state.searchString, this.state.searchResults)
					  });
	}

	updateSearchResults(searchString, searchResults) {
		this.setState({searchString: this.props.match.params.searchString, searchResults: searchResults});
		
		api.getCharacters(this.state.activePage, {}, {})
	      .then(function (chars) {
	        this.setState(function () {
	          return {
	            searchResults: chars.objects,
	            numPages: chars.total_pages
	          }
	        });
	      }.bind(this));
	}

	handleSelect(eventKey){
		this.setState({activePage: eventKey}, function () {
			console.log(this.state.activePage);
			this.updateSearchResults(this.state.searchString, null);
		});
	}

	createSearchCards(modelType){
		var cardsArray = [];
		var { searchResults } = this.state;
		var modelLink = "/" + modelType + "Instance";
		for(var i = 0; i < searchResults.length; i++) {
				cardsArray.push(<SearchCard modelLink={modelLink}
								      		modelInstance={searchResults[i]} 
								      		modelType={modelType}/>);
		}
		return cardsArray;
	}

	loadTable(modelType){
		if(!this.state.searchResults){
            return <p>LOADING!</p>;
        }   
        else{
         	return (
         		<div>
	         		<Table cards={this.createSearchCards(modelType)}/>
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
				<Tabs bsStyle="pills" defaultActiveKey={1}>
					<Tab eventKey={1} title="CHARACTERS">
						<br/>
						{this.loadTable('character')}
					</Tab>
					<Tab eventKey={2} title="EVENTS">
						<br/>
						{this.loadTable('event')}
					</Tab>
					<Tab eventKey={3} title="SERIES">
						<br/>
						{this.loadTable('series')}
					</Tab>	
					<Tab eventKey={4} title="CREATORS">
						<br/>
						{this.loadTable('creator')}
					</Tab>		
				</Tabs>
			</div>
		)
	}
}

module.exports = SearchResults;