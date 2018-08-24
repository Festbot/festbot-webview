import * as Ramda from 'ramda';

import {
	INIT_USER_DATA,
	INIT_USER_ACTIVE_FESTIVAL_POIS,
	INIT_USER_ACTIVE_FESTIVAL_STAGES,
	INIT_MATCHING_ARTIST_OF_USER,
	UPDATE_MY_POSITION
} from '../actions/actionTypes.js';

import {
	getTopGenresArtistOfUser,
	getTopArtistOfUser,
	getArtistsByNameGenre
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
	setFestivalFilteredPois,
	setFestivalFilteredStages,
	updateSearchResults,
	setFestivalGroupedPois,
	shouldReload
} from '../actions';

export default store => next => async action => {
	let activeFestivalData;
	let activeFestival;
	let userData;
	let userId;

	switch (action.type) {
		case INIT_USER_DATA:
			for (let i = 0; i < 10; i++) {
				try {
					await sleep(300);
					userId = await getUserId();
					break;
				} catch (error) {
					if (i === 9) {
						alert(error);
						return store.dispatch(shouldReload());
					}
				}
			}
			userData = await getUserData(userId);
			store.dispatch(setUserData(userData));
			break;
		case INIT_USER_ACTIVE_FESTIVAL_POIS:
			for (let i = 0; i < 10; i++) {
				try {
					await sleep(300);
					userId = await getUserId();
					break;
				} catch (error) {
					if (i === 9) {
						alert(error);
						return store.dispatch(shouldReload());
					}
				}
			}
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
			for (let i = 0; i < 10; i++) {
				try {
					await sleep(300);
					userId = await getUserId();
					break;
				} catch (error) {
					if (i === 9) {
						alert(error);
						return store.dispatch(shouldReload());
					}
				}
			}
			userData = await getUserData(userId);
			activeFestival = store.getState().festbot.activeFestival;
			if (!activeFestival) {
				activeFestival = userData.activeFestival;
				store.dispatch(setUserData(userData));
			}
			store.dispatch(getFestivalStages(activeFestival));
			break;

		case INIT_MATCHING_ARTIST_OF_USER:
			for (let i = 0; i < 10; i++) {
				try {
					await sleep(300);
					userId = await getUserId();
					break;
				} catch (error) {
					if (i === 9) {
						alert(error);
						return store.dispatch(shouldReload());
					}
				}
			}
			userData = await getUserData(userId);
			store.dispatch(setUserData(userData));
			const exceptTopArtists = await getTopGenresArtistOfUser(userData);
			const topArtists = await getTopArtistOfUser(userData);
			const listOfPersonalPreferences = topArtists.concat(
				exceptTopArtists
			);
			if (listOfPersonalPreferences !== []) {
				store.dispatch(
					setListOfPersonalPreferences(listOfPersonalPreferences)
				);
			} else {
				const filteredResults = await getArtistsByNameGenre();
				store.dispatch(updateSearchResults(filteredResults));
			}
			break;

		case UPDATE_MY_POSITION:
			if (!store.getState().zerking.filteredPois) {
				return;
			}

			const poisWithDistance = store
				.getState()
				.zerking.filteredPois.map(poi => {
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
			const orderedPois = poisWithDistance.sort((a, b) => {
				return a.distance - b.distance;
			});
			//distance szerint rendezett poik
			store.dispatch(setFestivalFilteredPois(orderedPois));

			const stagesWithDistance = store
				.getState()
				.zerking.stagesToFiltering.map(stage => {
					return {
						...stage,
						distance: getDistance(
							action.payload.lat,
							action.payload.lng,
							stage.coordinates.lat,
							stage.coordinates.lng
						)
					};
				});
			const orderedStages = stagesWithDistance.sort((a, b) => {
				return a.distance - b.distance;
			});
			store.dispatch(setFestivalFilteredStages(orderedStages));

			//kell a compasshoz, id szerint rtendezett osszes poi,stage kombinalt tomb
			const allOrderedPois = orderedPois.concat(orderedStages);
			const groupByPoiId = Ramda.groupBy(poi => poi._id);
			const groupedPois = groupByPoiId(allOrderedPois);
			store.dispatch(setFestivalGroupedPois(groupedPois));

			break;
	}

	const result = next(action);
	return result;
};
