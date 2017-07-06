var Link = require('react-router-dom').Link;
var React = require('react');
import { Button } from 'react-bootstrap';

var cardStyle = {
	fontSize: '24px'
};

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";

class SearchCard extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      modelType: props.modelType,
	      modelInstance: props.modelInstance,
	      modelLink: props.modelLink
    	};
    }

    styleImage(){
    	const { modelInstance } = this.state;
		if(modelInstance.img && modelInstance.img != "") {
			return modelInstance.img.slice(0, -4) + "/standard_xlarge.jpg";
		}

		else {
			return imgNotFound;
		}
	}

	render() {
		const { modelInstance } = this.state;
		var title = modelInstance.name ? modelInstance.name : modelInstance.title; //Handle Series/Events and Characters
		if (title == null && modelInstance.full_name) { //Handle Creators
			title = modelInstance.full_name;
		}
		return (
			<div>
				<div className="text-center" style={cardStyle}>
					{title}
					<Link to={this.state.modelLink + "/" + this.state.modelInstance.id}>
						<img className="img-responsive center-block img-rounded" 
							 src={this.styleImage()} 
							 alt={title}/>
					</Link>
					<p>CONTEXT MOTHER FUCKER</p>
				</div>
			</div>
		)
	}
}


module.exports = SearchCard;