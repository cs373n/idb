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
    	};

    	this.createCards = this.createCards.bind(this);
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
	        this.setState(function () {
	          return {
	            character: char
	          }
	        });
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
		api.getModelConnections(this.state.character.links.self, modelType)	    
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
			}
	    }.bind(this));
	    return cardsArray;
	}

	render() {
		console.log(this.state.character);
		const { character } = this.state;

		if(!character){
			return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='375' width='375' />
            	   </div>
		}
		else{
			const {attributes} = this.state.character;
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
								<li>Appears in {attributes.num_comics} Comics</li>
								<li>Appears in {attributes.num_series} Series</li>
								<li>Appears in {attributes.num_events} Events</li>
							</ul>
						</Col>
					</Row>

					<PageHeader style={{marginBottom: '0px', width: '100%', borderBottom: '2px solid white'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={0} justified>
	    				<Tab unmountOnExit={true} eventKey={1} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createCards('series')}/>
	    				</Tab>
	    				<Tab unmountOnExit={true} eventKey={2} title="FEATURED EVENTS">
	    					<br/>
	    					<Table cards={this.createCards('events')}/>
	    				</Tab>
	    				<Tab unmountOnExit={true} eventKey={3} title="FEATURED COMICS">
	    					<br/> 
	    					<Table cards={this.createCards('comics')}/>
	    				</Tab>	
 				 	</Tabs>
				</div>
			)
		}
	}
}

module.exports = CharacterInstance;