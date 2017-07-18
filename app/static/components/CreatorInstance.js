var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import ReactLoading from 'react-loading';
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class CreatorInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      creator: null
    	};
  	}

	componentWillMount() {
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
	      	console.log(creator)
	        this.setState(function () {
	          return {
	            creator: creator
	          }
	        });
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
		api.getModelConnections(this.state.creator.links.self, modelType)	    
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
		const { creator } = this.state;

		if(!creator) {
			return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='375' width='375' />
            	   </div>
		}
		else {
			const {attributes} = this.state.creator;
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
								<li>Contributed to {attributes.num_events} Events</li>
								<li>Contributed to {attributes.num_series} Series</li>
								<li>Contributed to {attributes.num_comics} Comics</li>
							</ul>
						</Col>
					</Row>
					
					<br/>

					<PageHeader style={{marginBottom: '0px', width: '100%'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={0} justified>
	    				<Tab eventKey={1} title="FEATURED EVENTS">
	    					<br/>
	    					<Table cards={this.createCards('events')}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createCards('series')}/>
	    				</Tab>
	    				<Tab eventKey={3} title="FEATURED COMICS">
	    					<br/> 
	    					<Table cards={this.createCards('comics')}/>
	    				</Tab>	
 				 	</Tabs>	

				</div>
			)
		}

	}
}

module.exports = CreatorInstance;