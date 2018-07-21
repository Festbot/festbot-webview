import React, { Component } from 'react'

const geo_options = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000
};

export const geolocationWrapper = (WrappedComponent) => {

   class setGeolocation extends Component {
  
    state = {
      pos:{
        lat: '',
        lng: ''
      }
    };

    
    componentDidMount() {
      const watchID = navigator.geolocation.watchPosition(this.geo_success, this.geo_error, geo_options);
    }
  
  
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
  
	geo_success = position => {
		this.setState({pos:{lat: position.coords.latitude,
			lng: position.coords.longitude}
    });
	};
  
    geo_error(err) {
      alert('error:', err.message);
    }
  
    render() {

      return  <WrappedComponent {...this.props} pos={this.state.pos} />
    }
  }
  
return setGeolocation

}

export default geolocationWrapper;
