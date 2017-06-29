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
	          console.log(series)
	          return {
	            series: series
	          }
	        });
	      }.bind(this));
	}

	createCards() {
		var cardsArray = [];
		var seriesCopy = this.state.series
		for(var i = 0; i < seriesCopy.length; i++) {
			cardsArray.push(<Card name={seriesCopy[i].fullName} img={seriesCopy[i].thumbnail.path+"/standard_xlarge.jpg"} />);
		}
		return cardsArray;
	}

	render(){
		return(
			<div className="container">
				<PageHeader className="text-center" style={fixMargin}>Series</PageHeader>

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