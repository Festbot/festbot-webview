import {
  UPDATE_PLATFORM,
  UPDATE_ARTIST_LIST,
  SEARCH_BY_ARTIST,
  UPDATE_FILTERED_ARTIST_LIST,
  SEARCH_BY_GENRE,
  SET_GENRE_FILTER,
  SET_ARTIST_FOR_DETAILS,

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
