var React = require('react');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');

var h2Font = {
	fontSize: '20px',
};

class EventInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      event: null
    	};
  	}

	componentDidMount() {
	    this.updateEvent(this.state.event);
	}

	updateEvent(event) {
		var eventID = this.props.match.params.eventID;

		this.setState(function() {
			return {
				event: event
			}
		});

		api.getEvent(eventID)
	      .then(function (event) {
	        this.setState(function () {
	          return {
	            event: event
	          }
	        });
	      }.bind(this));
	}

	fixImage() {
		const { event } = this.state;

		if(event.img && event.img != "") {
			return event.img.slice(0, -4) + "/portrait_incredible.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg";
	}

	createCharacterCards() {
		var cardsArray = [];
		var assocCharacters = this.state.event.characters;
		if(assocCharacters) {
			for(var i = 0; i < assocCharacters.length; i++) {
				if(assocCharacters[i].img && assocCharacters[i].img != "") {
					assocCharacters[i].img = assocCharacters[i].img.slice(0, -4) + "/standard_xlarge.jpg";
					cardsArray.push(<Card modelLink="/characterInstance" 
									      modelInstance={assocCharacters[i]}/>);
				}

				else {
					assocCharacters[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
					cardsArray.push(<Card modelLink="/characterInstance" 
									 	  modelInstance={assocCharacters[i]} />);
				}
			}
		}
		return cardsArray;
	}

	createSeriesCards() {
		var cardsArray = [];
		var assocSeries = this.state.event.series;
		if(assocSeries) {
			for(var i = 0; i < assocSeries.length; i++) {
				if(assocSeries[i].img && assocSeries[i].img != "") {
					assocSeries[i].img = assocSeries[i].img.slice(0, -4) + "/standard_xlarge.jpg";
					cardsArray.push(<Card modelLink="/seriesInstance" 
									      modelInstance={assocSeries[i]}/>);
				}

				else {
					assocSeries[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
					cardsArray.push(<Card modelLink="/seriesInstance" 
									 	  modelInstance={assocSeries[i]} />);
				}
			}
		}
		return cardsArray;
	}

	render() {
		const { event } = this.state;

		if(!event) {
			return <p>LOADING!</p>
		}
		else {

			return (
				<div className="container">
					<PageHeader className="text-left">{event.name}</PageHeader>
					<Grid>
						<Row>
							<Col md={3}>
								<img className="img-rounded img-responsive" src={this.fixImage()} alt={event.name}/>
							</Col>

							<Col className="text-left" md={9}>
								<PageHeader style={h2Font}>Description</PageHeader>
								<p>{event.desc}</p>
								<PageHeader style={h2Font}>Statistics</PageHeader>
								<ul>
									<li>Contains {event.characters.length} characters</li>
									<li>{event.series.length} series in this event</li>
								</ul>
							</Col>
						</Row>
					</Grid>
					
					<br/>

					<Tabs bsStyle="tabs" defaultActiveKey={1}>
	    				<Tab eventKey={1} title="FEATURED CHARACTERS">
	    					<br/>
	    					<Table cards={this.createCharacterCards()}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createSeriesCards()}/>
	    				</Tab>	
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = EventInstance;