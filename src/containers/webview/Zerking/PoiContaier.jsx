import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'

import {icons} from './mapIcons.js'

import VisibilityControl from '../../../hoc/VisibilityControl/VisibilityControl.jsx'

import PoiItem from './PoiItem.jsx'

import {getDistance} from '../../../helpers/getDistance.js'

import { getFestivalPois} from '../../../store/actions/actions.js';

import { deleteItemFromPois } from '../../../helpers/festivalApiHelper.js';


 
  export class PoiContaier extends Component {

    state={
      heading:0
    }



  render() {

    const {pois,pos,festival} = this.props
    let poiRender=''
    if (pois) {
      poiRender= pois.map(poi =><PoiItem poi={poi} pos={pos} deletePoi={this.deletePoi} festivalId={festival._id} key={poi._id} getFestivalPois={this.props.getFestivalPois}/>)
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
