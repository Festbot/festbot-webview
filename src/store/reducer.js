const initialState ={
  webviewMenu:'festbot',
  isActiveTrending: false,
  isActiveFilter: false,
  isActiveFavourite: false,
}

const reducer = (state = initialState,action) => {
  switch (action.type) {
    case 'UPD_MENU':
    return {
      ...state,
      webviewMenu: action.value
    }
    case 'UPD_TRENDING':
    return {
      ...state,
      isActiveTrending: !state.isActiveTrending
    }
    case 'UPD_FILTER':
    return {
      ...state,
      isActiveFilter: !state.isActiveFilter
    }
    case 'UPD_FAVOURITE':
    return {
      ...state,
      isActiveFavourite: !state.isActiveFavourite
    }
    
  }
  return state;
}

export default reducer;