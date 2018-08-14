import {
	INIT_PROGRAM_LIST_BY_FESTIVAL_ID
} from '../actions/actionTypes.js';

import moment from 'moment';

import getUserId from '../../helpers/getUserId.js';

import { getUserData } from '../../helpers/apiHelper.js';

import { getFestivalDataById } from '../../helpers/festivalApiHelper.js';
import { getEventsByFestivalId,filterPastEvents } from '../../helpers/eventApiHelper.js';


import {
	setUserData,
	shouldRedirect,
  setUserActiveFestivalData,
  eventExpired,
  eventListNotExist,
  updatePrograms,
  initPrograms,
	shouldReload,
} from '../actions';

export default store => next => async action => {
	let activeFestivalData;
	let activeFestival;
	let userData;
	let userId;

	switch (action.type) {
		case INIT_PROGRAM_LIST_BY_FESTIVAL_ID:
		try{
			let festivalId;
			userId = await getUserId();
			userData = await getUserData(userId);
			store.dispatch(setUserData(userData));
			//festival id vagy url parameterbol, vagy user activ festivalbol
			if (action.payload) {
				festivalId = action.payload;
			} else {
				festivalId = userData.activeFestival;
			}
			//ha nincs fesztival aktiv akkor redirect a fesztival listara
			if (!festivalId) {
				store.dispatch(shouldRedirect());
			}
			//fesztival adatok bekuldese a storeba, coverfotohoz meg ilyenek
			activeFestivalData = await getFestivalDataById(
				festivalId
			);
			store.dispatch(setUserActiveFestivalData(activeFestivalData));

			//fesztival program elokeszitese
			//program lekeres
      const data = await getEventsByFestivalId(festivalId);
      
			// endDate hozzaadasa, ha nincs, a hosszu programok kiszurese
			const festivalProgramResults = data
				.map(event => {
					if (!event.endDate) {
						const endDate = moment(event.startDate)
							.add(3, 'hours')
							.format();
						return { ...event, endDate };
					}
					return event;
				})
				.filter(event => {
					return (
						moment(event.startDate) >
						moment(event.endDate).subtract(6, 'hours')
					);
				});

        // error handling

        if (festivalProgramResults.length == 0) {
          store.dispatch(eventListNotExist());
        }
    
        if (
          filterPastEvents(festivalProgramResults).length == 0 &&
          !festivalProgramResults.length == 0
        ) {
          store.dispatch(eventExpired());
        }
        const filteredPastEvents=filterPastEvents(festivalProgramResults)
        store.dispatch(updatePrograms(filteredPastEvents))
				store.dispatch(initPrograms(festivalProgramResults))

			//ha veletlenul teszt usert kapna webviewban a user, akkor reloadot eroltetunk	
			} catch (error) {
				store.dispatch(shouldReload())
				console.log("[REJECT]")
			}

			break;
	}

	const result = next(action);
	return result;
};
