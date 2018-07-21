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

		let {
			data: { docs: data }
		} = await axios.post('https://api.festbot.com/artists/_find', { selector: { name: { $regex: '(?i)' } }, limit: 100, sort: [{ featured: 'desc' }, { popularity: 'desc' }] });

		this.setState({ searchResults: data, data: data });

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
					this.matchingArtists();
				} catch (error) {
					console.warn('get user data error', error);
					alert('Network Error');
				}
			},
			async err => {
				console.warn('no psid :(');
				const { data } = await getUserId(this.props.userData.userId);
				this.props.setUser(data);
				this.matchingArtists();
			}
		);
	}

	matchingArtists = async () => {
		if (!this.props.userData.userDataReceived) {
			return;
		}
	
		let {
			data: { docs: exceptTopArtists }
		} = await axios.post('https://api.festbot.com/artists/_find', {
			selector: { genres: { $in: this.props.userData.topGenres }, $nor: [{ name: { $in: this.props.userData.topArtists } }] },
			limit: 100,
			sort: [{ featured: 'desc' }, { popularity: 'desc' }]
		});

		let {
			data: { docs: topArtists }
		} = await axios.post('https://api.festbot.com/artists/_find', {
			selector: { name: { $in: this.props.userData.topArtists } },
			limit: 100,
			sort: [{ featured: 'desc' }, { popularity: 'desc' }]
		});

		const listOfPersonalPreferences = topArtists.concat(exceptTopArtists);

		this.setState({
			searchResults: listOfPersonalPreferences,
			matchingArtists: listOfPersonalPreferences,
			listTitle: `Artists for You`
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

	artistKeywordFilter = async keyword => {
		let {
			data: { docs: filteredResults }
		} = await axios.post('https://api.festbot.com/artists/_find', {
			selector: { $or: [{ name: { $regex: '(?i)' + keyword } }, { genres: { $elemMatch: { $regex: '(?i)' + keyword } } }] },
			limit: 100,
			sort: [{ featured: 'desc' }, { popularity: 'desc' }]
		});

		if (filteredResults.length == 0) return;

		this.setState({
			activeDetails: '',
			isOpenDetails: false,
			searchResults: filteredResults,
			listTitle: `Search results: ${filteredResults.length == 100 ? '100+' : filteredResults.length}`
		});

		if (filteredResults.length == 1) {
			this.setState({
				activeDetails: filteredResults[0].name,
				isOpenDetails: true,
				searchResults: filteredResults,
				listTitle: ''
			});
		}

		if (keyword == '' && !this.props.userData.userId == '') {
			this.setState({ searchResults: this.state.matchingArtists, listTitle: 'Artists for You' });
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

	genresList = () => {
		let genresList = '';

		if (!this.props.userData.topGenres) {
			return;
		}

		return (genresList = (
			<div>
			
				<div className={classes.detailsContentGenre}>
					{this.props.userData.topGenres.map((genre, i) => {
						return (
							<div key={i} onClick={()=>this.artistKeywordFilter(genre)} className={classes.genreItem}>
								{genre}
							</div>
						);
					})}
				</div>
			</div>
		));
	};

	render() {
		const sliceOfArtist = this.state.searchResults.slice(this.state.yListOffset, this.state.yListOffset + 400);

		const artistList = sliceOfArtist.map((artist, index) => {
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
				<div className={classes.searchBarBackground}>
					<SearchBar defaultValue={this.props.match.params.artist_name} searchQueryChanged={this.artistKeywordFilter} />
				</div>

				{this.genresList()}
				<div className={classes.listTitle}>{this.state.listTitle}</div>
				{artistList}
				<ScrollToTop showUnder={1000}>
					<span className={classes.scrollToTopButton}>UP</span>
				</ScrollToTop>
			</div>
		);
	}
}

const mapStateToProps = ({festbot}) => {
	return {
		detailsPanelHeight: festbot.detailsPanelHeight,
		userData: {
			userId: festbot.userId,
			activeFestival: festbot.activeFestival,
			savedArtists: festbot.savedArtists,
			savedShows: festbot.savedShows,
			topArtists: festbot.topArtists,
			topGenres: festbot.topGenres,
			userDataReceived: festbot.userDataReceived
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setUser: userData => dispatch({ type: 'SET_USER', value: userData }),
		onViewChange: actualViewMenu => dispatch({ type: 'UPD_MENU', value: actualViewMenu })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DiscoverContainer);
