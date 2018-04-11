import React, { Component } from 'react'
import {connect} from 'react-redux';

export class festivalProgramContainer extends Component {

  componentDidMount() {
    this.props.onViewChange('program_list')
  }

  render() {
    

    console.log('router in program: ' , this.props)



    return (
      <div>
      FestivalProgramContainer
      <p>
      hello
      </p>
      </div>
    )
  }
}


const mapStateToProps = state => {

  return{
    webviewMenu:state.webviewMenu,
    isActive:{
      Trending: state.isActiveTrending,
      Filter: state.isActiveFilter,
      Favourite: state.isActiveFavourite
      
    }

  };
};

const mapDispatchToProps =  dispatch => {
  return {
    onTrendingToggle: () => dispatch({type: 'UPD_TRENDING' }),
    onFilterToggle: () => dispatch({type: 'UPD_FILTER' }),
    onFavouriteToggle: () => dispatch({type: 'UPD_FAVOURITE'}),
    onViewChange: (actualViewMenu) => dispatch({type: 'UPD_MENU', value: actualViewMenu})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(festivalProgramContainer)
