var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class EventInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      event: null
    	};
  	}

	componentWillMount() {
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
		const { img } = this.state.event.attributes;

		if(img && img != "") {
			return img.slice(0, -4) + "/portrait_uncanny.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg";
	}

	createCards(modelType) {
		var cardsArray = [];
		api.getModelConnections(this.state.event.links.self, modelType)	    
		.then(function (assocArray) {
			if(assocArray) {
				var modelTypeLink;
				for(var i = 0; i < assocArray.length; i++) {
					if(modelType != 'series')
						modelTypeLink = modelType.slice(0, modelType.length-1); 
					cardsArray.push(<Card modelLink={"/" + modelTypeLink + "Instance"} modelInstance={assocArray[i]}/>);
				}
			}
	    }.bind(this));
	    return cardsArray;
	}


	render() {
		const { event } = this.state;

		if(!event) {
			return <p>LOADING!</p>
		}
		else {
			const {attributes} = this.state.event;
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
					<PageHeader className="text-left" style={titleStyle}>
					{attributes.title} <small>Identification Number: {event.id}</small>
					</PageHeader>
					
					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={attributes.name}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Event Description</PageHeader>
							<p>{attributes.desc ? attributes.desc : "Description not available."}</p>
							
							<PageHeader>Attributes</PageHeader>
							<ul>
								<li>Contains {attributes.num_characters} characters</li>
								<li>
									This attributes plays out over {attributes.num_series} series and {attributes.num_comics} comics
								</li>
								<li>{attributes.num_creators} creators contributed to this event</li>
							</ul>
						</Col>
					</Row>
					
					<br/>

					<PageHeader style={{marginBottom: '0px', width: '100%'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={0} justified>
	    				<Tab eventKey={1} title="FEATURED CHARACTERS">
	    					<br/>
	    					<Table cards={this.createCards('characters')}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createCards('series')}/>
	    				</Tab>
	    				<Tab eventKey={3} title="FEATURED COMICS">
	    					<br/> 
	    					<Table cards={this.createCards('comics')}/>
	    				</Tab>
	    				<Tab eventKey={4} title="FEATURED CREATORS">
	    					<br/> 
	    					<Table cards={this.createCards('creators')}/>
	    				</Tab>
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = EventInstance;