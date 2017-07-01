var React = require('react');
import { PageHeader } from 'react-bootstrap';
var api = require('./api.js');
var Table = require('./Table.js');
var Card = require('./Card.js')

var fixMargin = {
	margin: '0'
}

class Series extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      series: null
    	};

    	// Maybe.... this.updateChars = this.updateChars.bind(this);
  	}

	componentDidMount() {
	    this.updateSeries(this.state.series)
	}

	updateSeries(series) {

		this.setState(function() {
			return {
				series: series
			}
		});

		api.getSeries()
	      .then(function (series) {
	        this.setState(function () {
	          return {
	            series: series
	          }
	        });
	      }.bind(this));
	}

	createCards() {
		var cardsArray = [];
		var seriesCopy = this.state.series;
		for(var i = 0; i < seriesCopy.length; i++) {
			if(seriesCopy[i].img && seriesCopy[i].img != "") {
				seriesCopy[i].img = seriesCopy[i].img.slice(0, -4) + "/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/seriesInstance" 
								      modelInstance={seriesCopy[i]} />);
			}

			else {
				seriesCopy[i].img = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
				cardsArray.push(<Card modelLink="/seriesInstance" 
								 	  modelInstance={seriesCopy[i]} />);
			}
		}
		return cardsArray;
	}

	render(){
		return(
			<div className="container">
				<PageHeader className="text-center" style={fixMargin}>SERIES</PageHeader>

				{!this.state.series
		          ? <p>LOADING!</p>
		          /* Table here */
		          : <Table cards={this.createCards()}/>
		        }
			</div>
		)
	}

}

module.exports = Series;