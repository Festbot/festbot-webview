import React, { Component } from 'react'
import { connect } from 'react-redux';

import styled from 'styled-components'


import {getDistance} from '../../../helpers/getDistance.js'
import { isNull } from 'util';
import { addItemToZerking, removeItemToZerking, getFestivalPois} from '../../../store/actions/actions.js';

import { addItemToVenues } from '../../../helpers/festivalApiHelper.js';


const PoiItem = styled.div`
text-align: center;
background-color:  ${props => props.isToggledForZerkig ? 'rgb(210,220,210)' : 'white'};  ;
color: rgb(59, 40, 78);
border:1px solid rgba(59, 40, 78,0.5);
margin:10px;
padding: 10px 10px;
font-size: 110%;

box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.5);
border-radius: 3px;
font-weight: 100;
cursor: pointer;
flex: 1 auto;

`
const PoiContainer= styled.div`
display:flex;
overflow:hidden;
flex-wrap: wrap;

align-content:stretch;
`


export class PoiSelector extends Component {



  setItemToZerking=  (e)=>{
    if (this.isToggledForZerkig(e.key)){
      this.props.removeItemToZerking(e.key)
      console.log('[removePOI]',e.key)
      return
    }

    const item = {
      category: e.key,
      name:e.name,
      festivalId: this.props.festival._id,
      coordinates:{
        lat: this.props.pos.lat,
        lng: this.props.pos.lng
      }
    }
    console.log('[newPOI]',item)
    this.props.addItemToZerking([item])

    return
  }

  isToggledForZerkig=(category)=>{
    let matchedItem =''
    matchedItem = this.props.itemsToZerking.filter(poi=>{
      return (poi.category == category)
    })
    return (matchedItem.length >0)
  }

  renderPoi = (poiType) =>{

    return (
      <PoiItem isToggledForZerkig={this.isToggledForZerkig(poiType.key)} onClick={()=>this.setItemToZerking(poiType)} key={poiType.key}>
        {poiType.name}
      </PoiItem>)
  }


  render() {
    const {poiTypes} = this.props
    let poiRender=''
    if (this.props.poiTypes) {
      poiRender= poiTypes.map(this.renderPoi)
    }

    return (
      <PoiContainer>
        {poiRender}
      </PoiContainer>
    )
  }
}

const mapStateToProps = ({zerking}) => {
	return {
    activeFestival: zerking.activeFestival,
    itemsToZerking: zerking.itemsToZerking,
	};
};

const mapDispatchToProps = dispatch => {
	return {
    addItemToZerking: item => dispatch(addItemToZerking(item)),
    removeItemToZerking: category => dispatch(removeItemToZerking(category)),
    getFestivalPois: festivalId => dispatch(getFestivalPois(festivalId)),
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(PoiSelector)
