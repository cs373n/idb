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
								<Button onClick={() => this.props.history.push("contributeAdd/character")}>
						        	ADD
						        </Button>
						    <Link to="/contributeEdit/character">
								<Button>
						        	EDIT
						        </Button>
						    </Link>
						    <Link to="/contributeDelete/character">
								<Button>
						        	DELETE
						        </Button>
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
								<Button>
						        	ADD
						        </Button>
						    </Link>
						    <Link to="/contributeEdit/event">
								<Button>
						        	EDIT
						        </Button>
						    </Link>
						    <Link to="/contributeDelete/event">
								<Button>
						        	Delete
						        </Button>
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
								<Button>
						        	ADD
						        </Button>
						    </Link>
						    <Link to="/contributeEdit/series">
								<Button>
						        	EDIT
						        </Button>
						    </Link>
						    <Link to="/contributeDelete/series">
								<Button>
						        	DELETE
						        </Button>
						    </Link>
						    </div>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<div className="well">
						<div className="text-center" style={cardStyle}>
							COMIC
							<div>
							<Link to="/contributeAdd/comic">
								<Button>
						        	ADD
						        </Button>
						    </Link>
						    <Link to="/contributeEdit/comic">
								<Button>
						        	EDIT
						        </Button>
						    </Link>
						    <Link to="/contributeDelete/comic">
								<Button>
						        	DELETE
						        </Button>
						    </Link>
						    </div>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="well">
						<div className="text-center" style={cardStyle}>
							CREATOR
							<div>
							<Link to="/contributeAdd/creator">
								<Button>
						        	ADD
						        </Button>
						    </Link>
						    <Link to="/contributeEdit/creator">
								<Button>
						        	EDIT
						        </Button>
						    </Link>
						    <Link to="/contributeDelete/creator">
								<Button>
						        	DELETE
						        </Button>
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