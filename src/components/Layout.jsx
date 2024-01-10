import React from 'react'
// import PropTypes from 'prop-types'
// import Helmet from 'react-helmet'

import Activity from './activity.tsx'
import './Layout.css'
import { GetGlobalActivityStore } from './activityStore.tsx';
import coin from '../images/coin.png';
import { Helmet } from 'react-helmet';
import { ParallaxProvider } from 'react-scroll-parallax';

class Layout extends React.Component {
	render() {
		let { children } = this.props;
		return (
		  <ParallaxProvider>
		    <Helmet
		      title="Nate Parrott’s Nice and Engaging Website"
		      meta={[
		        { name: 'description', content: '' },
		        { name: 'keywords', content: '' },
		      ]}
		    />
			<Helmet>
  				<link rel="icon" type="image/png" href={coin} />
			</Helmet>
		    <div className='content'>
		      {children}
				<Activity activityStore={GetGlobalActivityStore()} />
		    </div>
		  </ParallaxProvider>
		)
	}
}

export default Layout
