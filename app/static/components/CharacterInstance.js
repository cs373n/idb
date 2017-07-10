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
		const { character } = this.state;

		if(character.img && character.img != "") {
			return character.img.slice(0, -4) + "/portrait_uncanny.jpg";
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

					<PageHeader className="text-left" style={titleStyle}>
					{character.name} <small>Identification Number: {character.id}</small>
					</PageHeader>
					
					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={character.name}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Description</PageHeader>
							<p>{(character.desc == null || character.desc == "") ? "Description not available." : character.desc}</p>
							
							<PageHeader>Attributes</PageHeader>
							<ul>
								<li>Appears in {character.num_comics} Comics</li>
								<li>Appears in {character.num_series} Series</li>
								<li>Appears in {character.num_events} Events</li>
							</ul>
						</Col>
					</Row>

					<br/>

					<PageHeader style={{marginBottom: '0px', width: '100%'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={1} justified>
	    				<Tab eventKey={1} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createCards('character.series')}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED EVENTS">
	    					<br/>
	    					<Table cards={this.createCards('character.events')}/>
	    				</Tab>
	    				<Tab eventKey={3} title="FEATURED COMICS">
	    					<br/> 
	    					<Table cards={this.createCards('character.comics')}/>
	    				</Tab>	
 				 	</Tabs>
				</div>
			)
		}
	}
}

module.exports = CharacterInstance;