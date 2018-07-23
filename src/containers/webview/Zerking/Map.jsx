import React, { Component } from 'react'
import styled from 'styled-components'
import wrapper from '../../../helpers/GoogleAPI/GoogleApiComponent.js';

const MapContainer = styled.div`
	height:200px;
`
	
const MapCrosshair = styled.div`
	margin:0 auto;
	position:absolute;
	top:30px;
	right:0;
	left:0;
	right0;
	background-color:rgba(222,120,120,0.2);
	width:140px;
	height:140px;
	border-radius:50%;
`
const VerticalLine = styled.div`
	height:140px;
	width:1px;
	background-color:rgba(0,0,120,0.3);
	margin:0 auto;
`
const HorizontalLine = styled.div`
position:relative;
top:-70px;
	height:1px;
	width:140px;
	background-color:rgba(0,0,120,0.3);
	margin: auto 0;
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

  
    return <Provider value={{map: this.map,google:this.props.google}}>
			{this.props.children}
			
			{this.props.loaded&&<div><MapContainer innerRef={this.mapRef} />
			<MapCrosshair><VerticalLine></VerticalLine><HorizontalLine></HorizontalLine></MapCrosshair></div>}
    </Provider>
    
  }
}

export default wrapper({
		apiKey: 'AIzaSyDTCkVlGg_KCM_MH7WM3Yd-gXlhPhaWvFw'
	})(Map)
