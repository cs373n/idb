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
	      comic: null
    	};
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
	        this.setState(function () {
	          return {
	            comic: comic
	          }
	        });
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
		api.getModelConnections(this.state.comic.links.self, modelType)	    
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

		if(!comic) {
			return <div style={{display: 'flex', justifyContent: 'center'}}>
	            			<ReactLoading type="bars" height='375' width='375' />
            	   </div>
		}
		else {
			const {attributes} = this.state.comic;
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
									<li>Progresses {attributes.num_events} events</li>
									<li>Contains {attributes.num_characters} documented characters</li>
								</ul>
							</Col>
							<Col md={6}>
								<ul>
									<li>{attributes.num_creators} creators contributed to this comic</li>
									<li>Page Count: {attributes.pg_ct}</li>
									<li>UPC: {attributes.upc}</li>
									<li>Price: ${attributes.price.toString().length === 3 ? attributes.price + "0" : attributes.price}</li>
								</ul>
							</Col>

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
	    				<Tab eventKey={3} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createCards('series')}/>
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

module.exports = ComicInstance;