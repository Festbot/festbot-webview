

const initialState ={
  webviewMenu:'hide',
  isActiveTrending: false,
  isActiveFilter: false,
  isActiveFavourite: false,
  savedShows:[],
  eventDays:[],
  activeDay:'ALL',
  eventStages:['Main Stage','Telekom Arena','Colosseum','Magic Mirror'],
  activeStage:'ALL LOCATION',
  detailsPanelHeight:0,
  userId:'f442bee64bb034de9a00e5b3bd894f18',
}

const reducer = (state = initialState,action) => {
  switch (action.type) {
    case 'SET_USER':
    return {
      ...state,
      userId: action.value._id,
      activeFestival: action.value.activeFestival,
      savedArtists: [...action.value.savedArtists],
      savedShows: [...action.value.savedShows],
      topArtists: [...action.value.topArtists],
      topGenres: [...action.value.topGenres],
      userDataReceived: true
    }
    case 'SET_ACTIVEFESTIVAL':
    return {
      ...state,
      activeFestival: action.value,
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
      savedShows: state.savedShows.concat(action.value)
    }
    case 'REMOVE_FAVOURITE':
    const updatedArray = state.savedShows.filter(artist => artist !== action.value  )
    return {
      ...state,
      savedShows: updatedArray
    }
    case 'UPD_EVENTDAYS':
    return {
      ...state,
      eventDays: [...action.value]
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