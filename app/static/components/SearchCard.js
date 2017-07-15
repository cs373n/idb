var Link = require('react-router-dom').Link;
var React = require('react');
import { Button, PageHeader } from 'react-bootstrap';

var titleStyle = {
	fontSize: '30px'
};


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
    	const { attributes } = this.state.modelInstance;
		if(attributes.img && attributes.img != "") {
			return attributes.img.slice(0, -4) + "/standard_xlarge.jpg";
		}

		else {
			return imgNotFound;
		}
	}

	contextualizeSearch(){
		var searchString = this.props.searchString;
		const { modelInstance } = this.state;
		const { attributes } = this.state.modelInstance;
		attributes['id'] = modelInstance['id'];
 		
		var contextIndex = {}; //Gives name: '' or title: '' etc....
		var context = [];	//actual list elements to be rendered

		for(var i = 0; i < searchString.length; i++){
			var regEx = new RegExp(this.props.searchString[i], "i");

			//Building contextIndex
			Object.keys(attributes).map(function(key, index){
				var modelField = attributes[key];
				if(modelField && modelField !== "" && key != "img"){
					contextIndex[key] = modelField.toString().search(regEx) + 3;
				}
			});

			Object.keys(contextIndex).map(function(key, index){
				var contextField = contextIndex[key];
				var modelField = "..." + attributes[key].toString() + "...";	
				if(contextField !== 2){
					key = key.charAt(0).toUpperCase() + key.slice(1)
					if(contextField === 3 && modelField.length-6 === searchString[i].length){
						context.push(
										<li>
											{key + " : "}
											<mark> 
											{modelField.slice(contextField, contextField+searchString[i].length)}
											</mark>
										</li>
									);
					}
					else{
						context.push(<li>
										{key + " : '..." + modelField.slice(contextField-3, contextField)} 
										<mark> 
										{modelField.slice(contextField, contextField+searchString[i].length)}
										</mark>
										{modelField.slice(contextField+searchString[i].length, contextField+searchString[i].length+3) +"...'"}
									</li>);
					}
				}
			});
		}
		console.log(context);

		return context;
	}

	render() {
		const { attributes } = this.state.modelInstance;
		var title = attributes.name ? attributes.name : attributes.title; //Handle Series/Events and Characters
		if (title == null && attributes.full_name) { //Handle Creators
			title = attributes.full_name;
		}

		return (
			<Link to={this.state.modelLink + "/" + this.state.modelInstance.id}>
				<div className="well">
					<div className="text-center" style={titleStyle}>
						{title}
							<img className="img-responsive center-block img-rounded" 
								 src={this.styleImage()} 
								 alt={title}/>
					</div>
					<div className="text-center">
						<h3 style={{marginTop: '5px', marginBottom: '0px', paddingBottom: '0px'}}>Search matched these attributes:</h3>
						<ul className="list-unstyled" style={{fontSize: '20px'}}>
							{this.contextualizeSearch()}
						</ul>
					</div>
				</div>
			</Link>
		)
	}
}


module.exports = SearchCard;