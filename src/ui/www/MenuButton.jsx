import React from 'react';
import classes from './MenuButton.css';


const menuButton = (props) => {
  return (
    <div onClick={props.clicked} className={classes.MenuButton} >

     <div className={classes.MenuLine} ></div>
     <div className={classes.MenuLine} ></div>
     <div className={classes.MenuLine} ></div>
    </div>
  )
}

export default menuButton
