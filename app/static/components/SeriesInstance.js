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
		var assocCharacters = this.state.series.characters; // (╯°□°)╯︵ ┻━┻
			for(var i = 0; i < assocCharacters.length; i++) {
				if(assocCharacters[i].img && assocCharacters[i].img != "") {
					assocCharacters[i].img = assocCharacters[i].img.slice(0, -4) + "/standard_xlarge.jpg";
					cardsArray.push(<Card modelLink="/characterInstance" 
									      modelInstance={assocCharacters[i]}/>);
				}

				else {
					assocCharacters[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
					cardsArray.push(<Card modelLink="/characterInstance" 
									 	  modelInstance={assocCharacters[i]} />);
				}
			}
		return cardsArray;
	}

	createCreatorCards() {
		var cardsArray = [];
		var assocCreators = this.state.series.creators; // (╯°□°)╯︵ ┻━┻
		for(var i = 0; i < assocCreators.length; i++) {
			if(assocCreators[i].img && assocCreators[i].img != "") {
				assocCreators[i].img = assocCreators[i].img.slice(0, -4) + "/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/creatorInstance" 
								      modelInstance={assocCreators[i]}/>);
			}

			else {
				assocCreators[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/creatorInstance" 
								 	  modelInstance={assocCreators[i]} />);
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

			console.log("SeriesInstance render(): " + series.characters)
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
								<p>{series.desc}</p>
								<PageHeader style={h2Font}>Statistics</PageHeader>
								<ul>
									<li>Contains {series.num_characters} characters</li>
									<li>{series.num_creators} creators contributed to this series</li>
								</ul>
							</Col>
						</Row>
					</Grid>
					
					<br/>

					<Tabs bsStyle="tabs" defaultActiveKey={1}>
	    				<Tab seriesKey={1} title="CHARACTERS">
	    					<br/>
	    					<Table cards={this.createCharacterCards()}/>
	    				</Tab>
	    				<Tab seriesKey={2} title="CREATORS">
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