import {
	INIT_USER_DATA,
	INIT_USER_ACTIVE_FESTIVAL_POIS,
	INIT_USER_ACTIVE_FESTIVAL_STAGES,
	INIT_MATCHING_ARTIST_OF_USER
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

import {getFestivalDataById} from '../../helpers/festivalApiHelper.js'

import {
	setUserData,
	getFestivalStages,
	getFestivalPois,
	setListOfPersonalPreferences,
	setUserActiveFestivalData,
} from '../actions';

export default store => next => async action => {
	let activeFestivalData;
	let activeFestival;
	let userData;
	console.log("[MIDDLEWARE]",action)
	const userId = await getUserId();
	if (!store.getState().userDataReceived) {
		userData = await getUserData(userId);
	}

	switch (action.type) {
		case INIT_USER_DATA:
			store.dispatch(setUserData(userData));
			break;
		case INIT_USER_ACTIVE_FESTIVAL_POIS:
			activeFestival = store.getState().activeFestival;
			if (!activeFestival) {
				activeFestival = userData.activeFestival;
				store.dispatch(setUserData(userData));
				activeFestivalData = await getFestivalDataById(userData.activeFestival);
				console.log(activeFestivalData)
				store.dispatch(setUserActiveFestivalData(activeFestivalData))
			}
			store.dispatch(getFestivalPois(activeFestival));
			break;
		case INIT_USER_ACTIVE_FESTIVAL_STAGES:
			activeFestival = store.getState().activeFestival;
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
	}

	const result = next(action);
	return result;
};
