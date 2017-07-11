var Link = require('react-router-dom').Link;
var React = require('react');

var cardStyle = {
	fontSize: '30px'

};

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";

class Card extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
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
			<Link to={this.state.modelLink + "/" + this.state.modelInstance.id}>
				<div className="well">
					<div className="text-center" style={cardStyle}>
						{title}
					</div>
					<div>
						<img className="img-responsive center-block img-rounded" 
							 src={this.styleImage()} 
							 alt={title}/>
					</div>
				</div>
			</Link>
		)
	}
}


module.exports = Card;
