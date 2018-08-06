import React, { Component } from 'react'
import { connect } from 'react-redux';

import PoiItem from './PoiItem.jsx'

import { getFestivalPois} from '../../../store/actions';

  export class PoiContaier extends Component {

    state={
      heading:0
    }


  render() {

    const {pois,pos,festival,readOnly=false} = this.props
    let poiRender=''
    if (pois) {
      poiRender= pois.map(poi =><PoiItem readOnly={readOnly} poi={poi} pos={pos} deletePoi={this.deletePoi} festivalId={festival._id} key={poi._id} getFestivalPois={this.props.getFestivalPois}/>)
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
