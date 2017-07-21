var Link = require('react-router-dom').Link;
var React = require('react');

var cardStyle = {
	fontSize: '30px'

};

var imgNotFound = "http://i.imgur.com/2ll12Pa.jpg";

class Card extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      modelInstance: props.modelInstance,
	      modelLink: props.modelLink
    	};
    }

    styleImage(){
    	const { attributes } = this.state.modelInstance;
		if(attributes.img && attributes.img != "" && attributes.img.charAt(4) === ":") {
			return attributes.img.slice(0, -4) + "/portrait_incredible.jpg";
		}
		else if(attributes.img && attributes.img.charAt(4) === "s"){
			return attributes.img;
		}
		return imgNotFound;
	}

	render() {
		const { attributes } = this.state.modelInstance;
		var title = attributes.name ? attributes.name : attributes.title; //Handle Series/Events and Characters
		if (title == null && attributes.full_name) { //Handle Creators
			title = attributes.full_name;
		}
		return (
			<Link to={this.state.modelLink + "/" + this.state.modelInstance.id}>
				<div className="well">
					<div className="text-center" style={cardStyle}>
						{title}
					</div>
					<div>
						<img className="img-responsive center-block img-rounded"
							 style={{height: '324px', width: '216px'}} 
							 src={this.styleImage()} 
							 alt={title}/>
					</div>
				</div>
			</Link>
		)
	}
}


module.exports = Card;
