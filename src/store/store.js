import { createStore, combineReducers, applyMiddleware } from 'redux';

import middlewareOther from './middleware/middlewareOther.js'
import middlewareUser from './middleware/middlewareUser.js'
import reducers from './reducers/index.js'


const store = createStore(reducers,applyMiddleware(middlewareOther,middlewareUser));

export default store;
