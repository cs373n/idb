var React = require('react');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');

var h2Font = {
	fontSize: '20px',
};

class CreatorInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      creator: null
    	};
  	}

	componentDidMount() {
	    this.updateCreator(this.state.creator);
	}

	updateCreator(creator) {
		var charID = this.props.match.params.creatorID;

		this.setState(function() {
			return {
				creator: creator
			}
		});

		api.getCreator(charID)
	      .then(function (creator) {
	        this.setState(function () {
	          return {
	            creator: creator
	          }
	        });
	      }.bind(this));
	}

	fixImage() {
		const { creator } = this.state;

		if(creator.img && creator.img != "") {
			return creator.img.slice(0, -4) + "/portrait_incredible.jpg";
		}

		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg";
	}

	createSeriesCards() {
		var cardsArray = [];
		var assocSeries = this.state.creator.series;
		if(assocSeries) {
			for(var i = 0; i < assocSeries.length; i++) {
					if(assocSeries[i].img && assocSeries[i].img != "") {
						assocSeries[i].img = assocSeries[i].img.slice(0, -4) + "/standard_xlarge.jpg";
						cardsArray.push(<Card modelLink="/seriesInstance" 
										      modelInstance={assocSeries[i]}/>);
						console.log(assocSeries[i]);
					}

					else {
						assocSeries[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
						console.log("createSeries in CreatorInstance" + assocSeries[i]);
						cardsArray.push(<Card modelLink="/seriesInstance" 
										 	  modelInstance={assocSeries[i]} />);
					}
				}
		}
		return cardsArray;
	}

	createEventCards() {
		var cardsArray = [];
		var assocEvents = this.state.creator.event;
		if(assocEvents) {
			for(var i = 0; i < assocEvents.length; i++) {
				if(assocEvents[i].img && assocEvents[i].img != "") {
					assocEvents[i].img = assocEvents[i].img.slice(0, -4) + "/standard_xlarge.jpg";
					cardsArray.push(<Card modelLink="/eventInstance" 
									      modelInstance={assocEvents[i]}/>);
					console.log("creator events: " + assocEvents[i]);
				}

				else {
					assocEvents[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
					console.log("creator events else: " + assocEvents[i]);
					cardsArray.push(<Card modelLink="/eventInstance" 
									 	  modelInstance={assocEvents[i]} />);
				}
			}
		}
		return cardsArray;
	}

	render() {
		const { creator } = this.state;

		if(!creator) {
			return <p>LOADING!</p>
		}
		else {

			return (
				<div className="container">
					<PageHeader className="text-left">{creator.name}</PageHeader>
					<Grid>
						<Row>
							<Col md={3}>
								<img className="img-rounded img-responsive" src={this.fixImage()} alt={creator.name}/>
							</Col>

							<Col className="text-left" md={9}>
								<PageHeader style={h2Font}>Description</PageHeader>
								<p>{creator.desc}</p>
								<PageHeader style={h2Font}>Statistics</PageHeader>
								<ul>
									<li>Contributed to {creator.num_series} Series</li>
									<li>Contributed to {creator.num_events} Events</li>
								</ul>
							</Col>
						</Row>
					</Grid>
					
					<br/>

					<Tabs bsStyle="tabs" defaultActiveKey={1}>
	    				<Tab eventKey={1} title="SERIES">
	    					<br/>
	    					<Table cards={this.createSeriesCards()}/>
	    				</Tab>
	    				<Tab eventKey={2} title="EVENTS">
	    					<br/>
	    					<Table cards={this.createEventCards()}/>
	    				</Tab>	
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = CreatorInstance;