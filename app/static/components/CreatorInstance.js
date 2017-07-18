var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class CreatorInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      creator: null,
	      tabNum: 1,
	      tabsToRender: []
    	};

    	this.createCards = this.createCards.bind(this);
    	this.makeTab = this.makeTab.bind(this);
    	this.updateCreator = this.updateCreator.bind(this);
  	}

	componentWillMount() {
	    this.updateCreator(this.state.creator);
	}

	updateCreator(creator) {
		var creatorID = this.props.match.params.creatorID;

		this.setState(function() {
			return {
				creator: creator
			}
		});

		api.getCreator(creatorID)
	      .then(function (creator) {
	        	this.state.creator = creator;
	        	this.createCards('events')
	        	.then(function(response){
	        		this.createCards('series')
	        		.then(function(){
	        			this.createCards('comics')
	        			.then(function(){
	        				this.setState({tabNum: 0});
	        				}.bind(this));
	        			}.bind(this));
	        		}.bind(this));
	        	}.bind(this));
	}

	fixImage() {
		const { img } = this.state.creator.attributes;

		if(img && img != "") {
			return img.slice(0, -4) + "/portrait_uncanny.jpg";
		}

		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg";
	}

	createCards(modelType) {
		var cardsArray = [];
		return api.getModelConnections(this.state.creator.links.self, modelType)	    
		.then(function (assocArray) {
			if(assocArray) {
				var modelTypeLink;
				for(var i = 0; i < assocArray.length; i++) {
					if(modelType != 'series'){
						modelTypeLink = modelType.slice(0, modelType.length-1); 
					}
					else{
						modelTypeLink = modelType;
					}
					cardsArray.push(<Card modelLink={"/" + modelTypeLink + "Instance"} modelInstance={assocArray[i]}/>);
				}
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
		const { creator } = this.state;

		if(!creator || this.state.tabNum != 0) {
			return <p>LOADING!</p>
		}
		else {
			const {attributes} = this.state.creator;
			const {relationships} = this.state.creator;
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
					{attributes.full_name} <small>Identification Number: {creator.id}</small>
					</PageHeader>

					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={attributes.full_name}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Creator Attributes</PageHeader>
							<ul>
								<li>Contributed to {relationships.events.data.length} Events</li>
								<li>Contributed to {relationships.series.data.length} Series</li>
								<li>Contributed to {relationships.comics.data.length} Comics</li>
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

module.exports = CreatorInstance;