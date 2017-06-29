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

    	// Maybe.... this.updateChars = this.updateChars.bind(this);
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
	          console.log(creators)
	          return {
	            creators: creators
	          }
	        });
	      }.bind(this));
	}

	createCards() {
		var cardsArray = [];
		var creatorsCopy = this.state.creators
		for(var i = 0; i < creatorsCopy.length; i++) {
			cardsArray.push(<Card name={creatorsCopy[i].fullName} img={creatorsCopy[i].thumbnail.path+"/standard_xlarge.jpg"} />);
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