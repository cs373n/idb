var React = require('react');
import { PageHeader } from 'react-bootstrap';
var api = require('./api.js')

class Characters extends React.Component{
	constructor(props) {
	    super();
	    this.state = {
	      characters: null
    	};

    	// Maybe.... this.updateChars = this.updateChars.bind(this);
  	}

	componentDidMount() {
	    this.updateChars(this.state.characters)
	}

	updateChars(chars) {

		this.setState(function() {
			return {
				characters: chars
			}
		});

		api.getCharacters()
	      .then(function (chars) {
	        this.setState(function () {
	          console.log(chars)
	          return {
	            characters: chars
	          }
	        });
	      }.bind(this));
	}

	render(){
		return(
			<div>
				<div>
					<PageHeader className="text-center">CHARACTERS</PageHeader>
				</div>

				{!this.state.characters
		          ? <p>LOADING!</p>
		          /* Table here */
		          : "pls wrk" + this.state.characters[0].name + "\n" + this.state.characters[0].description
		        }
			</div>
		)
	}

}

module.exports = Characters;