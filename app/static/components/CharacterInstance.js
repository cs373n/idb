var React = require('react');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');

var h2Font = {
	fontSize: '20px',
};

class CharacterInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      character: null
    	};
  	}

	componentDidMount() {
	    this.updateCharacter(this.state.character);
	}

	updateCharacter(char) {
		var charID = this.props.match.params.charID;

		this.setState(function() {
			return {
				character: char
			}
		});

		api.getCharacter(charID)
	      .then(function (char) {
	        this.setState(function () {
	          return {
	            character: char
	          }
	        });
	      }.bind(this));
	}

	fixImage() {
		const { character } = this.state;

		if(character.img && character.img != "") {
			return character.img.slice(0, -4) + "/portrait_incredible.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg";
	}

	createSeriesCards() {
		var cardsArray = [];
		var assocSeries = this.state.character.series;
		if(assocSeries) {
			for(var i = 0; i < assocSeries.length; i++) {
				cardsArray.push(<Card modelLink="/seriesInstance" modelInstance={assocSeries[i]}/>);
			}
		}
		return cardsArray;
	}

	createEventsCards() {
		var cardsArray = [];
		var assocEvents = this.state.character.events;
		if(assocEvents) {
			for(var i = 0; i < assocEvents.length; i++) {
				cardsArray.push(<Card modelLink="/eventInstance" modelInstance={assocEvents[i]}/>);
			}
		}
		return cardsArray;
	}

	render() {
		const { character } = this.state;

		if(!character) {
			return <p>LOADING!</p>
		}
		else {

			return (
				<div className="container">
					<PageHeader className="text-left">{character.name}</PageHeader>
					<Grid>
						<Row>
							<Col md={3}>
								<img className="img-rounded img-responsive" src={this.fixImage()} alt={character.name}/>
							</Col>

							<Col className="text-left" md={9}>
								<PageHeader style={h2Font}>Description</PageHeader>
								<p>{(character.desc == null || character.desc == "") ? "Description not available." : character.desc}</p>
								<PageHeader style={h2Font}>Statistics</PageHeader>
								<ul>
									<li>Appears in {character.series.length} Series</li>
									<li>Appears in {character.events.length} Events</li>
								</ul>
							</Col>
						</Row>
					</Grid>
					
					<br/>

					<Tabs bsStyle="tabs" defaultActiveKey={1}>
	    				<Tab eventKey={1} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createSeriesCards()}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED EVENTS">
	    					<br/>
	    					<Table cards={this.createEventsCards()}/>
	    				</Tab>	
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = CharacterInstance;