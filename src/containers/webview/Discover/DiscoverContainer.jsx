import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux.jsx';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classes from './DiscoverContainer.css';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';
import 'babel-polyfill';
import * as Ramda from 'ramda';
import moment from 'moment';
import { getUserId } from '../../../components/apiHelper.js';
import qs from 'query-string';

//import HeaderBar from '../../../ui/HeaderBar.jsx';
import SearchBar from '../../../ui/SearchBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Details from './Details.jsx';
import DiscoverArtistItem from './DiscoverArtistItem.jsx';

import IconDetails from 'material-ui/svg-icons/navigation/expand-more';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconHeadset from 'material-ui/svg-icons/hardware/headset';
import IconInfo from 'material-ui/svg-icons/action/event';

import md5 from 'md5';

import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import ScrollToTop from 'react-scroll-up';

export class DiscoverContainer extends Component {
	state = {
		searchResults: [],
		matchingArtists: [],
		data: [],
		yListOffset: 0,
		activeDetails: '',
		slideIndex: 0,
		lastOpenedDetailsHeight: 0,
		lastOpenedDetailsKey: 0
	};

	async componentDidMount() {
		this.props.onViewChange('hide');

		let { data } = await axios.get('https://api.festbot.com/artists/_design/webview/_view/order-by-featured?descending=true');

		this.setState({ searchResults: data.rows, data: data.rows });

		if (!this.props.match.params.artist_name == '') {
			this.artistKeywordFilter(this.props.match.params.artist_name);
		}


		MessengerExtensions.getContext(
			'817793415088295',
			async ({ psid }) => {
				try {
					const userId = md5(psid);
					const { data } = await getUserId(userId);
					this.props.setUser(data);
					
				} catch (error) {
					console.warn('get user data error', error);
					alert('Network Error');
				}
			},
			async (err) => {
				console.warn('no psid :(');
				const { data } = await getUserId(this.props.userData.userId);
				this.props.setUser(data);
			}
		);

		this.matchingArtists();
	}

	// groupByArtist = (artists) => {
	// 	const artistNames = Ramda.groupBy(artist=>{
	// 		return artist.name
	// 	})
	// 	return artistNames(artists)
	// };

	matchingArtists = () => {
		if (!this.props.userDataReceived) {return }
		const filteredResults = this.state.data.filter(artist => {
			if (!artist.genres) {
				return false;
			}
			return Ramda.intersection(this.props.userData.topGenres, artist.genres).length > 0;
		});

		const topArtists = this.state.data.filter(artist => {
			console.log(this.props.userData)
			return Ramda.contains(artist.name, this.props.userData.topArtists);
		});

		const exceptTopArtists = filteredResults.filter(artist => {
			return !Ramda.contains(artist.name, this.props.userData.topArtists);
		});

		const listOfPersonalPreferences = topArtists.concat(exceptTopArtists);

		// featured+listOfPersonalPreferences

		this.setState({
			searchResults: listOfPersonalPreferences,
			matchingArtists: listOfPersonalPreferences
		});
	};

	detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.id) {
			this.setState({ activeDetails: '', isOpenDetails: false, lastOpenedDetailsHeight: 0 });
		} else {
			this.setState({
				activeDetails: e.currentTarget.id,
				isOpenDetails: true
			});

			const lastOpenedDetaisWasBeforeThis = Number(this.state.lastOpenedDetailsKey) < Number(e.currentTarget.title);
			this.initLastOpenedDetailsHeight(this.state.lastOpenedDetailsHeight, lastOpenedDetaisWasBeforeThis);
			this.setState({ lastOpenedDetailsKey: e.currentTarget.title });
		}
	};

	artistKeywordFilter = keyword => {
		const filteredResults = this.state.data.filter(({ value: artist }) => {
			return (
				artist.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
				artist.genres.filter(genres => {
					return genres.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
				}).length > 0
			);
		});

		if (filteredResults.length == 0) return;
		this.setState({
			activeDetails: '',
			isOpenDetails: false,
			searchResults: filteredResults
		});
		if (filteredResults.length == 1) {
			this.setState({
				activeDetails: filteredResults[0].value.name,
				isOpenDetails: true,
				searchResults: filteredResults
			});
		}

		if (keyword == '' && !this.props.userData.userId == '') {
			this.setState({ searchResults: this.state.matchingArtists });
		}
	};

	setLastOpenedDetailsHeight = e => {
		this.setState({ lastOpenedDetailsHeight: e });
	};

	initLastOpenedDetailsHeight = (lastOpenedDetailsHeight, lastOpenedDetaisWasBeforeThis) => {
		if (lastOpenedDetailsHeight > 0 && lastOpenedDetaisWasBeforeThis) {
			window.scrollBy(0, -lastOpenedDetailsHeight);
			this.setState({ lastOpenedDetailsHeight: 0 });
		}
	};

	render() {
		const sliceOfArtist = this.state.searchResults.slice(this.state.yListOffset, this.state.yListOffset + 400);
		const artistList = sliceOfArtist.map(({ value: artist }, index) => {
			return (
				<DiscoverArtistItem
					key={index}
					index={index}
					isActiveDetails={this.state.activeDetails === artist.name}
					isOpenDetails={this.state.isOpenDetails}
					artist={artist}
					detailsIsOpenHandler={this.detailsIsOpenHandler}
					setLastOpenedDetailsHeight={this.setLastOpenedDetailsHeight}
				/>
			);
		});

		return (
			<div className={classes.container}>
				<Helmet>
					<title>Discover Artist</title>
				</Helmet>

				<SearchBar defaultValue={this.props.match.params.artist_name} searchQueryChanged={this.artistKeywordFilter} />
				{artistList}
				<ScrollToTop showUnder={1000}>
					<span className={classes.scrollToTopButton}>UP</span>
				</ScrollToTop>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		detailsPanelHeight: state.detailsPanelHeight,
		userData: {
			userId: state.userId,
			activeFestival: state.activeFestival,
			savedArtists: state.savedArtists,
			savedShows: state.savedShows,
			topArtists: state.topArtists,
			topGenres: state.topGenres,
			userDataReceived: state.userDataReceived
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setUser: userData => dispatch({ type: 'SET_USER', value: userData }),
		onViewChange: actualViewMenu => dispatch({ type: 'UPD_MENU', value: actualViewMenu })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverContainer);
