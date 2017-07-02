var React = require('react');
import { PageHeader, Pagination, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js');

var fixMargin = {
	margin: '0'
}

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
var photoFilter = [{'name': 'img','op': 'does_not_equal', 'val': imgNotFound}];
var descFilter = [{'name': 'desc','op': '!=', 'val': ''}];

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

		api.getCharacters(this.state.activePage, filter)
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
	    	})
	    }
	}

	createCards() {
		var cardsArray = [];
		var charsCopy = this.state.characters;
		for(var i = 0; i < charsCopy.length; i++) {
			if(charsCopy[i].img && charsCopy[i].img != "") {
				charsCopy[i].img = charsCopy[i].img.slice(0, -4) + "/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/characterInstance" 
								      modelInstance={charsCopy[i]} />);
			}

			else {
				charsCopy[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/characterInstance" 
								 	  modelInstance={charsCopy[i]} />);
			}
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
				<br/>
				<ButtonToolbar />
					<h2>FILTER BY:</h2>
					<Button bsStyle="primary" onClick={() => this.applyFilter(1)}>
							Photo Available
					</Button>
					<Button>Description Available</Button>
				<ButtonToolbar />
				<PageHeader/> 
				
				{this.loadTable()}
			</div>
		)
	}
}





module.exports = Characters;