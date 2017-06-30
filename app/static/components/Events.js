var React = require('react');
import { PageHeader } from 'react-bootstrap';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js')

var fixMargin = {
	margin: '0'
}

class Events extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      events: null
    	};

    	// Maybe.... this.updateChars = this.updateChars.bind(this);
  	}

	componentDidMount() {
	    this.updateEvents(this.state.events)
	}

	updateEvents(events) {

		this.setState(function() {
			return {
				events: events
			}
		});

		api.getEvents()
	      .then(function (events) {
	        this.setState(function () {
	          console.log(events)
	          return {
	            events: events
	          }
	        });
	      }.bind(this));
	}

	createCards() {
		var cardsArray = [];
		var eventsCopy = this.state.events
		for(var i = 0; i < eventsCopy.length; i++) {
			cardsArray.push(<Card name={eventsCopy[i].title} img={eventsCopy[i].thumbnail.path+"/standard_xlarge.jpg"} />);
		}
		return cardsArray;
	}

	render(){
		return(
			<div className="container">
				<PageHeader className="text-center" style={fixMargin}>EVENTS</PageHeader>

				{!this.state.events
		          ? <p>LOADING!</p>
		          /* Table here */
		          : <Table cards={this.createCards()}/>
		        }
			</div>
		)
	}

}

module.exports = Events;