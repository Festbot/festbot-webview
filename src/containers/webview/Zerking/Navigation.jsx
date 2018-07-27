import React, { Component } from 'react'
import styled from 'styled-components'
import {getDirection} from '../../../helpers/getDirection.js'
import {deviceOrientationListener,addDeviceOrientationListener,removeDeviceOrientationListener} from '../../../helpers/getCompassData.js'

const CenterMarker = styled.div`
  position:absolute;
  margin:0 auto;
  top:0;
  left:0;
  right:0;
  bottom:0;
 
  height:15%;
  width:2px;
  background-color:rgba(20,20,20,0.4);
  `
const DirectionMarker = styled.div `
position:absolute;
margin:0 auto;
top:0px;
left:0;
right:0;
bottom:0;
width: 0; 
height: 0; 
border-left: 9px solid transparent;
border-right: 9px solid transparent;
transform: translateX(${props => props.direction}px);

border-top: 9px solid rgba(30,30,200,0.6);
`


export class Navigation extends Component {

  state={
    heading:0
  }

  componentDidMount(){
    addDeviceOrientationListener(this.getCompassData)
  }

  componentWillUnmount() {
    removeDeviceOrientationListener(this.getCompassData)
  }

  getCompassData =(event)=>{
    const direction = deviceOrientationListener(event)
    
    this.setState({heading:direction})
  }

  calculateDirection = (lat1,lng1,lat2,lng2) => {
    const direction= getDirection(lat1,lng1,lat2,lng2)
    const compass = this.state.heading
    // ne kerdezd miert de igy lehet kiszamolni, h merre kell menni
    let x = (compass-direction)
    if(direction>compass) {x=-x}
    if (x>180) {x=x-360}
    if((compass-direction)>0) {x=-x}

    const unit=(window.innerWidth*0.8)/360
    x = unit*x
    return x.toFixed()
  }



  render() {
    const {poi,pos} = this.props

    if (!poi) {return}

    return (
      <div>
        <CenterMarker/>
        <DirectionMarker direction={this.calculateDirection(pos.lat,pos.lng,poi.coordinates.lat, poi.coordinates.lng)} />
      </div>
    )
  }
}

export default Navigation
