var Link = require('react-router-dom').Link;
var React = require('react');
import { Button, PageHeader } from 'react-bootstrap';

var titleStyle = {
	fontSize: '30px'
};

var highlightStyle = {
	padding: '0px', 
	color: '#e8cc33', 
	backgroundColor: '#252525'
}

var contextStyle = {
	fontSize: '25px'
}

var wellStyle = {
	backgroundColor: '#252525'
}

var imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";

/*
	PROPS: searchString, searchType
*/
class SearchCard extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      modelType: props.modelType,
	      modelInstance: props.modelInstance,
	      modelLink: props.modelLink
    	};

    	this.contextualizeSearch = this.contextualizeSearch.bind(this);
    }

    styleImage(){
    	const { modelInstance } = this.state;
		if(modelInstance.img && modelInstance.img != "") {
			return modelInstance.img.slice(0, -4) + "/standard_xlarge.jpg";
		}

		else {
			return imgNotFound;
		}
	}

	contextualizeSearch(){
		var searchString = this.props.searchString;
		const { modelInstance } = this.state;
		var regEx = new RegExp(this.props.searchString[0], "i");
		var contextIndex = {};
		var context = [];

		Object.keys(modelInstance).map(function(key, index){
			var modelField = modelInstance[key];
			if(!Array.isArray(modelField) && modelField && modelField !== ""){
				contextIndex[key] = modelField.toString().search(regEx) + 3;
			}
		});

		Object.keys(contextIndex).map(function(key, index){
			var contextField = contextIndex[key];
			var modelField = "..." + modelInstance[key].toString() + "...";	
			if(contextField !== 2){
				key = key.charAt(0).toUpperCase() + key.slice(1)
				if(contextField === 3 && modelField.length-6 === searchString[0].length){
					context.push(
									<li>
										{key + " : "}
										<mark style={highlightStyle}> 
										{modelField.slice(contextField, contextField+searchString[0].length)}
										</mark>
									</li>
								);
				}
				else{
					context.push(<li>
									{key + " : '..." + modelField.slice(contextField-3, contextField)} 
									<mark style={highlightStyle}> 
									{modelField.slice(contextField, contextField+searchString[0].length)}
									</mark>
									{modelField.slice(contextField+searchString[0].length, contextField+searchString[0].length+3) +"...'"}
								</li>);
				}
			}
		});
		console.log(context);

		return context;
	}

	render() {
		const { modelInstance } = this.state;
		var title = modelInstance.name ? modelInstance.name : modelInstance.title; //Handle Series/Events and Characters
		if (title == null && modelInstance.full_name) { //Handle Creators
			title = modelInstance.full_name;
		}

		return (
			<div className="well" style={wellStyle}>
				<div className="text-center" style={titleStyle}>
					{title}
					<Link to={this.state.modelLink + "/" + this.state.modelInstance.id}>
						<img className="img-responsive center-block img-rounded" 
							 src={this.styleImage()} 
							 alt={title}/>
					</Link>
				</div>
				<div className="text-center">
					<h3 style={{marginTop: '5px', marginBottom: '0px', paddingBottom: '0px'}}>Attributes Matched:</h3>
					<ul className="list-unstyled" style={{fontSize: '20px'}}>
						{this.contextualizeSearch()}
					</ul>
				</div>
			</div>
		)
	}
}


module.exports = SearchCard;