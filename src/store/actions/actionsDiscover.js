import {
  UPDATE_SEARCH_RESULTS,

} from './actionTypes.js'


export const updateSearchResults=(data)=>{
  return {
    type: UPDATE_SEARCH_RESULTS,
    payload: data
  }
}


