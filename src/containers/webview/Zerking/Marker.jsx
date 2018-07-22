import React, { Component } from 'react'
import {Consumer} from './Map.jsx'

const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  
const icons = {
parking: {
  icon: iconBase + 'parking_lot_maps.png'
},
library: {
  icon: iconBase + 'library_maps.png'
},
info: {
  icon: iconBase + 'info-i_maps.png'
},
arrow: {
  icon: iconBase + 'cross-hairs_highlight.png'
}
};

export class Marker extends Component {

  componentWillUnmount(){

    this.setMapMarker(null,google)

  }

  setMapMarker=(map,google)=>{

    const {pos,iconType="info"} = this.props

     this.marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon:icons[iconType].icon
    });
  }

  render() {
    const {pos,iconType="info"} = this.props

    return (
        
        <Consumer>
        {({map,google})=>{if (map&&iconType) {
          this.setMapMarker(map,google)
        }}}
        </Consumer>

    )
  }
}

export default Marker
