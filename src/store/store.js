import { createStore, combineReducers, applyMiddleware } from 'redux';

import middleware from './middleware.js'
import reducers from './reducers/'


const store = createStore(reducers,applyMiddleware(middleware));

export default store;
