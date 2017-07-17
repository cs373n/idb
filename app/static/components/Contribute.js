var React = require('react');
import { PageHeader, Row, Col, Button } from 'react-bootstrap';
var Link = require('react-router-dom').Link;


var cardStyle = {
	fontSize: '30px'
};

var fixMargin = {
	margin: '0'
}

class Contribute extends React.Component{
	render(){
		return(
			<div>
			<PageHeader className="text-center" style={fixMargin}>CONTRIBUTE</PageHeader>
			<br/>
			<Row className="show-grid">
				<Col md={4}>
					<div className="well">
						<div className="text-center" style={cardStyle}>
							CHARACTER
							<div>
								<Button bsStyle="red" onClick={() => this.props.history.push("contributeAdd/character")}>
						        	ADD
						        </Button>
						        <br/>
						    <Link to="/contributeEdit/character">
								<Button bsStyle="red">
						        	EDIT
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeDelete/character">
								<Button bsStyle="red">
						        	DELETE
						        </Button>
						        <br/>
						    </Link>
						    </div>
						</div>
					</div>
				</Col>
				<Col md={4}>
					<div className="well">
						<div className="text-center" style={cardStyle}>
							EVENT
							<div>
							<Link to="/contributeAdd/event">
								<Button bsStyle="red">
						        	ADD
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeEdit/event">
								<Button bsStyle="red">
						        	EDIT
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeDelete/event">
								<Button bsStyle="red">
						        	Delete
						        </Button>
						        <br/>
						    </Link>
						    </div>
						</div>
					</div>
				</Col>
				<Col md={4}>
					<div className="well">
						<div className="text-center" style={cardStyle}>
							SERIES
							<div>
							<Link to="/contributeAdd/series">
								<Button bsStyle="red">
						        	ADD
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeEdit/series">
								<Button bsStyle="red">
						        	EDIT
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeDelete/series">
								<Button bsStyle="red">
						        	DELETE
						        </Button>
						        <br/>
						    </Link>
						    </div>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<div className="well">
						<div className="text-center" style={cardStyle}>
							COMIC
							<div>
							<Link to="/contributeAdd/comic">
								<Button bsStyle="red">
						        	ADD
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeEdit/comic">
								<Button bsStyle="red">
						        	EDIT
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeDelete/comic">
								<Button bsStyle="red">
						        	DELETE
						        </Button>
						        <br/>
						    </Link>
						    </div>
						</div>
					</div>
				</Col>
				<Col md={4}>
					<div className="well">
						<div className="text-center" style={cardStyle}>
							CREATOR
							<div>
							<Link to="/contributeAdd/creator">
								<Button bsStyle="red">
						        	ADD
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeEdit/creator">
								<Button bsStyle="red">
						        	EDIT
						        </Button>
						        <br/>
						    </Link>
						    <Link to="/contributeDelete/creator">
								<Button bsStyle="red">
						        	DELETE
						        </Button>
						        <br/>
						    </Link>
						    </div>
						</div>
					</div>
				</Col>
			</Row>
			</div>
		)
	}
}

module.exports = Contribute;