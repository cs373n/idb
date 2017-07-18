var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
var he = require('he');
import ReactLoading from 'react-loading';
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class ComicInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      comic: null,
	      tabNum: 1,
	      tabsToRender: []
    	};

    	this.createCards = this.createCards.bind(this);
    	this.makeTab = this.makeTab.bind(this);
    	this.updateComic = this.updateComic.bind(this);
  	}

	componentWillMount() {
	    this.updateComic(this.state.comic);
	}

	updateComic(comic) {
		var comicID = this.props.match.params.comicID;

		this.setState(function() {
			return {
				comic: comic
			}
		});

		api.getComic(comicID)
	      .then(function (comic) {
	        	this.state.comic = comic;
	        	this.createCards('characters')
	        	.then(function(){
	        		this.createCards('events')
	        		.then(function(){
	        			this.createCards('series')
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
		const { img } = this.state.comic.attributes;

		if(img && img != "") {
			return img.slice(0, -4) + "/portrait_uncanny.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg";
	}

	createCards(modelType) {
		var cardsArray = [];
		return api.getModelConnections(this.state.comic.links.self, modelType)	    
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

	parseDesc(desc){
		console.log(desc);
		var regEx = new RegExp("(?=<)(.*?)>", "g");
		var descArray = desc.match(regEx);
		if(!descArray){
			return desc;
		}
		else{
			var newDesc = desc;
			for(var i = 0; i < descArray.length; i++){
				console.log(descArray[i]);
				newDesc = newDesc.replace(descArray[i], " ");
				console.log(desc);
			}
			console.log(newDesc);
			return newDesc;
		}
	}

	render() {
		const { comic } = this.state;

		if(!comic || this.state.tabNum != 0) {
			return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='900' width='375'
	            						  delay='5' color='red' />
            	   </div>
		}
		else {
			const {attributes} = this.state.comic;
			const {relationships} = this.state.comic;
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
					{attributes.title} <small>Identification Number: {comic.id}</small>
					</PageHeader>

					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={attributes.title}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Comic Description</PageHeader>
							<p>{(attributes.desc == null || attributes.desc == "") ? "Description not available." : this.parseDesc(he.decode(attributes.desc))}</p>
							
							<PageHeader>Attributes</PageHeader>
							<Col md={6}>
								<ul>
									<li>Contains {relationships.characters.data.length} documented characters</li>
									<li>Progresses {relationships.events.data.length} events</li>
								</ul>
							</Col>
							<Col md={6}>
								<ul>
									<li>{relationships.creators.data.length} creators contributed to this comic</li>
									<li>Page Count: {attributes.pg_ct}</li>
									<li>UPC: {attributes.upc}</li>
									<li>Price: ${attributes.price.toString().length === 3 ? attributes.price + "0" : attributes.price}</li>
								</ul>
							</Col>

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

module.exports = ComicInstance;