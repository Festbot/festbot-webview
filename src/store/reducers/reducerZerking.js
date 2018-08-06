import { 
  SET_FESTIVAL,
  SET_FESTIVAL_STAGES,
	SET_FESTIVAL_POIS,
	SET_USER_ACTIVE_FESTIVAL_DATA,
  ADD_ITEM_TO_ZERKING,
  REMOVE_ITEM_TO_ZERKING,
  SET_ITEM_TO_ZERKING,
 } from '../actions/actionTypes.js';

 const initialState = {
  itemsToZerking:[]
 }

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FESTIVAL:
			return {
				...state,
				activeFestival: action.payload
			};
			break;
		case SET_FESTIVAL_STAGES:
			return {
				...state,
				stages: action.payload
			};
			break;
		case SET_FESTIVAL_POIS:
			return {
				...state,
				pois: action.payload,
				filteredPois: action.payload
			};
			break;
			case SET_USER_ACTIVE_FESTIVAL_DATA:
			return {
				...state,
				activeFestivalData: action.payload
			};
			break;
      case ADD_ITEM_TO_ZERKING:
			return {
				...state,
				itemsToZerking: state.itemsToZerking.concat(action.payload)
			};
      break;
      case REMOVE_ITEM_TO_ZERKING:
      const updatedArray = state.itemsToZerking.filter(item => item.category !== action.payload  )
			return {
				...state,
				itemsToZerking: updatedArray
			};
      break;
      case SET_ITEM_TO_ZERKING:
			return {
				...state,
				itemsToZerking: action.payload
			};
			break;
	}
	return state;
};

export default reducer;
