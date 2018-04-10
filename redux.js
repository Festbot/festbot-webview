

const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  webviewMenu:'festbot',
  isActivePopular: false,
  isActiveFilter: false,
  isActiveFavourite: false,


}

//reducer
const rootReducer = (state = initialState, action) => {
  if  (action.type=== 'UPD_MENU'){
    return {
      ...state,
      webviewMenu: action.value
    };
  }
  if  (action.type=== 'UPD_POPULAR'){
    return {
      ...state,
      isActivePopular: !state.isActivePopular
    };
  }
  if  (action.type=== 'UPD_FILTER'){
    return {
      ...state,
      isActiveFilter: !state.isActiveFilter
    };
  }
  if  (action.type=== 'UPD_FAVOURITE'){
    return {
      ...state,
      isActiveFavourite: !state.isActiveFavourite
    };
  }
  return state;
}

//store
const store = createStore(rootReducer);

console.log(store.getState());


// Subscription
store.subscribe(()=> {
  console.log('[subscription]', store.getState())
})


//Dispatching action
store.dispatch({type: 'UPD_MENU', value:'festivals'});
store.dispatch({type: 'UPD_POPULAR'});
store.dispatch({type: 'UPD_FILTER'});
store.dispatch({type: 'UPD_FAVOURITE'});
console.log(store.getState());
