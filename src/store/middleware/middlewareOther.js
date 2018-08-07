import {
	SEARCH_BY_ARTIST,
	SEARCH_BY_GENRE,
	GET_FESTIVAL_STAGES,
	GET_FESTIVAL_POIS,
	ADD_ITEM_TO_ZERKING,
	REMOVE_ITEM_TO_ZERKING
} from '../actions/actionTypes.js';

import {
	getArtistsByNameGenre,
	getArtistsByGenre
} from '../../helpers/artistApiHelper.js';

import {
	getStagesByFestivalId,
	getPoisByFestivalId
} from '../../helpers/festivalApiHelper.js';

import { getDistance } from '../../helpers/getDistance.js';

import {
	updateArtistsList,
	updateFilteredResultArtistList,
	setFestivalStages,
	setFestivalPois,
	setFestivalFilteredPois,
	addItemToZerking,
	removeItemToZerking
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
		case ADD_ITEM_TO_ZERKING:
			const newFilterItem = [action.payload[0].category];
			const updatedFilterItemArray = newFilterItem.concat(
				store.getState().zerking.filterItems
			);

			const filteredPois = store.getState().zerking.pois.filter(poi => {
				return updatedFilterItemArray.indexOf(poi.category) > -1;
			});

			console.log('[MIDDLEWARE]', filteredPois);

			store.dispatch(setFestivalFilteredPois(filteredPois));
			break;
		case REMOVE_ITEM_TO_ZERKING:
			const updatedFilterItem = store
				.getState()
				.zerking.filterItems.filter(item => item !== action.payload);

			const updatedPois = store.getState().zerking.pois.filter(poi => {
				return updatedFilterItem.indexOf(poi.category) > -1;
			});

			store.dispatch(setFestivalFilteredPois(updatedPois));
			
			if (store.getState().zerking.itemsToZerking.length == 1) {
				const allPois = store.getState().zerking.pois;
				store.dispatch(setFestivalFilteredPois(allPois));
			}

			break;
	}

	const result = next(action);
	return result;
};
