var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
var he = require('he');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

var h2Font = {
	fontSize: '20px',
};

class ComicInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      comic: null
    	};
  	}

	componentDidMount() {
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
			return comic.img.slice(0, -4) + "/portrait_incredible.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg";
	}

	createSeriesCards() {
		var cardsArray = [];
		var assocSeries = this.state.comic.series;
		if(assocSeries) {
			for(var i = 0; i < assocSeries.length; i++) {
				cardsArray.push(<Card modelLink="/seriesInstance" modelInstance={assocSeries[i]}/>);
			}
		}
		return cardsArray;
	}

	createEventsCards() {
		var cardsArray = [];
		var assocEvents = this.state.comic.events;
		if(assocEvents) {
			for(var i = 0; i < assocEvents.length; i++) {
				cardsArray.push(<Card modelLink="/eventInstance" modelInstance={assocEvents[i]}/>);
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

			return (
				<div className="container">
					<PageHeader className="text-left">{comic.title}</PageHeader>
					<Grid>
						<Row>
							<Col md={3}>
								<img className="img-rounded img-responsive" src={this.fixImage()} alt={comic.title}/>
							</Col>

							<Col className="text-left" md={9}>
								<PageHeader style={h2Font}>Description</PageHeader>
								<p>{(comic.desc == null || comic.desc == "") ? "Description not available." : this.parseDesc(he.decode(comic.desc))}</p>
								<PageHeader style={h2Font}>Attributes</PageHeader>
								<ul>
									<li>Appears in the Series: {comic.series[0].title}</li>
									<li>Appears in {comic.events.length} Events</li>
								</ul>
							</Col>
						</Row>
					</Grid>
					
					<br/>

					<Tabs bsStyle="tabs" defaultActiveKey={1}>
	    				<Tab eventKey={1} title="FEATURED SERIES">
	    					<br/>
	    					<Table cards={this.createSeriesCards()}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED EVENTS">
	    					<br/>
	    					<Table cards={this.createEventsCards()}/>
	    				</Tab>	
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = ComicInstance;