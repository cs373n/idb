var React = require('react');
import { PageHeader } from 'react-bootstrap';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js')

var fixMargin = {
	margin: '0'
}

class Characters extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      characters: null
    	};

    	// Maybe.... this.updateChars = this.updateChars.bind(this);
  	}

	componentDidMount() {
	    this.updateChars(this.state.characters)
	}

	updateChars(chars) {

		this.setState(function() {
			return {
				characters: chars
			}
		});

		api.getOurCharacters()
	      .then(function (chars) {
	        this.setState(function () {
	          console.log("In Characters.js: " + chars)
	          return {
	            characters: chars
	          }
	        });
	      }.bind(this));
	}

	createCards() {
		var cardsArray = [];
		var charsCopy = this.state.characters;
		for(var i = 0; i < charsCopy.length; i++) {
			if(charsCopy[i].img && charsCopy[i].img != "") {
				charsCopy[i].img = charsCopy[i].img.slice(0, -4);
				cardsArray.push(<Card name={charsCopy[i].name} img={charsCopy[i].img+"/standard_xlarge.jpg"} />);
			}

			else {
				cardsArray.push(<Card name={charsCopy[i].name} img={"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg"} />);
			}
		}
		return cardsArray;
	}

	render(){
		return(
			<div className="container">
				<PageHeader className="text-center" style={fixMargin}>CHARACTERS</PageHeader>

				{!this.state.characters
		          ? <p>LOADING!</p>
		          /* Table here */
		          : <Table cards={this.createCards()}/>
		        }
			</div>
		)
	}

}

module.exports = Characters;