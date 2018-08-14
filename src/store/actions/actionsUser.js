import {
  INIT_USER_DATA,
  SET_USER,
  INIT_USER_ACTIVE_FESTIVAL_STAGES,
  INIT_USER_ACTIVE_FESTIVAL_POIS,
  SET_USER_ACTIVE_FESTIVAL_DATA,
  INIT_MATCHING_ARTIST_OF_USER,
  SET_LIST_OF_PERSONAL_PREFERENCES,
  UPDATE_MY_POSITION,
  SET_IS_WEBVIEW,
  INIT_PROGRAM_LIST_BY_FESTIVAL_ID,
  SHOULD_REDIRECT,
  SHOULD_RELOAD,


} from './actionTypes.js'




export const initUserData=()=>{
  return {
    type: INIT_USER_DATA
  }
}
export const setIsWebview=()=>{
  return {
    type: SET_IS_WEBVIEW
  }
}

export const setUserData=(userData)=>{
  return { 
    type: SET_USER, 
    value: userData 
  }
}

export function  initUserActiveFestivalStages(){
  return{
    type: INIT_USER_ACTIVE_FESTIVAL_STAGES
  }
}

export function  initUserActiveFestivalPois(){
  return{
    type: INIT_USER_ACTIVE_FESTIVAL_POIS
  }
}

export function  setUserActiveFestivalData(festivalData){
  return{
    type: SET_USER_ACTIVE_FESTIVAL_DATA,
    payload: festivalData
  }
}


export function initMatchingArtistsOfUser(){
  return{
    type:INIT_MATCHING_ARTIST_OF_USER
  }
}

export function setListOfPersonalPreferences(artists){
  return{
    type:SET_LIST_OF_PERSONAL_PREFERENCES,
    payload: artists
  }
}

export function updateMyPosition(position){
  return{
    type:UPDATE_MY_POSITION,
    payload: position
  }
}

export function initProgramListByFestivalId(festivalId){
  return{
    type:INIT_PROGRAM_LIST_BY_FESTIVAL_ID,
    payload: festivalId
  }
}

export function shouldRedirect(){
  return{
    type:SHOULD_REDIRECT,

  }
}
export function shouldReload(){
  return{
    type:SHOULD_RELOAD,

  }
}

