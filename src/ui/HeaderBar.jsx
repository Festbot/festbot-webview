import React, { Component } from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import NavigationBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import classes from './HeaderBar.css'

export class headerBar extends Component {
	render() {
		return (

      
      <div className={classes.mainHeader} >
      <Tab className={classes.tab}
      icon={<NavigationBackIcon/>}

    />
    <div className={classes.headerTitle}>
    <h1>Festbot activation</h1>
    </div>
      
			</div>
		);
	}
}

export default headerBar;
