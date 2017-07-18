var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import ReactLoading from 'react-loading';
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class CharacterInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      character: null,
	      tabNum: 1,
	      tabsToRender: []
    	};

    	this.createCards = this.createCards.bind(this);
    	this.makeTab = this.makeTab.bind(this);
    	this.updateCharacter = this.updateCharacter.bind(this);
  	}

	componentWillMount() {
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
	        	this.state.character = char;
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
		const { img } = this.state.character.attributes;

		if(img && img != "") {
			return img.slice(0, -4) + "/portrait_uncanny.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg";
	}

	createCards(modelType) {
		var cardsArray = [];
		return api.getModelConnections(this.state.character.links.self, modelType)	    
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
		const { character } = this.state;
			
		if(!character || this.state.tabNum != 0){
			return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='900' width='375'
	            						  delay='5' color='red' />
            	   </div>
		}
		else{
			const {attributes} = this.state.character;
			const {relationships} = this.state.character;
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
					{attributes.name} <small>Identification Number: {character.id}</small>
					</PageHeader>
					
					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={attributes.name}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Character Description</PageHeader>
							<p>{(attributes.desc == null || attributes.desc == "") ? "Description not available." : attributes.desc}</p>
							
							<PageHeader>Attributes</PageHeader>
							<ul>
								<li>Appears in {relationships.events.data.length} Events</li>
								<li>Appears in {relationships.series.data.length} Series</li>
								<li>Appears in {relationships.comics.data.length} Comics</li>
							</ul>
						</Col>
					</Row>

					<PageHeader style={{marginBottom: '0px', width: '100%', borderBottom: '2px solid white'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={1} justified>
						{this.state.tabsToRender}
					</Tabs>
				</div>
			)
		}
	}
}

module.exports = CharacterInstance;
