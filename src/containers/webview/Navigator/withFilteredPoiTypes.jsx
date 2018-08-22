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

    poiTags=(pois)=>{

      let poiTagList=[]
      pois.forEach(poi=>{
        if (poi.tags) {poiTagList = poi.tags.concat(Ramda.difference(poiTagList,poi.tags))}
      })
      const lowercaseTagList = poiTagList.map(tag => tag.toLowerCase())

      return lowercaseTagList
    }


    filterByFestivalPoisZerked=(poiTypes)=>{
      const poiGroupByCategory = this.groupByCategory(this.props.pois)
      const ZerkedCategories = Object.keys(poiGroupByCategory)
      const tags = Ramda.difference(this.poiTags(this.props.pois),ZerkedCategories)
      const tagsAndZerkedCategories = ZerkedCategories.concat(tags)
      const filteredPoiTypes=poiTypes.filter(poiType=>{
        return tagsAndZerkedCategories.indexOf(poiType.key)>-1
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
