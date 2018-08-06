import React, { Component } from 'react'
import styled from 'styled-components'


import { foodTypes, drinkTypes, serviceTypes } from '../Zerking/poiTypes.js';

const Container = styled.div`
background-color: #eee;
background-size: cover;
  background-position: center center;
min-height:150px;
`


export class PoiFilterContainer extends Component {


  render() {

    return (
      <Container style={{ backgroundImage: this.props.coverPhoto ? 'url(https://ucarecdn.com/' + this.props.coverPhoto + '/)' : 'none' }}>
      {this.props.children}
      </Container>
    )
  }
}

export default PoiFilterContainer
