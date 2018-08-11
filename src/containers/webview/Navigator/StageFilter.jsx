import React, { Component } from 'react'
import { connect } from 'react-redux';

import styled from 'styled-components'

import {icons} from '../Zerking/mapIcons.js'


import { addStageToFiltering, removeStageFromFilter} from '../../../store/actions';

import { addItemToVenues } from '../../../helpers/festivalApiHelper.js';

const  MapIcon = styled.img`
position: relative;
 width:32px;
 height:32px;
 margin:0 auto;
`

const MapIconTitle = styled.div`
padding-top:5px;
font-size:90%;
margin:0 auto;
width:80px;
overflow-x:scroll;


`

const PoiItem = styled.div`
text-align: center;
background-color:  ${props => props.isToggledForFiltering ? 'rgb(80,100,0)' : 'rgba(22,22,22,0.9)'};  ;
color: rgb(59, 40, 78);
color:#ddd;

margin:8px 10px;
padding: 8px 8px;
box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.5);
border-radius: 3px;
font-weight: 100;
cursor: pointer;
flex: 1 auto;
display:flex;
flex-direction:column;
alig-items:ceter;

`
const PoiContainer= styled.div`
display:flex;
overflow:hidden;
flex-wrap: wrap;

align-content:stretch;
`


export class StageFilter extends Component {


  setStageToFilter=  (e,stage)=>{
    console.log("[POI ITEM]",stage)
    e.stopPropagation()
    if (this.isToggledForFiltering(stage._id)){
      this.props.removeStageFromFilter(stage._id)
      return
    }


    this.props.addStageToFiltering([stage])

    return
  }

  isToggledForFiltering=(id)=>{
    let matchedItem =''
    matchedItem = this.props.stagesToFiltering.filter(poi=>{
      return (poi._id == id)
    })
    return (matchedItem.length >0)
  }

  renderPoi = (stage) =>{
    
    const iconType= stage.category
      let iconCategory=''
      if (icons[iconType]) {iconCategory = iconType} else { iconCategory ='default' }
      const iconUrl = icons[iconCategory].icon
      
    return (
      <PoiItem isToggledForFiltering={this.isToggledForFiltering(stage._id)} onClick={(e)=>this.setStageToFilter(e,stage)} key={stage._id}>
      <MapIcon src={iconUrl}/><MapIconTitle>{stage.name}</MapIconTitle>

      </PoiItem>)
  }


  render() {
    const {stages} = this.props
    let poiRender=''
    if (this.props.stages) {
      poiRender= stages.map(this.renderPoi)
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
    stagesToFiltering: zerking.stagesToFiltering,
	};
};

const mapDispatchToProps = dispatch => {
	return {
    addStageToFiltering: id => dispatch(addStageToFiltering(id)),
    removeStageFromFilter: id => dispatch(removeStageFromFilter(id)),
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(StageFilter)
