import React, { Component } from 'react';

import classes from './ZerkingContainer.css';
import { Helmet } from 'react-helmet';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const geo_options = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000
};
const mapContainer = {
	width: '100%',
	height: '200px'
};

export class ZerkingContainer extends Component {
	state = {
		lat: '',
		lng: ''
	};

	componentDidMount() {
		const watchID = navigator.geolocation.watchPosition(this.geo_success, this.geo_error, geo_options);
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	geo_success = position => {
		this.setState({
			lat: position.coords.latitude,
			lng: position.coords.longitude
		});
	};

	geo_error(err) {
		alert('error:', err.message);
	}



	render() {
		return (
			<div>
				<Helmet>
					<title>Zerking</title>
				</Helmet>
        {this.state.lat && (
					<Map style={mapContainer} google={this.props.google} center={{ lat: this.state.lat, lng: this.state.lng }} zoom={17}>
						<Marker name={'Your position'} position={{ lat: this.state.lat, lng: this.state.lng }} />
						<Marker />
					</Map>
        )}
        
		
        
        <div className={classes.container}>
        
        <div className={classes.button}>{`Add this`}</div>
        
        
        
        </div>

			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDTCkVlGg_KCM_MH7WM3Yd-gXlhPhaWvFw'
})(ZerkingContainer);
