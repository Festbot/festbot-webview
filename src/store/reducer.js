const initialState ={
  webviewMenu:'festbot',
  isActiveTrending: false,
  isActiveFilter: false,
  isActiveFavourite: false,
  favouriteArtists:[],
  eventDays:[],
  activeDay:'ALL',
  eventStages:['Main Stage','Telekom Arena','Colosseum','Magic Mirror'],
  activeStage:'ALL LOCATION',
  detailsPanelHeight:0,
  userid:'',
}

const reducer = (state = initialState,action) => {
  switch (action.type) {
    case 'UPD_USERID':
    return {
      ...state,
      userid: action.value
    }
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
    case 'UPD_TOGGLE':
    return {
      ...state,
      ["isActive"+action.value]: !state["isActive"+action.value]
    }
    case 'ADD_FAVOURITE':
    return {
      ...state,
      favouriteArtists: state.favouriteArtists.concat(action.value)
    }
    case 'REMOVE_FAVOURITE':
    const updatedArray = state.favouriteArtists.filter(artist => artist !== action.value  )
    return {
      ...state,
      favouriteArtists: updatedArray
    }
    case 'UPD_EVENTDAYS':
    return {
      ...state,
      eventDays: action.value
    }
    case 'UPD_ACTIVEDAY':
    return {
      ...state,
      activeDay: action.value
    }
    case 'UPD_EVENTSTAGES':
    return {
      ...state,
      eventStages: action.value
    }
    case 'UPD_ACTIVESTAGE':
    return {
      ...state,
      activeStage: action.value
    }
    case 'UPD_DETAILSHEIGHT':
    return {
      ...state,
      detailsPanelHeight: action.value
    }
  }
  return state;
}

export default reducer;