import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'

import VisibilityControl from '../../../hoc/VisibilityControl/VisibilityControl.jsx'

import {getDistance} from '../../../helpers/getDistance.js'
import {getDirection} from '../../../helpers/getDirection.js'
import {deviceOrientationListener,addDeviceOrientationListener,removeDeviceOrientationListener} from '../../../helpers/getCompassData.js'

import { getFestivalPois} from '../../../store/actions/actions.js';

import { deleteItemFromPois } from '../../../helpers/festivalApiHelper.js';

  const DirectionMarker = styled.div`
  position:absolute;
  margin:0 auto;
  top:0;
  left:0;
  right:0;
  bottom:0;
  transform: translateX(${props => props.direction}px);
  height:100%;
  width:3px;
  background-color:red;

  `

  const PoiItem = styled.div`
  margin: 50px;
  
  background-color: white ;

  color: rgb(59, 40, 78);
  border:1px solid rgba(59, 40, 78,0.5);
  
  text-align: center;
  width: 90%;
  margin:10px auto;
  padding: 10px 10px;
  font-size: 110%;
  
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  font-weight: 100;
  cursor: pointer;
  
  `
  
  const LocationInfo = styled.div`
  display:inline-block;  
  float:left;
  }
  `
  const ResetButton = styled.div`
  display:inline-block;  
  float:right;
  
  padding:2px 7px;
  }
  `
  export class PoiContaier extends Component {

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
    console.log(direction)
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



  renderPois = (poi) =>{
   
      return(<PoiItem key={poi._id} ><VisibilityControl always effect="zoom">
        <DirectionMarker direction={this.calculateDirection(this.props.pos.lat,this.props.pos.lng,poi.coordinates.lat, poi.coordinates.lng)} />
        <LocationInfo>{getDistance(this.props.pos.lat,this.props.pos.lng,poi.coordinates.lat, poi.coordinates.lng)}</LocationInfo>
        {poi.name||poi.category}
        <ResetButton onClick={()=>this.deletePoi(`${poi._id}?rev=${poi._rev}`)} >X</ResetButton>
        </VisibilityControl></PoiItem>)
    }

    deletePoi= async (item)=>{
      console.log('[delete]',item)
      await deleteItemFromPois(item)
      await this.props.getFestivalPois(this.props.festival._id)
    }

  render() {
    console.log("[width]",window.innerWidth/2)
    console.log("[POIcontainer]",this.props.pois)
    const {pois} = this.props
    let poiRender=''
    if (pois) {
      poiRender= pois.map(this.renderPois)
    }

    return (
      <div style={{paddingBottom:"60px"}}>
      
        {poiRender}
        
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => {
	return {
		getFestivalPois: festivalId => dispatch(getFestivalPois(festivalId)),
	};
};


export default connect(null, mapDispatchToProps)(PoiContaier)
