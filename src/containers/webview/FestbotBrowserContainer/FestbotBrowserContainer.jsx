import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import 'babel-polyfill';

import { getUserData } from '../../../helpers/apiHelper.js';


import classes from './FestbotBrowserContainer.css';

import { List, ListItem } from 'material-ui/List';

import CircularProgress from 'material-ui/CircularProgress';


import SearchBar from '../../../ui/SearchBar.jsx';
import ScrollToTop from 'react-scroll-up';

import FestivalListBuilder from '../FestivalBrowser/FestivalListBuilder.jsx';

import { Helmet } from 'react-helmet';

import md5 from 'md5';

const styles = {
	button: {
		margin: 0,
		height: 40
	}
};

export class FestivalBrowserContainer extends Component {
	state = {
		searchResults: [],
		data: []
	};

	async componentDidMount() {
		this.props.setMenu('hide');
		this.props.setActiveDay('ALL');
		this.props.setActiveStage('HELYSZÍNEK');

		let { data } = await axios.get('https://api.festbot.com/festivals/_design/default/_list/all-data/default-view');

		this.setState({ searchResults: data, data: data });

		MessengerExtensions.getContext(
			'817793415088295',
			async ({ psid }) => {
				//console.log('psid', psid);
				try {
					const userId = md5(psid);
					const data = await getUserData(userId);
					this.props.setUser(data);
				} catch (error) {
					//	console.warn('get user data error', error);
					alert('Network Error');
				}
			},
			async err => {
				//console.warn('no psid :(');
				const data = await getUserData(this.props.userData.userId);
				this.props.setUser(data);
			}
		);
	}

	festivalListFilter = keyword => {
		const filteredResults = this.state.data.filter(festival => {
			return festival.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || festival.description.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
		});

		if (filteredResults.length == 0) return;
		this.setState({ searchResults: filteredResults });
	};

	render() {
		if (this.state.data.length === 0) {
			return (
				<div className={classes.center}>
					<CircularProgress style={{ margin: 'auto' }} size={80} thickness={5} />
				</div>
			);
		}

		if (this.props.match.path == '/festivals' && this.props.userData.activeFestival) {
			return <Redirect to={`/festival/${this.props.userData.activeFestival}`} />;
		}

		return (
			<div style={{ paddingBottom: '80px'}}>
				<Helmet>{this.props.match.path == '/' ? <title>Festbot - Activation</title> : <title>Festival browser</title>}</Helmet>
				<div className={classes.searchBarBackground}>
					<SearchBar searchQueryChanged={this.festivalListFilter} />
				</div>
				<List>
					<FestivalListBuilder festivals={this.state.searchResults} handleOpen={this.handleOpen} showActivation={this.props.match.path == '/'} />
				</List>
				<ScrollToTop showUnder={500}>
					<span className={classes.scrollToTopButton}>UP</span>
				</ScrollToTop>
			</div>
		);
	}
}

const mapStateToProps = ({festbot}) => {
	return {
		webviewMenu: festbot.webviewMenu,
		isActive: {
			Trending: festbot.isActiveTrending,
			Filter: festbot.isActiveFilter,
			Favourite: festbot.isActiveFavourite
		},
		userData: {
			userId: festbot.userId,
			activeFestival: festbot.activeFestival,
			savedArtists: festbot.savedArtists,
			savedShows: festbot.savedShows,
			topArtists: festbot.topArtists,
			topGenres: festbot.topGenres
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTrendingToggle: () => dispatch({ type: 'UPD_TRENDING' }),
		onFilterToggle: () => dispatch({ type: 'UPD_FILTER' }),
		onFavouriteToggle: () => dispatch({ type: 'UPD_FAVOURITE' }),
		setMenu: actualViewMenu => dispatch({ type: 'UPD_MENU', value: actualViewMenu }),
		setUser: userData => dispatch({ type: 'SET_USER', value: userData }),
		setActiveDay: day => dispatch({ type: 'UPD_ACTIVEDAY', value: day }),
		setActiveStage: stage => dispatch({ type: 'UPD_ACTIVESTAGE', value: stage })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FestivalBrowserContainer);
