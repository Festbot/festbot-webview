import React, { Component } from 'react'
import store from '../../../store/store.js'
import {updateMyPosition} from '../../../store/actions'
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
      navigator.geolocation.getCurrentPosition(this.geo_success,this.geo_error)
    }
  
  
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
  
	geo_success = position => {
    store.dispatch(updateMyPosition(
      {
          lat: position.coords.latitude,
			    lng: position.coords.longitude
        }
    ))

	};
  
    geo_error(err) {
      alert('error:'+err.message);
    }
  
    render() {

      return  <WrappedComponent {...this.props}  />
    }
  }
  
return setGeolocation

}

export default geolocationWrapper;
