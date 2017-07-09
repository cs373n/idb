var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js');
import { PageHeader, Pagination, Button, 
		 ButtonGroup, ButtonToolbar,
		 Grid, Row, Col } from 'react-bootstrap';

var fixMargin = {
	margin: '0'
}

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
var photoFilter = [{'name': 'img','op': 'does_not_equal', 'val': imgNotFound}];
var descFilter = [{'name': 'desc','op': '!=', 'val': ''}];
var orderByAsc = [{'field': 'full_name', 'direction': 'asc'}];
var orderByDsc = [{'field': 'full_name', 'direction': 'desc'}];

class Creators extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      creators: null,
	      activePage: 1,
	      numPages: 0,
	      hasPhoto: false,
	      hasDesc: false,
	      sortAsc: true,
    	};

    	this.handleSelect = this.handleSelect.bind(this); //pls work
    	this.updateCreators = this.updateCreators.bind(this); //pls work
    	this.applyFilter = this.applyFilter.bind(this);
    	this.loadTable = this.loadTable.bind(this);
  	}

	componentWillMount() {
	    this.updateCreators(this.state.creators)
	}

	updateCreators(creators) {
		var filter;
		var orderBy;
		this.setState(function() {
			return {
				creators: creators
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


		api.getCreators(this.state.activePage, filter, orderBy)
	      .then(function (creators) {
	        this.setState(function () {
	          return {
	            creators: creators.objects,
	            numPages: creators.total_pages
	          }
	        });
	      }.bind(this));
	}

	handleSelect(eventKey){
		this.setState({activePage: eventKey}, function () {
			this.updateCreators(null);
		});
	}

	applyFilter(filterKey){
	    if(filterKey === 1) {
	    	this.setState({
	    		hasPhoto: true,
	    		hasDesc: false
	    	}, function() {
	    		this.updateCreators(null);
	    	});
	    }
	    else if(filterKey === 2){
	    	this.setState({
	    		hasPhoto: false,
	    		hasDesc: true
	    	}, function() {
	    		this.updateCreators(null);
	    	});
	    }
	}

	applySort(sortKey){
		if(sortKey === 1){
			this.setState({
				sortAsc: true
			}, function(){
				this.updateCreators(null);
			});
		}
		else if(sortKey === 2){
	    	this.setState({
	    		sortAsc: false
	    	}, function() {
	    		this.updateCreators(null);
	    	});
	    }
		
	}

	createCards() {
		var cardsArray = [];
		const { creators } = this.state;
		for(var i = 0; i < creators.length; i++) {
				cardsArray.push(<Card modelLink="/creatorInstance" 
								      modelInstance={creators[i]} />);
		}
		return cardsArray;
	}

	loadTable(){
		if(!this.state.creators){
            return <p>LOADING!</p>;
        }   
        else{
         	return (
         		<div className="text-center">
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
				<PageHeader className="text-center" style={fixMargin}>CREATORS</PageHeader>
				<Grid>
					<Row>
						<Col md={4}/>
						<Col md={4}>
							<ul className="list-inline list-unstyled">
								<li>
									<h3 className="text-center">FILTER BY:</h3>
									<ButtonToolbar>
										<Button bsStyle="red" onClick={() => this.applyFilter(1)}>
												Photo Available
										</Button>
									</ButtonToolbar>
									{this.state.hasPhoto ? <p>Photo Filter Applied</p> : <p/>}
								</li>
								<li className="pull-right">
									<h3 className="text-center">SORT BY:</h3>
									<ButtonToolbar>
										<Button bsStyle="red" onClick={() => this.applySort(1)}>
												Ascending
										</Button>
										<Button bsStyle="red" onClick={() => this.applySort(2)}>
												Descending
										</Button>
									</ButtonToolbar>
								</li>
							</ul>
						</Col>
						<Col md={4}/>
					</Row>
				</Grid>
				<PageHeader/> {/*Makes line across screen*/}


				
				{this.loadTable()}
			</div>
		)
	}

}

module.exports = Creators;