import {
  UPDATE_PLATFORM,
  UPDATE_ARTIST_LIST,
  SEARCH_BY_ARTIST,
  UPDATE_FILTERED_ARTIST_LIST,
  SEARCH_BY_GENRE,
  SET_GENRE_FILTER,
  SET_ARTIST_FOR_DETAILS,
  SET_FESTIVAL,
  GET_FESTIVAL_STAGES,
  SET_FESTIVAL_STAGES,
  GET_FESTIVAL_POIS,
  SET_FESTIVAL_POIS,
  ADD_ITEM_TO_ZERKING,
  REMOVE_ITEM_TO_ZERKING,
  SET_ITEM_TO_ZERKING,

} from './actionTypes.js'


export const platformChange=(platform)=>{
  return {
    type: UPDATE_PLATFORM,
    payload: platform
  }
}

export const searchArtists=(keyword,limit)=>{
  return {
    type: SEARCH_BY_ARTIST,
    payload:{ keyword,limit }
  }
}


export const updateArtistsList=(artistList)=>{
  return {
    type: UPDATE_ARTIST_LIST,
    payload: artistList
  }
}

export const searchByGenre=(keyword)=>{
  return {
    type: SEARCH_BY_GENRE,
    payload: keyword
  }
}


export const updateFilteredResultArtistList=(filteredArtistList)=>{
  return {
    type: UPDATE_FILTERED_ARTIST_LIST,
    payload: filteredArtistList
  }
}
export const setFilterGenre=(genre)=>{
  return {
    type: SET_GENRE_FILTER,
    payload:genre.currentTarget.textContent
  }
}

export const setArtistForDetails=(artist)=>{
  return {
    type: SET_ARTIST_FOR_DETAILS,
    payload:artist.currentTarget.id
  }
}

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

