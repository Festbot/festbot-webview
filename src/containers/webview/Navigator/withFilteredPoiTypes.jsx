import React, { Component } from 'react'
import * as Ramda from 'ramda';

export const withFilteredPoiTypes =(WrappedComponent) => {

  class filterPoiTypesByFestivalPois extends Component {


    groupByCategory=(pois)=>{
      const categories = Ramda.groupBy(poi=>{
        return poi.category
      });
      return categories(pois);
    }


    groupByKey=(pois)=>{
      const categories = Ramda.groupBy(poi=>{
        return poi.key
      });
      return categories(pois);
    }

    filterPoiTypes=()=>{
      const filteredPoiTypes=this.filterByFestivalPoisZerked(this.props.poiTypes)
      return filteredPoiTypes
    }


    filterByFestivalPoisZerked=(poiTypes)=>{
      const poiGroupByCategory = this.groupByCategory(this.props.pois)
      const ZerkedCategories = Object.keys(poiGroupByCategory)

      const filteredPoiTypes=poiTypes.filter(poiType=>{
        return ZerkedCategories.indexOf(poiType.key)>-1
      })
    
      return filteredPoiTypes
    }
   


   render() {
    if (!this.props.pois) {return <div></div>}
  



     return  <WrappedComponent {...this.props} poiTypes={this.filterPoiTypes()}/>
   }
 }
 
return filterPoiTypesByFestivalPois

}

export default withFilteredPoiTypes;
