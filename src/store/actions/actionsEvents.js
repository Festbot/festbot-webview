import {
  UPDATE_PROGRAMS,
  INIT_PROGRAMS,
  EVENT_LIST_NOT_EXIST,
  EVENT_EXPIRED,
  INIT_EVENT_FLAGS,

} from './actionTypes.js'


export const initEventFlags=()=>{
  return {
    type: INIT_EVENT_FLAGS
  }
}

export const eventExpired=()=>{
  return {
    type: EVENT_EXPIRED
  }
}

export const eventListNotExist=()=>{
  return {
    type: EVENT_LIST_NOT_EXIST
  }
}

export const updatePrograms=(programs)=>{
  return { 
    type: UPDATE_PROGRAMS, 
    payload: programs 
  }
}

export const initPrograms=(programs)=>{
  return { 
    type: INIT_PROGRAMS, 
    payload: programs 
  }
}

