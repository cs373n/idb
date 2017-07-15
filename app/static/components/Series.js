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
var orderByAsc = "title";
var orderByDsc = "-title";

class Series extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      series: null,
	      activePage: 1,
	      numPages: 0,
	      hasPhoto: false,
	      hasDesc: false,
	      sortAsc: true,
    	};

    	this.handleSelect = this.handleSelect.bind(this); //pls work
    	this.updateSeries = this.updateSeries.bind(this); //pls work
    	this.applyFilter = this.applyFilter.bind(this);
    	this.loadTable = this.loadTable.bind(this);
  	}

	componentWillMount() {
	    this.updateSeries(this.state.series)
	}

	updateSeries(series) {

		var filter;
		var orderBy;
		this.setState(function() {
			return {
				series: series
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

		api.getSeries(this.state.activePage, filter, orderBy)
	      .then(function (series) {
	        this.setState(function () {
	          return {
	            series: series.data,
	            numPages: Math.ceil(series.meta.total / 6)
	          }
	        });
	      }.bind(this));
	}
	

	handleSelect(eventKey){
		this.setState({activePage: eventKey}, function () {
			this.updateSeries(null);
		});
	}

	applyFilter(filterKey){
	    if(filterKey === 1) {
	    	this.setState({
	    		hasPhoto: true,
	    		hasDesc: false
	    	}, function() {
	    		this.updateSeries(null);
	    	});
	    }
	    else if(filterKey === 2){
	    	this.setState({
	    		hasPhoto: false,
	    		hasDesc: true
	    	}, function() {
	    		this.updateSeries(null);
	    	});
	    }
	}

	applySort(sortKey){
		if(sortKey === 1){
			this.setState({
				sortAsc: true
			}, function(){
				this.updateSeries(null);
			});
		}
		else if(sortKey === 2){
	    	this.setState({
	    		sortAsc: false
	    	}, function() {
	    		this.updateSeries(null);
	    	});
	    }
		
	}

	createCards() {
		var cardsArray = [];
		const { series } = this.state;
		for(var i = 0; i < series.length; i++) {
				cardsArray.push(<Card modelLink="/seriesInstance" 
								      modelInstance={series[i]} />);
		}
		return cardsArray;
	}

	loadTable(){
		if(!this.state.series){
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
			<div>
				<PageHeader className="text-center" style={fixMargin}>SERIES</PageHeader>
					<Row>
						<Col md={3}/>
						<Col md={6}>
							<ul className="list-inline list-unstyled">
								<li>
									<h3 className="text-center">FILTER BY:</h3>
									<ButtonToolbar>
										<Button bsStyle="red" onClick={() => this.applyFilter(1)}>
												Photo Available
										</Button>
										<Button bsStyle="red" onClick={() => this.applyFilter(2)}>
												Description Available
										</Button>
									</ButtonToolbar>
									{this.state.hasPhoto ? <p>Photo Filter Applied</p> : <p/>}
									{this.state.hasDesc ? <p>Description Filter Applied</p> : <p/>}
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
						<Col md={3}/>
					</Row>
				<PageHeader/> {/*Makes line across screen*/}
				{this.loadTable()}
			</div>
		)
	}
}

module.exports = Series;