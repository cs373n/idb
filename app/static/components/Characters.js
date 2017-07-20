var React = require('react');
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js');
import ReactLoading from 'react-loading';
import { PageHeader, Pagination, Button, 
		 ButtonGroup, ButtonToolbar,
		 Grid, Row, Col, FormGroup, FormControl, Form } from 'react-bootstrap';

var fixMargin = {
	margin: '0'
}

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
var photoFilter = [{"and": [{"name": "img", "op": "does_not_equal", "val": "None"},
						   {"name": "img", "op": "does_not_equal", "val": imgNotFound}]}];
var descFilter = [{'name': 'desc','op': '!=', 'val': ''}];
var orderByAsc = "name";
var orderByDsc = "-name";

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
    	this.handleChange = this.handleChange.bind(this);
    	this.jumpToPage = this.jumpToPage.bind(this);
    	this.cancelFilter = this.cancelFilter.bind(this);
  	}

	componentWillMount() {
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
	            characters: chars.data,
	            numPages: Math.ceil(chars.meta.total / 6)
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

	handleChange(e){
		this.state.activePage = Number(e.target.value);
	}

	jumpToPage(){
		this.setState({}, function(){
			this.updateChars(null);
		});
	}

	cancelFilter(){
		this.setState({hasDesc: false, hasPhoto: false}, function(){
			this.updateChars(null);
		})
	}

	loadTable(){
		if(!this.state.characters){
            return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='650px' width='375px'
	            						  delay={5} color='red' />
            	   </div>
        }   
        else{
         	return (
         		<div className="text-center">
	         		<Table cards={this.createCards()}/>
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
				        onSelect={this.handleSelect} />
			        
			       
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
					</Row>
		    	</div>
		    );
		}
	}

	render(){
		return(
			<div>
				<PageHeader className="text-center" style={fixMargin}>CHARACTERS</PageHeader>
					<Row>
						<Col sm={2} md={2}/>
						<Col sm={4} md={4}>
							<ul className="list-unstyled">
								<li className="text-center">
									<h3 className="text-center">FILTER BY:</h3>

										<Button bsStyle="red" onClick={() => this.applyFilter(1)}>
												Photo Available
										</Button>
										{" "}
										<Button bsStyle="red" onClick={() => this.applyFilter(2)}>
												Description Available
										</Button>
									{this.state.hasPhoto ? <div>
										<p>Photo Filter Applied</p>
										<Button bsStyle="red" onClick={() => this.cancelFilter()}>
											Deactivate Filter
										</Button></div> : <p/>}
									{this.state.hasDesc ? <div>
										<p>Description Filter Applied</p>
										<Button bsStyle="red" onClick={() => this.cancelFilter()}>
											Deactivate Filter
										</Button></div> : <p/>}
									
								</li>
							</ul>
						</Col>
						
						<Col sm={4} md={4}>
							<ul className="list-unstyled">
								<li className="text-center">
									<h3 className="text-center">SORT BY:</h3>
										<Button bsStyle="red" onClick={() => this.applySort(1)}>
												Ascending
										</Button>
										{" "}
										<Button bsStyle="red" onClick={() => this.applySort(2)}>
												Descending
										</Button>
										{this.state.sortAsc ? <p>Sorting by Ascending Name</p> : <p>Sorting by Descending Name</p> }
								</li>
							</ul>
						</Col>
						<Col sm={2} md={4}/>
					</Row>
				<PageHeader style={{marginTop: '0px'}}/> {/*Makes line across screen*/}


				
				{this.loadTable()}
			</div>
		)
	}
}

module.exports = Characters;