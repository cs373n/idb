var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var NavBar = require('./NavBar.js');

// Models Home Pages
var Home = require('./Home.js');
var Characters = require('./Characters.js')
var Creators = require('./Creators.js');
var Events = require('./Events.js');
var Series = require('./Series.js');
var Comics = require('./Comics.js');

// Instance Pages
var CharacterInstance = require('./CharacterInstance.js');
var CreatorInstance = require('./CreatorInstance.js');
var EventInstance = require('./EventInstance.js');
var SeriesInstance = require('./SeriesInstance.js');
var ComicInstance = require('./ComicInstance.js')
var SearchResults = require('./SearchResults.js');


// Home Pages Cards
var Card = require('./Card.js');

// Misc
var Footer = require('./Footer.js');
var About = require('./About.js');
var Contribute = require('./Contribute.js');
var ContributeAdd = require('./ContributeAdd.js')
//var AccessAccount = require('./AccessAccount.js');
var ContributeDelete = require('./ContributeDelete.js');
var ContributeEdit = require('./ContributeEdit.js');

import { Button, Navbar } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(Button,'red');

var modelTemplateArray = [];
//Character object format
modelTemplateArray.push({id: null, img: null, name: null, desc: null, 
					 series: null,     events: null,     comics: null, 
					 num_series: null, num_events: null, num_comics: null});

//Event object format
modelTemplateArray.push({id: null, img: null, title: null, desc: null, 
					 series: null,     creators: null,     comics: null,     characters: null, 
					 num_series: null, num_creators: null, num_comics: null, num_characters: null});

//Series object format
modelTemplateArray.push({id: null, img: null, title: null, desc: null, 
					 events: null,     creators: null,     comics: null,     characters: null, 
					 num_events: null, num_creators: null, num_comics: null, num_characters: null});

//Comic object format
modelTemplateArray.push({id: null, img: null, title: null, desc: null, 
					 series: null,     creators: null,     events: null,     characters: null, 
					 num_series: null, num_creators: null, num_events: null, num_characters: null});

//Creator object format
modelTemplateArray.push({id: null, img: null, full_name: null, 
					 series: null,     events: null,     comics: null,    
					 num_series: null, num_events: null, num_comics: null});

class App extends React.Component {
	/*
	constructor(props){
		super(props);
		this.state = {
			username: null
		}

		this.updateUsername = this.updateUsername.bind(this);
	}

	updateUsername(username) {
		this.setState({username: username}, function(){
			console.log(this.state.username);
		});
	}*/

	getModelTemplate(modelType){
		console.log("IN GET MODEL TYPE");
		if(modelType === 'character')
			return modelTemplateArray[0];
		else if(modelType === 'event')
			return modelTemplateArray[1];
		else if(modelType === 'series')
			return modelTemplateArray[2];
		else if(modelType === 'comic')
			return modelTemplateArray[3];
		else if(modelType === 'creator')
			return modelTemplateArray[4];
	}

	render() {
		return (
			<div>
				<style type="text/css">{`
			    .btn-red {
			        background-color: red;
			        color: white;
			    }

			    nav.navbar.navbar-inverse {
			    	background-color: red;
			    	border-radius: 0px;
			    	border: 0px;
			    }

			    .navbar-inverse .navbar-brand {
				    color: white;
				    font-size: 30px;
				}

				.navbar-inverse .navbar-nav>li>a:hover{
					color: black;
				}

			    .navbar-inverse .navbar-nav>li>a {
				    color: #9d9d9d;
				    color: white;
				}

				ul.nav.navbar-nav.navbar-right {
					height: 35px;
				}

				ul.dropdown-menu{
					background-color: red;
				}

				.mark, mark{
					background-color: black;
					padding: 0px;
					color: #e8cc33;
				}

				.well{
			      background-color: black;
			    }

			    .well:hover{
			    	background-color: #252525;
			    }

			    .well:hover mark{
			    	background-color: #252525;
			    }

			    .a, a, a:hover{
			    	color: white;
			    }

			    a:focus {
				    outline-style: none;
				}

				.nav>li>a:focus, .nav>li>a:hover {
				    background-color: red;
				}

				.nav-pills>li.active>a, 
				.nav-pills>li.active>a:focus, 
				.nav-pills>li.active>a:hover {
				    color: white;
				    background-color: red;
				}

				.form-control {
					margin-top: 7px;
				}
				.xs-collapse {
				  display: none;
				  visibility: hidden;
				}

				@media (min-width: 768px) {
				  .xs-toggle {
				    display: none;
				    visibility: hidden;
				  }
				  .xs-collapse {
				    display: block;
				    visibility: visible;
				  }
				}

				@media (min-width: 768px) {
				  .navbar-collapse.collapse {
				    display: flex !important;
				   }
				}	

				@media (min-width: 768px){
					.nav-pills>li>a {
					    background-color: black;
					    border-color: white;
					    border-radius: 0px;
					    border-bottom-right-radius: 20px;
					    border-bottom-left-radius: 20px;
					    border-bottom-style: solid;
					    border-bottom-width: thin;
					    border-left-style: solid;
					    border-right-style: solid;
					    border-right-width: thin;
					    border-left-width: thin;
					}
				}

				@media (max-width: 768px) and (min-width: 200px){
					ul.nav.nav-pills.nav-justified {
				    	margin-top: 0;
				    	margin-bottom: 10px;
				    	display: flex;
				    	flex-wrap: wrap;
				    	justify-content: center;
				}
				

				@media (max-width: 768px) and (min-width: 200px){
					.nav-pills>li>a {
					    background-color: black;
					    border-color: white;
					    border-radius: 0px;
					    border-bottom-right-radius: 20px;
					    border-bottom-left-radius: 20px;
					    border-bottom-style: solid;
					    border-bottom-width: thin;
					    border-left-style: solid;
					    border-right-style: solid;
					    border-right-width: thin;
					    border-left-width: thin;
					}
				}

				

			    `}
			    </style>


				<Router history={history}>
					<div>
						<NavBar /*username={this.state.username}*//>
						<div className="container">
							<Switch>
								<Route exact path='/' component={Home} />
								
								<Route path='/characters' component={Characters} />
								<Route path='/characterInstance/:charID' component={CharacterInstance} />

								<Route path='/comics' component={Comics} />
								<Route path='/comicInstance/:comicID' component={ComicInstance} />

								<Route path='/events' component={Events} />
								<Route path='/eventInstance/:eventID' component={EventInstance} />

								<Route path='/series' component={Series} />
								<Route path='/seriesInstance/:seriesID' component={SeriesInstance} />

								<Route path='/creators' component={Creators} />
								<Route path='/creatorInstance/:creatorID' component={CreatorInstance} />

								<Route path='/about' component={About} />

								<Route path='/searchResults/:searchString' component={SearchResults} />

								{/*<Route path='/accessAccount' render={routeProp => <AccessAccount updateUsername={this.updateUsername}/>} />*/}

								<Route path='/contribute' component={Contribute} />
								<Route path='/contributeAdd/:modelType' 
									   render={routeProp => <ContributeAdd getModelTemplate={this.getModelTemplate} />} />
								<Route path='/contributeDelete/:modelType' 
									   render={routeProp => <ContributeDelete getModelTemplate={this.getModelTemplate} />} />
								<Route path='/contributeEdit/:modelType' 
									   render={routeProp => <ContributeEdit getModelTemplate={this.getModelTemplate} />} />

								<Route render={function() {
									return <p>Page Not Found!</p>
								}} />
							</Switch>
						</div>
						<Footer/>
					</div>
				</Router>
			</div>
		)
	}
}

ReactDOM.render(
<App />, 
document.getElementById('content')
);
