import {  combineReducers } from 'redux';

import ReducerFestbot from './reducerFestbot.js';
import ReducerZerking from './reducerZerking.js';
import ReducerDiscover from './reducerDiscover.js';


const rootReducer = combineReducers({
	festbot: ReducerFestbot,
	zerking: ReducerZerking,
	discover: ReducerDiscover,
});

export default rootReducer;