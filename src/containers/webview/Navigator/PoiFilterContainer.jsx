import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
background-color: #eee;
background-size: cover;
  background-position: center center;
min-height:150px;
background: #00b7ea; /* Old browsers */
background: -moz-linear-gradient(top, #00b7ea 0%, #bbdee8 47%, #bbdee8 55%, #212121 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, #00b7ea 0%,#bbdee8 47%,#bbdee8 55%,#212121 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, #00b7ea 0%,#bbdee8 47%,#bbdee8 55%,#212121 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b7ea', endColorstr='#212121',GradientType=0 );
`


export class PoiFilterContainer extends Component {


  render() {

    return (
      <Container >
      {this.props.children}
      </Container>
    )
  }
}

export default PoiFilterContainer
