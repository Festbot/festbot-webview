import {
	SET_LIST_OF_PERSONAL_PREFERENCES,
	UPDATE_SEARCH_RESULTS
} from '../actions/actionTypes.js';

const initialState = {
	itemsToZerking: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LIST_OF_PERSONAL_PREFERENCES:
			return {
				...state,
				searchResults: action.payload,
				matchingArtists: action.payload
			};
			break;
		case UPDATE_SEARCH_RESULTS:
			return {
				...state,
				searchResults: action.payload
			};
			break;
	}
	return state;
};

export default reducer;
