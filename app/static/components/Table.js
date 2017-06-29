var React = require('react');
import {Grid, Row, Col} from 'react-bootstrap';

class Table extends React.Component{
	render(){
		return(
			<Grid>
				<Row className="show-grid">
					<Col md={4}>
						{this.props.cards[0]}
					</Col>
					<Col md={4}>
						{this.props.cards[1]}
					</Col>
					<Col md={4}>
						{this.props.cards[2]}
					</Col>
				</Row>
				<br/>
				<Row className="show-grid">
					<Col md={4}>
						{this.props.cards[3]}
					</Col>
					<Col md={4}>
						{this.props.cards[4]}
					</Col>
					<Col md={4}>
						{this.props.cards[5]}
					</Col>
				</Row>
			</Grid>
		)
	}
}

module.exports = Table;