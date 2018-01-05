var React = require('react');
import { Grid, Row, Col } from 'react-bootstrap';

class About extends React.Component{
	render(){
		return(
			<div>
			<br/>

			    {/* Introduction Row */}
			    <div className="row">
			        <div className="col-lg-12">
			            <h1 className="page-header">About Us and Our Site</h1>
			            <ul>
			                <li style={{'fontSize': '25px'}}>Site Description:
			                    <p style={{'fontSize': '20px'}}> Marveldb.net is an immersion into the Marvel universe, allowing visitors to 
			                        search for and view popular characters, events, comics, series, and creators from the Marvel franchise.</p>
			                </li>
			                <li style={{'fontSize': '25px'}}><a href="https://m.box.com/shared_item/https%3A%2F%2Futexas.box.com%2Fs%2Fxnmzrkxwr7u1bn33zjw6f8bt1e4q50wg">Technical Report</a></li>
			            </ul>
			        </div>
			    </div>

			    {/*<!-- Team Members Row -->*/}
			    <div className="row">

			        <div className="col-lg-12">
			            <h2 className="page-header">Fantastic Four</h2>
			        </div>

			        <div className="col-lg-6 col-sm-6 text-left">
			            <img className="img-rounded center-block img-responsive" style={{'height': '300px', 'width': '300px'}} src="https://deancarpenter17.github.io/images/github_blog_pic_300x300.jpg" alt="Dean Carpenter"/>
			            <h2 className="text-center page-header">Dean Carpenter</h2>
			            <ul style={{'fontSize': '20px'}}>
			                <li>BIO: 
			                    <p>Dean Carpenter was formerly an Aviation Electronics Technician for the United States Navy 
							        prior to joining the University of Texas. He enjoys mobile development, biking, 
							        and sports. He will be graduating in Spring 2019 with a B.S. in Computer Science.</p>
			                </li>
			                <li>RESPONSIBILITIES:
			                    <p>React, Javascript, Flask, AWS, Apache, Scraping data using Python & Ajax</p>
			                </li>
			                <li>NO. OF COMMITS: 117</li>
			                <li>NO. OF ISSUES: 42</li>
			                <li>NO. OF UNIT TESTS: 0</li>
			            </ul>
			        </div>

			        <div className="col-lg-6 col-sm-6 text-left">
			            <img className="img-rounded center-block img-responsive" style={{'height': '300px', 'width': '300px'}} src="https://saketksingh.files.wordpress.com/2017/12/me_6_4_2017_cropped1.jpg" alt="Somi Singh"/>
			            <h2 className="text-center page-header">Somi Singh</h2>
			            <ul style={{'fontSize': '20px'}}>
			                <li>BIO: 
			                    <p>Somi Singh previously worked as a Systems Administrator and IT Consultant for businesses in the Austin area.  His current interests include databases, operating systems and mobile development.  He will be graduating in December 2018 with a B.S. in Computer Science.</p>
			                </li>
			                <li>RESPONSIBILITIES:
			                    <p>Backend and DevOps: PostgreSQL, SQLAlchemy, AWS, TravisCI, Flask, Flask-Restless, RestfulAPI</p>
			                </li>
			                <li>NO. OF COMMITS: 111</li>
			                <li>NO. OF ISSUES: 35</li>
			                <li>NO. OF UNIT TESTS: 15</li>
			            </ul>
			        </div>

			    </div>

			    <div className="row">

			        <div className="col-lg-6 col-sm-6 text-left">
			            <img className="img-rounded center-block img-responsive" style={{'height': '300px', 'width': '300px'}} src="https://image.ibb.co/kc8jsk/img_7926_1024_2.png" alt="Edmond Amataj"/>
			            <h2 className="text-center page-header">Edmond Amataj</h2>
			            <ul style={{'fontSize': '20px'}}>
			                <li>BIO: 
			                    <p>Edmond Amataj is pursuing a B.S. in Computer science and will be graduating in the Fall of 2018. He hopes to land a career in the financial field upon graduating. His main interests consist of the stock market, basketball, and iOS development.</p>
			                </li>
			                <li>RESPONSIBILITIES:
			                    <p>Apiary, RESTful API, back-end, database</p>
			                </li>
			                <li>NO. OF COMMITS: 48</li>
			                <li>NO. OF ISSUES: 27</li>
			                <li>NO. OF UNIT TESTS: 15</li>
			            </ul>
			        </div>
			        
			        <div className="col-lg-6 col-sm-6 text-left">
			            <img className="img-rounded center-block img-responsive" style={{'height': '300px', 'width': '300px'}} src="https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-9/12345624_10205497379447040_1232983485444624284_n.jpg?oh=86c39e86fef22f2fcb9e3ae24bd559a0&oe=59DB106A" alt="Paul Davis"/>
			            <h2 className="text-center page-header">Paul Davis</h2>
			            <ul style={{'fontSize': '20px'}}>
			                <li>BIO: 
			                    <p>Paul Davis just returned from taking a year off of school to work in the Technical Theater industry. He is currently attending the University of Texas at Austin pursuing a B.S. in Computer Science. He hopes to graduate by December 2018. Hobbies include League of Legends, Netflix, and other sedentary activities.</p>
			                </li>
			                <li>RESPONSIBILITIES:
			                    <p>Front End Development using React, HTML/CSS/Javascript, BootStrap</p>
			                </li>
			                <li>NO. OF COMMITS: 130</li>
			                <li>NO. OF ISSUES: 45</li>
			                <li>NO. OF UNIT TESTS: 0</li>
			            </ul>
			        </div>

			    </div>

			    <div className="row">
			        <div className="col-lg-12">
			            <h2 className="page-header">General Statistics and Information</h2>
			    	</div>
				    <br/>
				    <ul className="nav nav-pills nav-justified" style={{'fontSize': '25px'}}>
				        <li className="active"><a data-toggle="pill" href="#stats">STATS</a></li>
				        <li><a data-toggle="pill" href="#data">DATA</a></li>
				        <li><a data-toggle="pill" href="#tools">TOOLS</a></li>
				    </ul>

				    <div id="thumbnail" className="tab-content">
				        <div id="stats" className="tab-pane fade in active">
				            <div className="row">
				                <br/>
				                <ul style={{'fontSize': '22px'}}>
				                    <li>TOTAL NO. OF COMMITS: 578</li>
				                    <li>TOTAL NO. OF ISSUES: 89</li>
				                    <li>TOTAL NO. OF UNIT TESTS: 15</li>
				                    <li><a href="http://docs.cs373n.apiary.io/#">APIARY API</a></li>
				                    <li><a href="https://github.com/cs373n/idb">GITHUB REPO</a></li>
				                    <li><a href="https://trello.com/b/tpLlxzNl/fantastic-four">TRELLO</a></li>
				                    <li><a href="https://travis-ci.org/cs373n/idb">Travis CI</a></li>
				                </ul>
				            </div>
				        </div>
				        <div id="data" className="tab-pane fade">
				            <div className="row">
				                <br/>
				                <ul style={{'fontSize': '22px'}}>
				                    <li>DATA SOURCES: 
				                        <ol>
				                            <li><a href="https://developer.marvel.com/docs">https://developer.marvel.com/docs</a></li>
				                            <li><a href="https://comicvine.gamespot.com/api/documentation">https://comicvine.gamespot.com/api/documentation</a></li> 
				                        </ol>
				                    </li>
				                    <li>SCRAPING DESCRIPTION:
				                    <p>The official Marvel API provides interactive API test calls in the client side browser.</p>
				                    </li>
				                </ul>
				            </div>
				        </div>
				        <div id="tools" className="tab-pane fade">
				                <div className="row">
				                    <br/>
				                    <ul style={{'fontSize': '22px'}}>
				                        <li>TOOLS USED: AWS, Apache, Flask, Bootstrap, React, Slack, Trello, Planitpoker, Git, Postman</li>
				                        <li>TOOL USE: Refer to our technical writeup</li>
				                        <li>OPTIONAL TOOLS: Webpack, Babel, React-Bootstrap, Flask-Restless</li>
				                    </ul>
				                </div>
				        </div>
				    </div>
				</div>
			</div>			
		)
	}
}

module.exports = About;
