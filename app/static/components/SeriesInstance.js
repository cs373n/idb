var React = require('react');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');

var h2Font = {
	fontSize: '20px',
};

class SeriesInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      series: null
    	};
  	}

	componentDidMount() {
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
	        this.setState(function () {
	          return {
	            series: series
	          }
	        });
	      }.bind(this));
	}

	fixImage() {
		const { series } = this.state;

		if(series.img && series.img != "") {
			return series.img.slice(0, -4) + "/portrait_incredible.jpg";
		}
		return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg";
	}

	createCharacterCards() {
		var cardsArray = [];
		var assocCharacters = this.state.series.characters; 
		if(assocCharacters) {
			for(var i = 0; i < assocCharacters.length; i++) {
					cardsArray.push(<Card modelLink="/characterInstance" modelInstance={assocCharacters[i]}/>);
			}
		}
		return cardsArray;
	}

	createCreatorCards() {
		var cardsArray = [];
		var assocCreators = this.state.series.creators; 
		if(assocCreators) {
			for(var i = 0; i < assocCreators.length; i++) {
					cardsArray.push(<Card modelLink="/creatorInstance" modelInstance={assocCreators[i]}/>);
			}
		}
		return cardsArray;
	}

	render() {
		const { series } = this.state;

		if(!series) {
			return <p>LOADING!</p>
		}
		else {

			return (
				<div className="container">
					<PageHeader className="text-left">{series.title}</PageHeader>
					<Grid>
						<Row>
							<Col md={3}>
								<img className="img-rounded img-responsive" src={this.fixImage()} alt={series.title}/>
							</Col>

							<Col className="text-left" md={9}>
								<PageHeader style={h2Font}>Description</PageHeader>
								<p>{(series.desc == null || series.desc == "") ? "Description not available." : series.desc}</p>
								<PageHeader style={h2Font}>Statistics</PageHeader>
								<ul>
									<li>Contains {series.characters.length} characters</li>
									<li>{series.creators.length} creators contributed to this series</li>
								</ul>
							</Col>
						</Row>
					</Grid>
					
					<br/>

					<Tabs bsStyle="tabs" defaultActiveKey={1}>
	    				<Tab eventKey={1} title="FEATURED CHARACTERS">
	    					<br/>
	    					<Table cards={this.createCharacterCards()}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED CREATORS">
	    					<br/>
	    					<Table cards={this.createCreatorCards()}/>
	    				</Tab>	
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = SeriesInstance;