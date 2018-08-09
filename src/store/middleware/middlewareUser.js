import {
	INIT_USER_DATA,
	INIT_USER_ACTIVE_FESTIVAL_POIS,
	INIT_USER_ACTIVE_FESTIVAL_STAGES,
	INIT_MATCHING_ARTIST_OF_USER,
	UPDATE_MY_POSITION,
} from '../actions/actionTypes.js';

import {
	getTopGenresArtistOfUser,
	getTopArtistOfUser
} from '../../helpers/artistApiHelper.js';

import {
	getStagesByFestivalId,
	getPoisByFestivalId
} from '../../helpers/festivalApiHelper.js';

import getUserId from '../../helpers/getUserId.js';

import { getUserData } from '../../helpers/apiHelper.js';

import { getFestivalDataById } from '../../helpers/festivalApiHelper.js';

import { getDistance } from '../../helpers/getDistance.js';

import {
	setUserData,
	getFestivalStages,
	getFestivalPois,
	setListOfPersonalPreferences,
	setUserActiveFestivalData,
	setMyPosition,
	setFestivalPois,
	setFestivalFilteredPois
} from '../actions';

export default store => next => async action => {
	let activeFestivalData;
	let activeFestival;
	let userData;
	let userId;
	

	switch (action.type) {
		case INIT_USER_DATA:
		 userId = await getUserId();
		userData = await getUserData(userId);
			store.dispatch(setUserData(userData));
			break;
		case INIT_USER_ACTIVE_FESTIVAL_POIS:
			 userId = await getUserId();
			userData = await getUserData(userId);
			activeFestival = store.getState().festbot.activeFestival;
			if (!activeFestival) {
				activeFestival = userData.activeFestival;
				store.dispatch(setUserData(userData));
			}
				activeFestivalData = await getFestivalDataById(
					userData.activeFestival
				);
				store.dispatch(setUserActiveFestivalData(activeFestivalData));
			
			store.dispatch(getFestivalPois(activeFestival));
			break;
		case INIT_USER_ACTIVE_FESTIVAL_STAGES:
			 userId = await getUserId();
			userData = await getUserData(userId);
			activeFestival = store.getState().festbot.activeFestival;
			if (!activeFestival) {
				activeFestival = userData.activeFestival;
				store.dispatch(setUserData(userData));
			}
			store.dispatch(getFestivalStages(activeFestival));
			break;

		case INIT_MATCHING_ARTIST_OF_USER:
			 userId = await getUserId();
			userData = await getUserData(userId);
			store.dispatch(setUserData(userData));
			const exceptTopArtists = await getTopGenresArtistOfUser(userData);
			const topArtists = await getTopArtistOfUser(userData);
			const listOfPersonalPreferences = topArtists.concat(
				exceptTopArtists
			);
			if (listOfPersonalPreferences!==[]) {
				store.dispatch(
					setListOfPersonalPreferences(listOfPersonalPreferences)
				);
			}
		
			break;

		case UPDATE_MY_POSITION:

			if (!store.getState().zerking.filteredPois){return}

			const poisWithDistance = store.getState().zerking.filteredPois.map(poi => {
					return {
						...poi,
						distance: getDistance(
							action.payload.lat,
							action.payload.lng,
							poi.coordinates.lat,
							poi.coordinates.lng
						)
					};
				});
				const orderedPois= poisWithDistance.sort((a,b)=>{
					return a.distance-b.distance;
				})
			store.dispatch(setFestivalFilteredPois(orderedPois));
	
			break;
	}

	const result = next(action);
	return result;
};
