import React, { Component } from 'react'


import classes from './NavBar.css'


import FestbotLogo from './FestbotLogo.jsx'
import MenuContainer from './MenuBar.jsx'


export class NavBar extends Component {
  render() {
    return (
      <div className={classes.navBarContainer} >
        <FestbotLogo/>
        <MenuContainer/>
      </div>
    )
  }
}

export default NavBar
