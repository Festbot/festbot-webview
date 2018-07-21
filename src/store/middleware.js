import {
  UPDATE_ARTIST_LIST,
  SEARCH_BY_ARTIST,
  SEARCH_BY_GENRE,
} from './actions/actionTypes.js'

import {
  getArtistsByNameGenre,
  getArtistsByGenre,
} from '../helpers/artistApiHelper.js'

import {
  updateArtistsList,
  updateFilteredResultArtistList,
} from './actions/actions.js'


export default  store =>  next => async action =>{
      switch (action.type ){
        case SEARCH_BY_ARTIST: 
        const result= await getArtistsByNameGenre(action.payload.keyword,action.payload.limit)
        store.dispatch(updateArtistsList(result));
        break;
        case SEARCH_BY_GENRE:
        const filteredResult= await getArtistsByGenre(action.payload)
        store.dispatch(updateFilteredResultArtistList(filteredResult));
        break;
      }
    
      const result = next(action);
      return result
    }

