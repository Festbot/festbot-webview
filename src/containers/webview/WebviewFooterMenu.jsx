import React, { Component } from 'react'
import {connect} from 'react-redux';

import { Menu, Label,Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux.jsx'
import classes from './WebviewFooterMenu.css'
import FontIcon from 'material-ui/FontIcon';

import {Tabs, Tab} from 'material-ui/Tabs';


const menuItems = {
  "FestivalProgramContainer": [
    {
      "name": "Car Sharing",    
      "linkTo": "/car_sharing",
      "iconName": "muidocs-icon-directions-car",
      "label": "Car Sharing"
    },
    {
      "name": "I\"am free to",
      "linkTo": "/i_am_free_to",
      "iconName": "muidocs-icon-record-voice-over",
      "label": "I\"am free to"
    },
    {
      "name": "Fest Match",
      "linkTo": "/fest_match",
      "iconName": "muidocs-icon-flash_on",
      "label": "Fest Match"
    },
    {
      "name": "Notifications",
      "linkTo": "/notifications",
      "iconName": "muidocs-icon-notifications",
      "label": "Notifications"
    },
    {
      "name": "Settings",
      "linkTo": "<Link to='/'/>",
      "iconName": "muidocs-icon-settings",
      "label": "Settings"
    }
  ]

}


class WebviewFooterMenu extends Component {
  state = { 
    activeItem: 'home',

  }


  

  handleItemClick = (e) =>  {
    switch (e.currentTarget.title) {
      case "Trending":
        return onTrendingToggle()
      
      case "Filter":
        return this.props.onFilterToggle()
      
      case "Favourites":
        return this.props.onFavouriteToggle()
      
      default:
        break;
      
    }
    return (
      this.setState({ activeItem: e.currentTarget.title })
     // () => dispatch({type: 'UPD_MENU', value:'car sharing'}
      
    )
  } 

  render() {
    const { activeItem } = this.state
    console.log('footer activeItem',this.state.activeItem)
    console.log('props at navigation:', this.props)
    const visibility = ''
    const toggleItem='Favourite'

    return (
      <Aux>
      {console.log('footer view from redux',this.props.webviewMenu)} 
      <Tabs className={classes.tabs} >

        <Tab className={classes.tab}
          icon={<FontIcon title="Car Sharing" onClick={this.handleItemClick}  className="material-icons">directions_car</FontIcon>}
          label="Car Sharing"
          containerElement={<Link to="/car_sharing"/>}
          

        />

        <Tab className={classes.tab}
          icon={<FontIcon title="Trending" onClick={this.handleItemClick} className="material-icons">trending_up</FontIcon>}
          label="Trending"
          

        />

        <Tab className={classes.tab}
          icon={<FontIcon title="Filter" onClick={this.handleItemClick}  className="material-icons">filter_list</FontIcon>}
          label="Filter"
          
          containerElement={<Link to="/"/>}
        />

        <Tab className={classes.tab}
          icon={<FontIcon title="Favourites" onClick={this.handleItemClick} style={{color: this.props.isActive[toggleItem] ? '#E65100': '#fff'  }} className="material-icons">star</FontIcon>}
          label="Favourites"
          
          
        />

        <Tab className={classes.tab}
        icon={<FontIcon title="Discover" onClick={this.props.onViewChange}  className="material-icons">headset</FontIcon>}
        label="Discover"
        
        containerElement={<Link to="/discover"/>}
      />
      </Tabs>

















    <Menu size='huge' inverted  fixed='bottom' className={classes[visibility]}>
      <Menu.Item name='FestivalProgramContainer' active={activeItem === 'FestivalProgramContainer'} onClick={this.handleItemClick}>
      <Link to={'/festbot/program_browser'}>
      <Icon size='large' name='home'/>
      </Link>
      </Menu.Item>

      <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick}>
      <Link to={'/artist/tiesto'}>
      <Icon size='large' name='comments'/>
      </Link>
      <Label color='teal'  floating >22</Label>

      </Menu.Item>
      <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick}>
      <Icon size='large' name='bell'/>
      <Label color='teal'  floating >4</Label>
      </Menu.Item>

      <Menu.Item name='settings' active={activeItem === 'settings'} onClick={this.handleItemClick}>
      <Icon size='large'  name='setting'/>
      </Menu.Item>
    </Menu>
      </Aux>
      
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
    onViewChange: () => dispatch({type: 'UPD_MENU', value:'discover'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WebviewFooterMenu);