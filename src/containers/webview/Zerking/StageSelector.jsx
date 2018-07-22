import React, { Component } from 'react'
import { connect } from 'react-redux';

import styled from 'styled-components'

import {getDistance} from '../../../helpers/getDistance.js'
import { isNull } from 'util';
import { setItemToZerking,getFestivalStages} from '../../../store/actions/actions.js';

import { addItemToVenues } from '../../../helpers/festivalApiHelper.js';

const StageItem = styled.div`
margin: 50px;

background-color:  ${props => props.isZerked ? 'rgb(210,220,210)' : 'white'};  ;



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

&:hover {
  background-color: rgb(189, 150, 158);
}
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

export class StageSelector extends Component {

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
  


  renderStages = (stage) =>{
    if (stage.coordinates.lat) {
      
      return(<StageItem isZerked key={stage.name} >
        <LocationInfo>{getDistance(this.props.pos.lat,this.props.pos.lng,stage.coordinates.lat, stage.coordinates.lng)}</LocationInfo>
        {stage.name}
        <ResetButton onClick={()=>this.resetStageLocation(stage)}>X</ResetButton>
        </StageItem>)
    }

    return (<StageItem onClick={()=>this.setItemToZerking(stage)} key={stage.name}>{stage.name}
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
