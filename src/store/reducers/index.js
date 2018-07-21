import {  combineReducers } from 'redux';

import ReducerFestbot from './reducer_festbot.js';
import ReducerZerking from './reducer_zerking.js';


const rootReducer = combineReducers({
	festbot: ReducerFestbot,
	zerking: ReducerZerking
});

export default rootReducer;