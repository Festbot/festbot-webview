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

  render() {
    const {pos,iconType="info"} = this.props

    return (
        
        <Consumer>
        {({map,google})=>{if (map&&iconType) {
          console.log(icons[iconType].icon)

          new google.maps.Marker({
            position: pos,
            map: map,
            icon:icons[iconType].icon
          });
        }}}
        </Consumer>

    )
  }
}

export default Marker
