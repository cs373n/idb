var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

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
				cardsArray.push(<Card modelLink="/seriesInstance" modelInstance={assocSeries[i]}/>);
			}
		}
		return cardsArray;
	}

	createEventCards() {
		var cardsArray = [];
		var assocEvents = this.state.creator.events;
		if(assocEvents) {
			for(var i = 0; i < assocEvents.length; i++) {
				cardsArray.push(<Card modelLink="/eventInstance" modelInstance={assocEvents[i]}/>);
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
					<PageHeader className="text-left">{creator.full_name}</PageHeader>
					<Grid>
						<Row>
							<Col md={3}>
								<img className="img-rounded img-responsive" src={this.fixImage()} alt={creator.full_name}/>
							</Col>

							<Col className="text-left" md={9}>
								<PageHeader style={h2Font}>Attributes</PageHeader>
								<ul>
									<li>Contributed to {creator.series.length} Series</li>
									<li>Contributed to {creator.events.length} Events</li>
									<li>Contributed to {creator.num_comics} Comics</li>
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
	    					<Table cards={this.createEventCards()}/>
	    				</Tab>	
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = CreatorInstance;