var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

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

		if(!character){
			return <p>LOADING!</p>
		}
		else{

			var titleStyle = {
				marginTop: '0px',
				marginBottom: '10px',
				padding: '0px'
			}

			return (
				<div>
					{/* STYLES */}
					<style type="text/css">{`
					    .h1, h1 {
					        font-size: 40px;
					        margin-top: 0px;
					        margin-bottom: 5px;
					    }

					    .page-header {
					    	margin-top: 0px;
					    }
				    `}
				    </style>

					<Grid>
						<PageHeader className="text-left"
									style={titleStyle}>
								{	character.name}
						</PageHeader>
						<Row>
							<Col md={3}>
								<img className="img-rounded img-responsive" src={this.fixImage()} alt={character.name}/>
							</Col>

							<Col className="text-left" md={9} style={{fontSize: '25px'}}>
								<PageHeader className="text-left">Description</PageHeader>
								<p>{(character.desc == null || character.desc == "") ? "Description not available." : character.desc}</p>
								<PageHeader className="text-left">Attributes</PageHeader>
								<ul>
									<li>Appears in {character.comics.length} Comics</li>
									<li>Appears in {character.series.length} Series</li>
									<li>Appears in {character.events.length} Events</li>
								</ul>
							</Col>
						</Row>
					</Grid>

					<br/>

					<Tabs className="pull-left" bsStyle="pills" defaultActiveKey={1} justified>
						<PageHeader style={{marginBottom: '0px', width: '100%'}}/>
						<Tabs className="pull-left" bsStyle="pills" defaultActiveKey={1} justified>
		    				<Tab eventKey={1} title="FEATURED SERIES">
		    					<br/>
		    					<Table cards={this.createSeriesCards()}/>
		    				</Tab>
		    				<Tab eventKey={2} title="FEATURED EVENTS">
		    					<br/>
		    					<Table cards={this.createEventsCards()}/>
		    				</Tab>	
	 				 	</Tabs>
	 				</Tabs>
				</div>
			)
		}

	}
}

module.exports = CharacterInstance;