import {
	SET_FESTIVAL,
	SET_FESTIVAL_STAGES,
	SET_FESTIVAL_POIS,
	SET_FESTIVAL_FILTERED_POIS,
	SET_USER_ACTIVE_FESTIVAL_DATA,
	ADD_ITEM_TO_ZERKING,
	UPDATE_ZERKING_ITEM_ARRAY_REMOVE,
	SET_ITEM_TO_ZERKING,
	UPDATE_MY_POSITION,
	SET_HEADING,
	ADD_STAGE_TO_FILTERING,
	REMOVE_STAGE_TO_FILTERING,
	SET_FESTIVAL_FILTERED_STAGES
} from '../actions/actionTypes.js';

const initialState = {
	itemsToZerking: [],
	filterItems: [],
	stagesToFiltering:[]
};

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
		case SET_FESTIVAL_FILTERED_POIS:
			return {
				...state,
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
				itemsToZerking: state.itemsToZerking.concat(action.payload),
				filterItems: state.filterItems.concat(
					action.payload[0].category
				)
			};
			break;
		case UPDATE_ZERKING_ITEM_ARRAY_REMOVE:
			const updatedArray = state.itemsToZerking.filter(
				item => item.category !== action.payload
			);
			const updatedFilterItems = state.filterItems.filter(
				item => item !== action.payload
			);
			return {
				...state,
				itemsToZerking: updatedArray,
				filterItems: updatedFilterItems
			};
			break;
		case SET_ITEM_TO_ZERKING:
			return {
				...state,
				itemsToZerking: action.payload
			};
			break;

			case ADD_STAGE_TO_FILTERING:
			return {
				...state,
				stagesToFiltering: state.stagesToFiltering.concat(action.payload),
			};
			break;

			case REMOVE_STAGE_TO_FILTERING:
			const updatedFilterStages = state.stagesToFiltering.filter(
				item => item._id !== action.payload
			);
			return {
				...state,
				stagesToFiltering: updatedFilterStages
			};
			break;

			case SET_FESTIVAL_FILTERED_STAGES:
			return {
				...state,
				stagesToFiltering: action.payload
			};
			break;


		case UPDATE_MY_POSITION:
			return {
				...state,
				pos: action.payload
			};
			break;
		case SET_HEADING:
			return {
				...state,
				heading: action.payload
			};
			break;
	}
	return state;
};

export default reducer;
