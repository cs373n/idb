var React = require('react');
import { Timeline } from 'react-twitter-widgets'

class Home extends React.Component{
	render(){
		return(
			<div className='container'>
			<Timeline
			    dataSource={{
			      sourceType: 'profile',
			      screenName: 'Marvel'
			    }}
			    options={{
			      username: 'Marvel',
			      height: '600',
			      width: '300'
			    }}
			    onLoad={() => console.log('Timeline is loaded!')}
			/>
			</div>
		)
	}
}

module.exports = Home;