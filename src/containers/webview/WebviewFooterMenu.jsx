import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux.jsx'
import classes from './WebviewFooterMenu.css'
import FontIcon from 'material-ui/FontIcon';
import IconWithToggle from '../../helpers/IconWithToggle.jsx'

import FestbotLogo from '../../ui/FestbotLogo.jsx'
import {Tabs, Tab} from 'material-ui/Tabs';


const menuItems = {
  "program_list": [
    {
      "name": "Car Sharing",
      "route": "/car_sharing",
      "iconName": "directions_car",


    },

    {
      "name": "I\"am free to",
      "route": "/i_am_free_to",
      "iconName": "record_voice_over",

    },
    {
      "name": "Trending",
      "route": "",
      "iconName": "trending_up",
      "toggleItem": "Trending"
    },
    {
      "name": "My Filter",
      "route": "",
      "iconName": "filter_list",
      "toggleItem": "Filter"
    },
    {
      "name": "My Favourite",
      "route": "",
      "iconName": "star",
      "toggleItem": "Favourite"
    }
  ],
  "festbot": [
    {
      "name": "Festbot",
      "route": "/",
      "iconName": "muidocs-icon-directions-car",

    },
    {
      "name": "Discover",
      "route": "/discover",
      "iconName": "headset",
    },
    {
      "name": "Match",
      "route": "/fest_match",
      "iconName": "flash_on",

    },
    {
      "name": "Notifications",
      "route": "/notifications",
      "iconName": "notifications",

    },
    {
      "name": "Settings",
      "route": "/settings",
      "iconName": "settings",
    }
  ]


}


class WebviewFooterMenu extends Component {
  state = {
    activeItem: 'home',

  }




  handleItemClick = (e) =>  {
    this.props.onToggle(e.currentTarget.title)

    return (
      this.setState({ activeItem: e.currentTarget.title })
     // () => dispatch({type: 'UPD_MENU', value:'car sharing'}

    )
  }


  render() {
    const { activeItem } = this.state

    console.log('props at navigation:', this.props)

    const festbotlogo = <FestbotLogo width='24px'/>

    const viewNameFromRouter=this.props.webviewMenu

    const tabBuilder = menuItems[viewNameFromRouter].map(item =>{
      let iconElement = <FontIcon title={item.name} onClick={this.handleItemClick} className="material-icons">{item.iconName}</FontIcon>

      if (item.toggleItem) {
        iconElement = <IconWithToggle isToggled={this.props.isActive[item.toggleItem]} handleItemClick={this.handleItemClick} title={item.toggleItem} iconName={item.iconName} />
      }

      (item.name=="Festbot") ? iconElement=<FestbotLogo width='24px'/> :null;


      return (
        <Tab
          className={ item.toggleItem ? classes.tabToggle :classes.tab }
          icon={iconElement}
          label={item.name}
          containerElement={!item.route == ""? <Link to={item.route}/> :<div></div>}

      />
      )});


    return (
      <Aux>
      {console.log('footer view from redux',this.props.webviewMenu)}

      <Tabs className={classes.tabs} inkBarStyle={{backgroundColor: 'white'}}>

      {tabBuilder}

      </Tabs>
      </Aux>

    )
  }
}

const mapStateToProps = state => {

  let stateMap={
    webviewMenu:state.webviewMenu,
    isActive:{}
  }

  menuItems[state.webviewMenu].forEach((item) => {
    if (item.toggleItem ) {
       stateMap.isActive[item.toggleItem] = state["isActive"+item.toggleItem]
    }
  })

  return stateMap
};

const mapDispatchToProps =  dispatch => {
  return {
    onToggle: (toggleName) => dispatch({type: 'UPD_TOGGLE', value: toggleName}),
    onViewChange: () => dispatch({type: 'UPD_MENU', value:'discover'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WebviewFooterMenu);
