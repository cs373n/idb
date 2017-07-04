var React = require('react');
import { PageHeader, Pagination, Button, 
		 ButtonGroup, ButtonToolbar,
		 Grid, Row, Col } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js');

var fixMargin = {
	margin: '0'
}

bootstrapUtils.addStyle(Button,'red');

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
var photoFilter = [{'name': 'img','op': 'does_not_equal', 'val': imgNotFound}];
var descFilter = [{'name': 'desc','op': '!=', 'val': ''}];
var orderByAsc = [{'field': 'name', 'direction': 'asc'}];
var orderByDsc = [{'field': 'name', 'direction': 'desc'}];

class Characters extends React.Component{

	constructor(props) {
	    super();
	    this.state = {
	      characters: null,
	      activePage: 1,
	      numPages: 0,
	      hasPhoto: false,
	      hasDesc: false,
	      sortAsc: true,
    	};

    	this.handleSelect = this.handleSelect.bind(this); //pls work
    	this.updateChars = this.updateChars.bind(this); //pls work
    	this.applyFilter = this.applyFilter.bind(this);
    	this.loadTable = this.loadTable.bind(this);
  	}

	componentDidMount() {
	    this.updateChars(this.state.characters);
	}

	updateChars(chars) {
		var filter;
		var orderBy;
		this.setState(function() {
			return {
				characters: chars
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

		api.getCharacters(this.state.activePage, filter, orderBy)
	      .then(function (chars) {
	        this.setState(function () {
	          return {
	            characters: chars.objects,
	            numPages: chars.total_pages
	          }
	        });
	      }.bind(this));
	}

	handleSelect(eventKey){
		this.setState({activePage: eventKey}, function () {
			this.updateChars(null);
		});
	}

	applyFilter(filterKey){
	    if(filterKey === 1) {
	    	this.setState({
	    		hasPhoto: true,
	    		hasDesc: false
	    	}, function() {
	    		this.updateChars(null);
	    	});
	    }
	    else if(filterKey === 2){
	    	this.setState({
	    		hasPhoto: false,
	    		hasDesc: true
	    	}, function() {
	    		this.updateChars(null);
	    	});
	    }
	}

	applySort(sortKey){
		if(sortKey === 1){
			this.setState({
				sortAsc: true
			}, function(){
				this.updateChars(null);
			});
		}
		else if(sortKey === 2){
	    	this.setState({
	    		sortAsc: false
	    	}, function() {
	    		this.updateChars(null);
	    	});
	    }
		
	}

	createCards() {
		var cardsArray = [];
		var { characters } = this.state;
		for(var i = 0; i < characters.length; i++) {
				cardsArray.push(<Card modelLink="/characterInstance" 
								      modelInstance={characters[i]} />);
		}
		return cardsArray;
	}

	loadTable(){
		if(!this.state.characters){
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
				<PageHeader className="text-center" style={fixMargin}>CHARACTERS</PageHeader>
				<Grid>
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
				</Grid>
				<PageHeader/> {/*Makes line across screen*/}


				
				{this.loadTable()}
			</div>
		)
	}
}





module.exports = Characters;