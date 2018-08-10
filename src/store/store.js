import { createStore, compose, applyMiddleware } from 'redux';

import middlewareOther from './middleware/middlewareOther.js'
import middlewareUser from './middleware/middlewareUser.js'
import middlewarePois from './middleware/middlewarePois.js'
import reducers from './reducers/index.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(reducers,composeEnhancers(
  applyMiddleware(middlewareOther,middlewareUser,middlewarePois)));

export default store;
