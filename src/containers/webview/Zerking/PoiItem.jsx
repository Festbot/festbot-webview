import React, { Component } from 'react'

import { connect } from 'react-redux';
import styled from 'styled-components'

import {icons} from './mapIcons.js'
import Hammer from 'hammerjs'

import VisibilityControl from '../../../hoc/VisibilityControl/VisibilityControl.jsx'

import Navigation from './Navigation.jsx'

import {getDistance} from '../../../helpers/getDistance.js'

import { getFestivalPois} from '../../../store/actions/actions.js';

import { deleteItemFromPois } from '../../../helpers/festivalApiHelper.js';
import { create } from 'domain';

 const  MapIcon = styled.img`
 position: relative;
  padding-left:5px;
  width:32px;
  height:32px;
 
 `
  const DeleteButton = styled.div `
  position: absolute;
  right:10px;
 
  width:80px;
  background-color:red;
  margin:5px;
  text-align:center;
  font-size:120%;
  color:white;
  padding:11px 0;
  border-radius:2px;
  `

  const Poi = styled.div`
  position:relative;
  margin: 50px;
  
  background-color: white ;

  color: rgb(59, 40, 78);
  border:1px solid rgba(59, 40, 78,0.5);
  
  text-align: center;
  width: 90%;
  margin:10px auto;
  padding: 10px 10px;
  font-size: 120%;
  
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  font-weight: 100;
  cursor: pointer;
  transition: all 0.3s ease-out;

  transform: translateX(${props => props.swiped? -100:0}px);
  z-index:2;
  
  `

const Flexbox = styled.div `
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
  margin:0 5px;
  font-size:90%;
  
  `
  
  const ResetButton = styled.div`
  display:inline-block;  
  position: relative;
  right:10px;
  
  `



export class PoiItem extends Component {
constructor(props){
  super(props);
  this.itemRef = React.createRef();
}

  state={
    heading:0,
    swiped:0
  }


  componentDidMount() {
    this.mc = new Hammer(this.itemRef.current)
    
    this.mc.on("swipeleft", ()=>{
      this.setState({swiped:this.itemRef.current.id})
    })
    this.mc.on("swiperight", ()=>{
      this.setState({swiped:0})

    })
}

  componentWillUnmount(){
    this.mc.off("swipeleft")
    this.mc.off("swiperight")
  }


  addSwipe=(e)=> {
    console.log(e)
    const mc = new Hammer(e)
    mc.on("swipeleft", ()=>{
      this.setState({swiped:mc.element.id})
    })
    mc.on("swiperight", ()=>{
      this.setState({swiped:0})
    })
  }




  deletePoi= async (item)=>{

    await deleteItemFromPois(item)
    await this.props.getFestivalPois(this.props.festivalId)
  }



  render() {
    const {poi} = this.props
      const iconType= poi.category
      let iconCategory=''

      if (icons[iconType]) {iconCategory = iconType} else { iconCategory ='default' }

      const iconUrl = icons[iconCategory].icon
      const isSwiped = (this.state.swiped==poi._id)


    return (
     
      <div style={{position: 'relative'}}  >
      <DeleteButton onClick={()=>this.deletePoi(`${poi._id}?rev=${poi._rev}`)}>Delete</DeleteButton>
        <Poi innerRef={this.itemRef} swiped={isSwiped} id={poi._id} >
          <Navigation  poi={poi} pos={this.props.pos} />
          <VisibilityControl always effect="zoom">
            <Flexbox>
              <MapIcon src={iconUrl}/>
              <PoiTitle>{poi.name||poi.category}</PoiTitle>
              <LocationInfo>{getDistance(this.props.pos.lat,this.props.pos.lng,poi.coordinates.lat, poi.coordinates.lng)}</LocationInfo>
            </Flexbox>
        </VisibilityControl></Poi>
      </div>

    )
  }
}

export default PoiItem
