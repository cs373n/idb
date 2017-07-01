var React = require('react');
import { PageHeader } from 'react-bootstrap';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js')

var fixMargin = {
	margin: '0'
}

class Creators extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      creators: null
    	};
  	}

	componentDidMount() {
	    this.updateCreators(this.state.creators)
	}

	updateCreators(creators) {

		this.setState(function() {
			return {
				creators: creators
			}
		});

		api.getCreators()
	      .then(function (creators) {
	        this.setState(function () {
	          return {
	            creators: creators.objects
	          }
	        });
	      }.bind(this));
	}

	createCards() {
		var cardsArray = [];
		var creatorsCopy = this.state.creators;
		for(var i = 0; i < creatorsCopy.length; i++) {
			if(creatorsCopy[i].img && creatorsCopy[i].img != "") {
				creatorsCopy[i].img = creatorsCopy[i].img.slice(0, -4) + "/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/creatorInstance" 
								      modelInstance={creatorsCopy[i]} />);
			}

			else {
				creatorsCopy[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/creatorInstance" 
								 	  modelInstance={creatorsCopy[i]} />);
			}
		}
		return cardsArray;
	}

	render(){
		return(
			<div className="container">
				<PageHeader className="text-center" style={fixMargin}>CREATORS</PageHeader>

				{!this.state.creators
		          ? <p>LOADING!</p>
		          /* Table here */
		          : <Table cards={this.createCards()}/>
		        }
			</div>
		)
	}

}

module.exports = Creators;