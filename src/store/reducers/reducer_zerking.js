import {SET_FESTIVAL} from '../actions/actionTypes.js'

const reducer = (state = "", action) => {
	switch (action.type) {
		case SET_FESTIVAL:
			return {
				...state,
				activeFestival: action.payload
			};
	}
	return state;
};

export default reducer;
