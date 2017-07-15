var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class SeriesInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      series: null
    	};
  	}

	componentWillMount() {
	    this.updateSeries(this.state.series);
	}

	updateSeries(series) {
		var seriesID = this.props.match.params.seriesID;

		this.setState(function() {
			return {
				series: series
			}
		});

		api.getOneSeries(seriesID)
	      .then(function (series) {
	        this.setState(function () {
	          return {
	            series: series
	          }
	        });
	      }.bind(this));
	}

	fixImage() {
		const { img } = this.state.series.attributes;

		if(img && img != "") {
			return img.slice(0, -4) + "/portrait_uncanny.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg";
	}

	createCards(modelType) {
		var cardsArray = [];
		api.getModelConnections(this.state.series.links.self, modelType)	    
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
		const { series } = this.state;

		if(!series) {
			return <p>LOADING!</p>
		}
		else {
			const {attributes} = this.state.series;
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
					{attributes.title} <small>Identification Number: {series.id}</small>
					</PageHeader>

					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={attributes.title}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Series Description</PageHeader>
							<p>{(attributes.desc == null || attributes.desc == "") ? "Description not available." : attributes.desc}</p>
							
							<PageHeader>Attributes</PageHeader>
							<ul>
								<li>Contains {attributes.num_characters} documented characters</li>
								<li>{attributes.num_events} events are progressed by this series</li>
								<li>Contains {attributes.num_comics} comics</li>
								<li>{attributes.num_creators} creators contributed to this series</li>
								<li>Series lifespan: {attributes.start}-{attributes.end}</li>
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
	    				<Tab eventKey={2} title="FEATURED EVENTS">
	    					<br/>
	    					<Table cards={this.createCards('events')}/>
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

module.exports = SeriesInstance;