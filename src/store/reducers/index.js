import {  combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import ReducerFestbot from './reducerFestbot.js';
import ReducerZerking from './reducerZerking.js';
import ReducerDiscover from './reducerDiscover.js';


const rootReducer = combineReducers({
	festbot: ReducerFestbot,
	zerking: ReducerZerking,
	discover: ReducerDiscover,
	form: formReducer,

});

export default rootReducer;