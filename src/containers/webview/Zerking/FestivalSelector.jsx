import React, { Component } from 'react'
import { connect } from 'react-redux';

import styled from 'styled-components'

import SearchBar from '../../../ui/SearchBar.jsx';

import {getFestivalByName} from '../../../helpers/festivalApiHelper.js'

import {setFestival} from '../../../store/actions/actions.js'

const FestivalSelectorContainer = styled.div`
  display:flex;
  justify-content:center;
  flex-direction: column;  
`
const FestivalItem = styled.div`
margin: 50px;
background-color: rgb(59, 40, 78);
text-align: center;
width: 90%;
margin:10px auto;
padding: 10px 10px;
font-size: 150%;
color: white;
box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
border-radius: 3px;
font-weight: 100;
cursor: pointer;

&:hover {
  background-color: rgb(189, 0, 08);
}
`
const Dots = styled.div`
width: 10px;
display: inline-block;
float: right;
`
const Dot = styled.div`
height: 5px;
width: 5px;
background-color: #fff;
border-radius: 50%;
margin:3px 2px;
padding:0;

`

export class FestivalSelector extends Component {

  festivalListFilter = async (keyword) =>{

  const festivalList = await getFestivalByName(keyword)

  console.log(festivalList)
  this.festivalListRender = festivalList.map(this.renderFestivalList)
  this.forceUpdate()
  }

  setActiveFestival=(festival)=>{
    this.props.setActiveFestival(festival)
    this.festivalListFilter()
  }


  componentDidMount(){
    this.festivalListFilter()
  }

  renderFestivalList = (festival) =>{
    return(
      <FestivalItem key={festival._id} onClick={()=>this.setActiveFestival(festival)}>
        {festival.name}
      </FestivalItem>
    )
  }

  render() {
    if (!this.props.festival) {
      return  <FestivalSelectorContainer>
      <FestivalItem style={{backgroundColor: "rgb(229, 0, 88)"}}>{`Select Festival`}</FestivalItem>
      <SearchBar searchQueryChanged={this.festivalListFilter} placeholder="Search Festival" />
      {this.festivalListRender}
    </FestivalSelectorContainer>
    }


    return (
      <div>
      <FestivalItem  style={{backgroundColor: "rgb(0, 199, 88)"}}>Add (4) here to {this.props.festival.name}
      <Dots onClick={()=>this.setActiveFestival()}><Dot/><Dot/><Dot/></Dots>
      </FestivalItem>
       
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
	return {
		setActiveFestival: festival => dispatch(setFestival(festival)),
	};
};

export default connect(null, mapDispatchToProps)(FestivalSelector);
