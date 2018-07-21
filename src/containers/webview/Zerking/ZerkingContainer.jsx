import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ZerkingContainer.css';
import { Helmet } from 'react-helmet';

import geolocationWrapper from './setGeolocation.js';
import Map from './Map.jsx'
import Marker from './Marker.jsx'
import FestivalSelector from './FestivalSelector.jsx'


import {setFestival} from '../../../store/actions/actions.js'

export class ZerkingContainer extends Component {

	componentDidMount() {}

	

	componentWillUnmount() {}



	render() {
    
    console.log("[active]",this.props.activeFestival)

		// var beaches = [
		// 	['Bondi Beach', -33.890542, 151.274856, 4],
		// 	['Coogee Beach', -33.923036, 151.259052, 5],
		// 	['Cronulla Beach', -34.028249, 151.157507, 3],
		// 	['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
		// 	['Maroubra Beach', -33.950198, 151.259302, 1]
		// ];

		// var image = {
		// 	url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
		// 	// This marker is 20 pixels wide by 32 pixels high.
		// 	size: new google.maps.Size(20, 32),

		// 	// The origin for this image is (0, 0).
		// 	origin: new google.maps.Point(0, 0),
		// 	// The anchor for this image is the base of the flagpole at (0, 32).
		// 	anchor: new google.maps.Point(0, 32)
		// };

		// var shape = {
		// 	coords: [1, 1, 1, 20, 18, 20, 18, 1],
		// 	type: 'poly'
		// };

		// const poi = beaches.map(beach => {
			// return (
			//   <Marker position={{lat: beach[1], lng: beach[2]}} icon={image} title={beach[0]}></Marker>
			// )
		// });





		return (
			<div>
				<Helmet>
					<title>Zerking</title>
				</Helmet>

        <Map pos={this.props.pos}>
          <Marker pos={this.props.pos} iconType="arrow"/>
          <Marker pos={{lat: 31.231416,lng: 121.483701}}/>
          <Marker pos={{lat: 31.231416,lng: 121.573701}}/>
        </Map>
        
        
        
        <div className={classes.container}>
        <FestivalSelector festival={this.props.activeFestival}/>
        <div className={classes.button}>{`Add Stage`}</div>
					<div className={classes.button}>{`Add Food`}</div>
					<div className={classes.button}>{`Add Drinks`}</div>
					<div className={classes.button}>{`Add Service`}</div>
					<div className={classes.button}>{`Add this`}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({zerking}) => {
	return {
		activeFestival: zerking.activeFestival,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setActiveFestival: festival => dispatch(setFestival(festival)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(geolocationWrapper(ZerkingContainer));

