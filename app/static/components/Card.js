import { Well } from 'react-bootstrap';
var Link = require('react-router-dom').Link;
var React = require('react');

var cardStyle = {
	fontSize: '24px'
};

class Card extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      modelInstance: props.modelInstance,
	      modelLink: props.modelLink
    	};
    }
	render() {
		const { modelInstance } = this.state;
		var title = modelInstance.name ? modelInstance.name : modelInstance.title;
		if (title == null && modelInstance.full_name) {
			title = modelInstance.full_name;
		}
		return (
			<div>
				<div className="text-center" style={cardStyle}>
					{title}
				</div>
				<div>
					<Link to={this.state.modelLink + "/" + this.state.modelInstance.id}>
						<img className="img-responsive center-block img-rounded" 
							 src={modelInstance.img} 
							 alt={title}/>
					</Link>
				</div>
			</div>
		)
	}
}


module.exports = Card;
