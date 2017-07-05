var React = require('react');

class SearchResults extends React.Component {

	render(){
		return(

			<p>{this.props.match.params.searchString}</p>
		)
	}
}

module.exports = SearchResults;