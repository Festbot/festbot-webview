import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu.jsx'


import classes from './MenuBar.css';

export class MenuBar extends Component {
	render() {
		return (
			<div className={classes.menuContainer}>
				
					<Link to='/' className={classes.menuItem}>Home</Link>
					<Link to='#features' className={classes.menuItem}>Features</Link>
					<Link to='/artist_browser' className={classes.menuItem}>Artist Browser</Link>
					<Link to='/festival_catalog' className={classes.menuItem}>Festival Catalog</Link>
					<Link to='/partner' className={classes.partner}>Partner</Link>
				<MobileMenu/>
			</div>
		);
	}
}

export default MenuBar;
