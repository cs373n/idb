var React = require('react');
import {Grid, Row, Col} from 'react-bootstrap';

class Table extends React.Component{
	render(){
		return(
			<div>
				<Row className="show-grid">
					<Col sm={4} md={4}>
						{this.props.cards[0]}
					</Col>
					<Col sm={4} md={4}>
						{this.props.cards[1]}
					</Col>
					<Col sm={4} md={4}>
						{this.props.cards[2]}
					</Col>
				</Row>
				<Row className="show-grid">
					<Col sm={4} md={4}>
						{this.props.cards[3]}
					</Col>
					<Col sm={4} md={4}>
						{this.props.cards[4]}
					</Col>
					<Col sm={4} md={4}>
						{this.props.cards[5]}
					</Col>
				</Row>
			</div>
		)
	}
}

module.exports = Table;