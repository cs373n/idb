var React = require('react');
import { PageHeader, Pagination } from 'react-bootstrap';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js');

var fixMargin = {
	margin: '0'
}

class Characters extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      characters: null,
	      activePage: 1,
	      numPages: 0
    	};
    	this.handleSelect = this.handleSelect.bind(this); //pls work
    	this.updateChars = this.updateChars.bind(this); //pls work
  	}

	componentDidMount() {
	    this.updateChars(this.state.characters);
	}

	/*componentDidUpdate(prevProps, prevState) {
		console.log("Active page: " + this.state.activePage);
		if(prevState.activePage != this.state.activePage){
			api.getCharacters(this.state.activePage)
		      .then(function (chars) {
		        this.setState(function () {
		          return {
		            characters: chars.objects,
		            numPages: chars.total_pages
		          }
		        });
		      }.bind(this));
		}
	}*/

	updateChars(chars) {
		console.log(this.state.activePage);
		this.setState(function() {
			return {
				characters: chars
			}
		});
		console.log(this.state.activePage);
		api.getCharacters(this.state.activePage)
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
			this.updateChars(null)
		});

		

		//this.updateChars(null);
	}

	/*createCards() {
		var cardsArray = [];
		var charsCopy = this.state.characters;
		console.log("In create cards: " + charsCopy);
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
	}*/

	createCards() {
		var cardsArray = [];
		var charsCopy = this.state.characters;
		console.log("In create cards: " + charsCopy);
		for(var i = 0; i < charsCopy.length; i++) {
			if(charsCopy[i].img && charsCopy[i].img != "") {
				cardsArray.push(<Card modelLink="/characterInstance"
					modelInstance={charsCopy[i]} />);
			}

			else {
				charsCopy[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
				cardsArray.push(<Card modelLink="/characterInstance" 
								 	  modelInstance={charsCopy[i]} />);
			}
		}
		return cardsArray;
	}

	hasLoaded(){
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

				{this.hasLoaded()}
			</div>
		)
	}
}





module.exports = Characters;