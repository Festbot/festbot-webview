import * as Ramda from 'ramda';

import {
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

import {
	setFestivalStages,
	setFestivalPois,
	setFestivalFilteredPois,
	updateZerkingItemArrayRemove
} from '../actions';

export default store => next => async action => {
	switch (action.type) {
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
				let lowerCaseTags
				if (poi.tags) {lowerCaseTags = poi.tags.map(tag => tag.toLowerCase())}
				return (
					updatedFilterItemArray.indexOf(poi.category) > -1 ||
					(poi.tags &&
						Ramda.intersection(updatedFilterItemArray, lowerCaseTags).length>0)
				);
			});

			store.dispatch(setFestivalFilteredPois(filteredPois));
			break;
		case REMOVE_ITEM_TO_ZERKING:
			if (store.getState().zerking.filterItems.length < 2) {
				const allPois = store.getState().zerking.pois;
				store.dispatch(setFestivalFilteredPois(allPois));
				store.dispatch(updateZerkingItemArrayRemove(action.payload));
			} else {
				const updatedFilterItem = store
					.getState()
					.zerking.filterItems.filter(
						item => item !== action.payload
					);

				const updatedPois = store
					.getState()
					.zerking.pois.filter(poi => {
						return updatedFilterItem.indexOf(poi.category) > -1;
					});

				if (updatedPois.length > 0) {
					store.dispatch(setFestivalFilteredPois(updatedPois));
				}
				store.dispatch(updateZerkingItemArrayRemove(action.payload));
			}
			break;
	}

	const result = next(action);
	return result;
};
