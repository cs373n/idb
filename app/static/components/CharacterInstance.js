var React = require('react')
import { PageHeader, Row, Col, Grid, Nav, NavItem  } from 'react-bootstrap'

var h2Font = {
	fontSize: '20px'
};

class CharacterInstance extends React.Component {
	render() {
		return (
			<div className="container">
				<PageHeader className="text-left" >{/*this.props.name*/}</PageHeader>
				<Grid>
					<Row>
						<Col md={4}>
							BAHHHH{/*<img src={this.props.img} alt={this.props.name}/>*/}
						</Col>

						<Col className="text-left" md={8}>
							<PageHeader style={h2Font}>Description</PageHeader>
							<p>{/*this.props.desc*/}</p>
							<PageHeader style={h2Font}>Statistics</PageHeader>
							<ul>
								<li>Appears in {/*this.props.numSeries*/} Series</li>
								<li>Appears in {/*this.props.numEvents*/} Events</li>
							</ul>
						</Col>
					</Row>
				</Grid>
				
				<br/>

				<Nav className="nav-justified" bsStyle="pills" activeKey={1}>
					<NavItem eventKey={1} href="#series">SERIES</NavItem>
					<NavItem eventKey={2} href="#events">EVENTS</NavItem>
				</Nav>

			</div>
		)

	}
}

module.exports = CharacterInstance;