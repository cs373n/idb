var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
var he = require('he');
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
		const { comic } = this.state;

		if(comic.img && comic.img != "") {
			return comic.img.slice(0, -4) + "/portrait_uncanny.jpg";
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
					{comic.title} <small>Identification Number: {comic.id}</small>
					</PageHeader>

					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={comic.title}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Comic Description</PageHeader>
							<p>{(comic.desc == null || comic.desc == "") ? "Description not available." : this.parseDesc(he.decode(comic.desc))}</p>
							
							<PageHeader>Attributes</PageHeader>
							<Col md={6}>
								<ul>
									<li>Part of the series: {comic.series[0].title}</li>
									<li>Progresses {comic.num_events} events</li>
									<li>Contains {comic.num_characters} documented characters</li>
								</ul>
							</Col>
							<Col md={6}>
								<ul>
									<li>{comic.num_creators} creators contributed to this comic</li>
									<li>Page Count: {comic.pg_ct}</li>
									<li>UPC: {comic.upc}</li>
									<li>Price: ${comic.price.toString().length === 3 ? comic.price + "0" : comic.price}</li>
								</ul>
							</Col>

						</Col>
					</Row>
					
					<br/>

					<PageHeader style={{marginBottom: '0px', width: '100%'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={1} justified>
	    				<Tab eventKey={1} title="FEATURED CHARACTERS">
	    					<br/>
	    					<Table cards={this.createCards('comic.characters')}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED EVENTS">
	    					<br/> 
	    					<Table cards={this.createCards('comic.events')}/>
	    				</Tab>
	    				<Tab eventKey={3} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createCards('comic.series')}/>
	    				</Tab>
	    				<Tab eventKey={4} title="FEATURED CREATORS">
	    					<br/> 
	    					<Table cards={this.createCards('comic.creators')}/>
	    				</Tab>
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = ComicInstance;