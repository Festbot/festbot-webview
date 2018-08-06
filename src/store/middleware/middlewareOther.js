import {
	SEARCH_BY_ARTIST,
	SEARCH_BY_GENRE,
	GET_FESTIVAL_STAGES,
	GET_FESTIVAL_POIS,
} from '../actions/actionTypes.js';

import {
	getArtistsByNameGenre,
	getArtistsByGenre,
} from '../../helpers/artistApiHelper.js';

import {
	getStagesByFestivalId,
	getPoisByFestivalId
} from '../../helpers/festivalApiHelper.js';

import {
	updateArtistsList,
	updateFilteredResultArtistList,
	setFestivalStages,
	setFestivalPois,

} from '../actions';


export default store => next => async action => {

	switch (action.type) {
		case SEARCH_BY_ARTIST:
			const result = await getArtistsByNameGenre(
				action.payload.keyword,
				action.payload.limit
			);
			store.dispatch(updateArtistsList(result));
			break;
		case SEARCH_BY_GENRE:
			const filteredResult = await getArtistsByGenre(action.payload);
			store.dispatch(updateFilteredResultArtistList(filteredResult));
			break;
		case GET_FESTIVAL_STAGES:
			const stages = await getStagesByFestivalId(action.payload);
			store.dispatch(setFestivalStages(stages));
			break;
		case GET_FESTIVAL_POIS:
			const pois = await getPoisByFestivalId(action.payload);
			store.dispatch(setFestivalPois(pois));
			break;
	}

	const result = next(action);
	return result;
};
