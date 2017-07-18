var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import ReactLoading from 'react-loading';
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class SeriesInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      series: null,
	      tabNum: 1,
	      tabsToRender: []
    	};

    	this.createCards = this.createCards.bind(this);
    	this.makeTab = this.makeTab.bind(this);
    	this.updateSeries = this.updateSeries.bind(this);
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
	        	this.state.series = series;
	        	this.createCards('characters')
	        	.then(function(){
	        		this.createCards('events')
	        		.then(function(){
	        			this.createCards('comics')
	        			.then(function(){
	        				this.createCards('creators')
	        				.then(function(){
	        					this.setState({tabNum: 0});
	        				}.bind(this));
	        			}.bind(this));
	        		}.bind(this));
	        	}.bind(this));    		        	
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
		return api.getModelConnections(this.state.series.links.self, modelType)	    
		.then(function (assocArray) {
			if(assocArray) {
				var modelTypeLink;
				for(var i = 0; i < assocArray.length; i++) {
					if(modelType != 'series')
						modelTypeLink = modelType.slice(0, modelType.length-1); 
					cardsArray.push(<Card modelLink={"/" + modelTypeLink + "Instance"} modelInstance={assocArray[i]}/>);
				}
				console.log(cardsArray);
				this.makeTab(cardsArray, modelType);
			}
	    }.bind(this));
	}

	makeTab(cards, modelType){
		if(cards.length != 0){
			this.state.tabsToRender.push(
					<Tab unmountOnExit={true} eventKey={this.state.tabNum} title={"FEATURED " + modelType.toUpperCase()}>
						<br/>
						<Table cards={cards}/>
					</Tab>
			);
			this.state.tabNum += 1;
		}
	}

	render() {
		const { series } = this.state;

		if(!series || this.state.tabNum != 0) {
			return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='375' width='375' />
            	   </div>

		}
		else {
			const {attributes} = this.state.series;
			const {relationships} = this.state.series;
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
								<li>Contains {relationships.characters.data.length} documented characters</li>
								<li>{relationships.events.data.length} events are progressed by this series</li>
								<li>Contains {relationships.comics.data.length} comics</li>
								<li>{relationships.creators.data.length} creators contributed to this series</li>
								<li>Series lifespan: {attributes.start}-{attributes.end}</li>
							</ul>
						</Col>
					</Row>
					
					<br/>

					<PageHeader style={{marginBottom: '0px', width: '100%', borderBottom: '2px solid white'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={1} justified>
	    				{this.state.tabsToRender}	
	 				</Tabs>

				</div>
			)
		}

	}
}

module.exports = SeriesInstance;