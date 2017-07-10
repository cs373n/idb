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
		const { event } = this.state;

		if(event.img && event.img != "") {
			return event.img.slice(0, -4) + "/portrait_uncanny.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg";
	}

	getDescendantProp(obj, desc) {
    	var arr = desc.split(".");
    	while(arr.length && (obj = obj[arr.shift()]));
    	return obj;
	}

	createCards(modelType) {
		var cardsArray = [];
		var assoc = this.getDescendantProp(this.state,  modelType);
		modelType = modelType.split(".")[1];
		modelType = modelType.slice(0, modelType === 'series' ? modelType.length : modelType.length-1);
		if(assoc) {
			for(var i = 0; i < assoc.length; i++) {
				cardsArray.push(<Card modelLink={"/" + modelType + "Instance"} modelInstance={assoc[i]}/>);
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
					{event.title} <small>Identification Number: {event.id}</small>
					</PageHeader>
					
					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={event.name}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Description</PageHeader>
							<p>{event.desc ? event.desc : "Description not available."}</p>
							
							<PageHeader>Attributes</PageHeader>
							<ul>
								<li>Contains {event.num_characters} characters</li>
								<li>
									This event plays out over {event.num_series} series and {event.num_comics} comics
								</li>
								<li>{event.num_creators} creators contributed to this event</li>
							</ul>
						</Col>
					</Row>
					
					<br/>

					<PageHeader style={{marginBottom: '0px', width: '100%'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={1} justified>
	    				<Tab eventKey={1} title="FEATURED CHARACTERS">
	    					<br/>
	    					<Table cards={this.createCards('event.characters')}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createCards('event.series')}/>
	    				</Tab>
	    				<Tab eventKey={3} title="FEATURED COMICS">
	    					<br/> 
	    					<Table cards={this.createCards('event.comics')}/>
	    				</Tab>
	    				<Tab eventKey={4} title="FEATURED CREATORS">
	    					<br/> 
	    					<Table cards={this.createCards('event.creators')}/>
	    				</Tab>
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = EventInstance;