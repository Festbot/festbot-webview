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
	const userId = await getUserId();
	console.log("[MIDDLEWARE] getUserId finished")

		userData = await getUserData(userId);
	
	console.log("[MIDDLEWARE] user data ok")
	switch (action.type) {
		case INIT_USER_DATA:
			store.dispatch(setUserData(userData));
			break;
		case INIT_USER_ACTIVE_FESTIVAL_POIS:
		console.log("[MIDDLEWARE] INIT_USER_ACTIVE_FESTIVAL_POIS started")
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
			activeFestival = store.getState().festbot.activeFestival;
			if (!activeFestival) {
				activeFestival = userData.activeFestival;
				store.dispatch(setUserData(userData));
			}
			store.dispatch(getFestivalStages(activeFestival));
			break;

		case INIT_MATCHING_ARTIST_OF_USER:
			store.dispatch(setUserData(userData));
			const exceptTopArtists = await getTopGenresArtistOfUser(userData);
			const topArtists = await getTopArtistOfUser(userData);
			const listOfPersonalPreferences = topArtists.concat(
				exceptTopArtists
			);
			store.dispatch(
				setListOfPersonalPreferences(listOfPersonalPreferences)
			);
			break;

		case UPDATE_MY_POSITION:
			console.log("[middleware]UPDATE_MY_POSITION started ")
			if (!store.getState().zerking.filteredPois){return}
			console.log("[middleware]filteredPois received ")
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
			console.log("[middleware]filteredPois ordered ")
			break;
	}

	const result = next(action);
	return result;
};
