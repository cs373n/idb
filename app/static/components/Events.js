var React = require('react');
import { PageHeader, Pagination, Button, 
		 ButtonGroup, ButtonToolbar,
		 Grid, Row, Col } from 'react-bootstrap';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js');

var fixMargin = {
	margin: '0'
}

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
var photoFilter = [{'name': 'img','op': 'does_not_equal', 'val': imgNotFound}];
var descFilter = [{'name': 'desc','op': '!=', 'val': ''}];
var orderByAsc = [{'field': 'title', 'direction': 'asc'}];
var orderByDsc = [{'field': 'title', 'direction': 'desc'}];

class Events extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      events: null,
	      activePage: 1,
	      numPages: 0,
	      hasPhoto: false,
	      hasDesc: false,
	      sortAsc: true,
    	};

    	this.handleSelect = this.handleSelect.bind(this); //pls work
    	this.updateEvents = this.updateEvents.bind(this); //pls work
    	this.applyFilter = this.applyFilter.bind(this);
    	this.loadTable = this.loadTable.bind(this);

  	}

	componentDidMount() {
	    this.updateEvents(this.state.events)
	}

	updateEvents(events) {

		var filter;
		var orderBy;
		this.setState(function() {
			return {
				events: events
			}
		});

		if(this.state.hasPhoto) {
			filter = photoFilter;
		}
		else if(this.state.hasDesc) {
			filter = descFilter;
		}

		if(this.state.sortAsc){
			orderBy = orderByAsc;
		}
		else{
			orderBy = orderByDsc;
		}

		api.getEvents(this.state.activePage, filter, orderBy)
	      .then(function (events) {
	        this.setState(function () {
	          return {
	            events: events.objects,
	            numPages: events.total_pages
	          }
	        });
	      }.bind(this));
	}

	handleSelect(eventKey){
		this.setState({activePage: eventKey}, function () {
			this.updateEvents(null);
		});
	}

	applyFilter(filterKey){
	    if(filterKey === 1) {
	    	this.setState({
	    		hasPhoto: true,
	    		hasDesc: false
	    	}, function() {
	    		this.updateEvents(null);
	    	});
	    }
	    else if(filterKey === 2){
	    	this.setState({
	    		hasPhoto: false,
	    		hasDesc: true
	    	}, function() {
	    		this.updateEvents(null);
	    	});
	    }
	}

	applySort(sortKey){
		if(sortKey === 1){
			this.setState({
				sortAsc: true
			}, function(){
				this.updateEvents(null);
			});
		}
		else if(sortKey === 2){
	    	this.setState({
	    		sortAsc: false
	    	}, function() {
	    		this.updateEvents(null);
	    	});
	    }
		
	}

	createCards() {
		var cardsArray = [];
		const { events } = this.state;
		for(var i = 0; i < events.length; i++) {
				cardsArray.push(<Card modelLink="/eventInstance" 
								      modelInstance={events[i]} />);
		}
		return cardsArray;
	}

	loadTable(){
		if(!this.state.events){
            return <p>LOADING!</p>;
        }   
        else{
         	return (
         		<div>
	         		<Table cards={this.createCards()}/>
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
				<PageHeader className="text-center" style={fixMargin}>EVENTS</PageHeader>
				<Grid>
					<Row>
						<Col md={6}>
							<h3>FILTER BY:</h3>
							<Button bsStyle="primary" onClick={() => this.applyFilter(1)}>
									Photo Available
							</Button>
							<Button bsStyle="primary" onClick={() => this.applyFilter(2)}>
									Description Available
							</Button>
						</Col>
						<Col className="pull-right" md={6}>
							<h3>SORT BY:</h3>
							<Button bsStyle="primary" onClick={() => this.applySort(1)}>
									Ascending
							</Button>
							<Button bsStyle="primary" onClick={() => this.applySort(2)}>
									Descending
							</Button>
						</Col>
					</Row>
				</Grid>
				<PageHeader/> {/*Makes line across screen*/}


				
				{this.loadTable()}
			</div>
		)	}

}

module.exports = Events;