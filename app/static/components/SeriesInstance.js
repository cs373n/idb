var React = require('react');
var Table = require('./Table.js');
var Card = require('./Card.js');
var api = require('./api.js');
import { PageHeader, Row, Col, Grid, Tab, Tabs } from 'react-bootstrap';

class SeriesInstance extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      series: null
    	};
  	}

	componentWillMount() {
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
			return series.img.slice(0, -4) + "/portrait_uncanny.jpg";
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
		modelType = modelType.slice(0, modelType.length-1);
		if(assoc) {
			for(var i = 0; i < assoc.length; i++) {
				cardsArray.push(<Card modelLink={"/" + modelType + "Instance"} modelInstance={assoc[i]}/>);
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
					{series.title} <small>Identification Number: {series.id}</small>
					</PageHeader>

					<Row>
						<Col md={3}>
							<img className="img-rounded img-responsive" src={this.fixImage()} alt={series.title}/>
						</Col>

						<Col className="text-left" md={9} style={{fontSize: '25px'}}>
							<PageHeader>Series Description</PageHeader>
							<p>{(series.desc == null || series.desc == "") ? "Description not available." : series.desc}</p>
							
							<PageHeader>Attributes</PageHeader>
							<ul>
								<li>Contains {series.num_characters} documented characters</li>
								<li>{series.num_events} events are progressed by this series</li>
								<li>Contains {series.num_comics} comics</li>
								<li>{series.num_creators} creators contributed to this series</li>
								<li>Series lifespan: {series.start}-{series.end}</li>
							</ul>
						</Col>
					</Row>
					
					<br/>

					<PageHeader style={{marginBottom: '0px', width: '100%'}}/>

					<Tabs bsStyle="pills" defaultActiveKey={1} justified>
	    				<Tab eventKey={1} title="FEATURED CHARACTERS">
	    					<br/>
	    					<Table cards={this.createCards('series.characters')}/>
	    				</Tab>
	    				<Tab eventKey={2} title="FEATURED EVENT">
	    					<br/>
	    					<Table cards={this.createCards('series.events')}/>
	    				</Tab>
	    				<Tab eventKey={3} title="FEATURED COMICS">
	    					<br/> 
	    					<Table cards={this.createCards('series.comics')}/>
	    				</Tab>
	    				<Tab eventKey={4} title="FEATURED CREATORS">
	    					<br/> 
	    					<Table cards={this.createCards('series.creators')}/>
	    				</Tab>
	 				 </Tabs>

				</div>
			)
		}

	}
}

module.exports = SeriesInstance;