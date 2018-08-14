

const initialState ={
  webviewMenu:'hide',
  isActiveTrending: false,
  isActiveFilter: false,
  isActiveFavourite: false,
  savedShows:[],
  eventDays:[],
  activeDay:'ALL',
  eventStages:['Main Stage','Telekom Arena','Colosseum','Magic Mirror'],
  activeStage:'HELYSZÍNEK',
  detailsPanelHeight:0,
  isWebview:false,
  isEventListExist:true,
  isEventExpired: false,
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
    case 'SET_IS_WEBVIEW':
    return {
      ...state,
      isWebview: true
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
    case 'SHOULD_REDIRECT':
    return {
      ...state,
      shouldRedirect: true
    }
    case 'UPDATE_PROGRAMS':
    return {
      ...state,
      searchResults: action.payload
    }
    case 'INIT_PROGRAMS':
    return {
      ...state,
      data: action.payload
    }
    case 'EVENT_LIST_NOT_EXIST':
    return {
      ...state,
      isEventListExist: false
    }
    case 'EVENT_EXPIRED':
    return {
      ...state,
      isEventExpired: true
    }
    case 'INIT_EVENT_FLAGS':
      return {
        ...state,
        isEventListExist:true,
        isEventExpired: false,
        isActiveTrending: false,
        isActiveFilter: false,
        isActiveFavourite: false,
        activeDay:'ALL',
        activeStage:'HELYSZÍNEK',
        searchResults:[],
        data:[],
      }

  }
  return state;
}

export default reducer;