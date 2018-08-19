import React, { Component } from 'react'
import { connect } from 'react-redux';

import styled from 'styled-components'

import VisibilityControl from '../../../hoc/VisibilityControl/VisibilityControl.jsx'

import {getDistance} from '../../../helpers/getDistance.js'

import Navigation from './Navigation.jsx'

import { setItemToZerking,getFestivalStages} from '../../../store/actions';

import { addItemToVenues } from '../../../helpers/festivalApiHelper.js';

import headingWrapper from '../../../hoc/headingWrapper.jsx';


const StageItem = styled.div`
position:relative;
margin: 50px;

background-color:  ${props => props.isZerked ? 'rgb(22,22,22)' : 'rgb(150,22,22)'};  ;

color: #ddd;


text-align: center;
width: 90%;
margin:10px auto;
padding: 15px 10px;
font-size: 110%;


border-radius: 3px;
font-weight: 100;
cursor: pointer;
display:flex;
justify-content:space-between;
align-items:center;
`
const PoiTitle = styled.div`
width:70%;
margin:0 auto;
`

const LocationInfo = styled.div`
display:inline-block;  
position: relative;

font-size:90%;
font-weight:bold;
`

const ResetButton = styled.div`
display:inline-block;  
position: relative;
right:10px;

`

export class StageSelector extends Component {
constructor(props){
  super(props)
  this.NavigationMarker = headingWrapper(Navigation);

}
  state={
    selectedItem:''
  }

  setItemToZerking=(e)=>{
    const item = {
      ...e,
      coordinates:{
        lat: this.props.pos.lat,
        lng: this.props.pos.lng
      }
    }

    this.props.setItemToZerking([item])
  }
	
  resetStageLocation = async (e) => {
    

    const item = {
      ...e,
      coordinates:{
        lat: null,
        lng: null
      }
    }
    await addItemToVenues(item)
    this.props.getFestivalStages(this.props.activeFestival._id)
  }
  
  distance = (d) => {
    let distance
    distance=`${d.toFixed()}m`
    if (d>1999) {distance= `${(d/1000).toFixed(2)}km`}
    if (d>9999) {distance= `${(d/1000).toFixed()}km`}
    return distance
  }

  renderStages = (stage) =>{
    const NavigationWithHeading = this.NavigationMarker;
    if (stage.coordinates.lat) {
      return(<StageItem isZerked key={stage.name} >

        
        {this.props.pos&&<LocationInfo>{this.distance(getDistance(this.props.pos.lat,this.props.pos.lng,stage.coordinates.lat, stage.coordinates.lng))}</LocationInfo>}
        <PoiTitle>{stage.name}</PoiTitle>
        <ResetButton onClick={()=>this.resetStageLocation(stage)}>X</ResetButton>
        {this.props.pos&&<NavigationWithHeading  poi={stage} pos={this.props.pos} />}
        </StageItem>
        )
    }

    return (<StageItem onClick={()=>this.setItemToZerking(stage)} key={stage.name}>
    <PoiTitle>{stage.name}</PoiTitle>
      <ResetButton>+</ResetButton>
      
      </StageItem>)
  }


  render() {
    
    const {stages} = this.props
    let stageRender=''
    if (this.props.stages) {
      stageRender= stages.map(this.renderStages)
    }

    return (
      <div>
        {stageRender}
      </div>
    )
  }
}

const mapStateToProps = ({zerking}) => {
	return {
		activeFestival: zerking.activeFestival,
	};
};

const mapDispatchToProps = dispatch => {
	return {
    setItemToZerking: item => dispatch(setItemToZerking(item)),
    getFestivalStages: festivalId => dispatch(getFestivalStages(festivalId)),
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(StageSelector)
