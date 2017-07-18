var React = require('react');
import { Timeline } from 'react-twitter-widgets';
import { Carousel, PageHeader } from 'react-bootstrap';

class Home extends React.Component{
	render(){
		return(
			<div>
			<PageHeader className="text-center" >
				WELCOME TO <br/>
				THE <br/>
				MARVEL DATABASE 
			</PageHeader>
			<Carousel>
			    <Carousel.Item>
			      <img className="center-block" width={900} height={500} alt="900x500" src="http://wallpapercave.com/wp/aZDhA0n.jpg"/>
			    </Carousel.Item>
			    <Carousel.Item animateIn>
			      <img className="center-block" width={900} height={500} alt="900x500" src="http://wallpapercave.com/wp/y5qI6aT.jpg"/>
			    </Carousel.Item>
			    <Carousel.Item>
			      <img className="center-block" width={900} height={500} alt="900x500" src="http://cdn.wallpapersafari.com/45/23/NszuDQ.jpg"/>
			    </Carousel.Item>
			    <Carousel.Item>
			      <img className="center-block" width={900} height={500} alt="900x500" src="http://wallpapercave.com/wp/cpxAd7t.jpg"/>
			    </Carousel.Item>
			    <Carousel.Item>
			      <img className="center-block" width={900} height={500} alt="900x500" src="http://i.imgur.com/j6ELJse.jpg"/>
			    </Carousel.Item>
			</Carousel>
			<br/>
			<br/>
			<br/>
			<br/>
			<div style={{display: 'flex', justifyContent: 'center'}}>
			<Timeline
			    dataSource={{
			      sourceType: 'profile',
			      screenName: 'Marvel'
			    }}
			    options={{
			      username: 'Marvel',
			      height: '1200',
			      width: '900',
			      align: 'center'
			    }}
			    onLoad={() => console.log('Timeline is loaded!')}
			/>
			</div>
			</div>
		)
	}
}

module.exports = Home;