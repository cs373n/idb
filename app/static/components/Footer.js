var React = require('react');
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';


class Footer extends React.Component{
	render(){
		return(
			<footer className="text-center container-fluid"> 
				<Grid>
					<Row>
						<a href="https://developer.marvel.com/" target="_blank">Marvel API</a>
					</Row>
					<Row>
						Data provided by Marvel. © 2014 Marvel
					</Row>
				</Grid>
			</footer>	
		)
	}
}

module.exports = Footer;