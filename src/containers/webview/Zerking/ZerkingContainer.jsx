import React, { Component } from 'react'

import classes from './ZerkingContainer.css'

const geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

export class ZerkingContainer extends Component {
  state={
    lat:'',
    lng:''
  }

  componentDidMount(){

    const watchID = navigator.geolocation.watchPosition(this.geo_success, this.geo_error, geo_options);

  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID);
  }

   geo_success = (position) => {
    this.setState({
      lat:position.coords.latitude, lng:position.coords.longitude
    }) 
  }
  
   geo_error(err) {
   console.log(err)
    alert("error:",err.message);
  }
  

  


  render() {



    return (
      <div>
        Location: {this.state.lat} lng:{this.state.lng}

         {this.state.lat&&
          <div className="classes.mapContainer">
          <div>
          </div>
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.lat},${this.state.lng}&zoom=18&size=300x300&sensor=false&key=AIzaSyDTCkVlGg_KCM_MH7WM3Yd-gXlhPhaWvFw`} />
          </div>
        } 

      </div>
    )
  }
}

export default ZerkingContainer
