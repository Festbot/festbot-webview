import React, { Component } from 'react'
import styled from 'styled-components'
import wrapper from '../../../helpers/GoogleAPI/GoogleApiComponent.js';

const MapContainer = styled.div`
  height:200px;
`
  
const {Provider,Consumer} = React.createContext(null);

export {Consumer} 

class Map extends Component {
	constructor(props) {
		super(props);
		this.mapRef = React.createRef();
  }
 
  
  componentDidUpdate(prevProps) {
		if (this.props.loaded !== prevProps.loaded) {
			this.initMap();
		}
		if (this.props.pos && this.props.loaded) {
			this.map.setCenter(this.props.pos);
		}
  }
  

  initMap = () => {
		this.map = new this.props.google.maps.Map(this.mapRef.current, {
			center: this.props.pos,
			zoom: 17
    });
    this.forceUpdate()
	};




  render() {

    console.log("[render:this.map]",this.map)
    return <Provider value={{map: this.map,google:this.props.google}}>
      {this.props.children}
      {this.props.loaded&&<MapContainer innerRef={this.mapRef} />}
    </Provider>
    
  }
}

export default wrapper({
		apiKey: 'AIzaSyDTCkVlGg_KCM_MH7WM3Yd-gXlhPhaWvFw'
	})(Map)
