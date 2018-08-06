import {

  SET_FESTIVAL,
  GET_FESTIVAL_STAGES,
  SET_FESTIVAL_STAGES,
  GET_FESTIVAL_POIS,
  SET_FESTIVAL_POIS,
  ADD_ITEM_TO_ZERKING,
  REMOVE_ITEM_TO_ZERKING,
  SET_ITEM_TO_ZERKING,
  
} from './actionTypes.js'



export const setFestival=(festival)=>{
  return {
    type: SET_FESTIVAL,
    payload:festival
  }
}

export const getFestivalStages=(festivalId)=>{
  return {
    type: GET_FESTIVAL_STAGES,
    payload:festivalId
  }
}

export const setFestivalStages=(stages)=>{
  return {
    type: SET_FESTIVAL_STAGES,
    payload:stages
  }
}

export const getFestivalPois=(festivalId)=>{
  return {
    type: GET_FESTIVAL_POIS,
    payload:festivalId
  }
}

export const setFestivalPois=(pois)=>{
  return {
    type: SET_FESTIVAL_POIS,
    payload:pois
  }
}

export const addItemToZerking=(item)=>{
  return {
    type: ADD_ITEM_TO_ZERKING,
    payload:item
  }
}

export const removeItemToZerking=(category)=>{
  return {
    type: REMOVE_ITEM_TO_ZERKING,
    payload:category
  }
}


export const setItemToZerking=(item)=>{
  return {
    type: SET_ITEM_TO_ZERKING,
    payload:item
  }
}

