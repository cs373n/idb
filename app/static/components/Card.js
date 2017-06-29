import { Well } from 'react-bootstrap';
var React = require('react');

var cardStyle = {
	fontSize: '24px'
};

class Card extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      name: props.name,
	      image: props.img
    	};
    }
	render() {
		return (
			<div>
				<div className="text-center" style={cardStyle}>
					{this.state.name}
				</div>
				<div>
					<img className="img-responsive center-block img-rounded" src={this.state.image} alt={this.state.name}/>
				</div>
			</div>
		)
	}
}


module.exports = Card;
