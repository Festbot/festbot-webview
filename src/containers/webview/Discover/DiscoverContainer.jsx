import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux.jsx';
import { connect } from 'react-redux';
import classes from './DiscoverContainer.css';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';
import 'babel-polyfill';
import * as Ramda from 'ramda';
import moment from 'moment';
import { getUserId } from '../../../components/apiHelper.js';
import qs from 'query-string';

import HeaderBar from '../../../ui/HeaderBar.jsx';
import SearchBar from '../../../ui/SearchBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Details from './Details.jsx';
import DiscoverArtistItem from './DiscoverArtistItem.jsx';

import IconDetails from 'material-ui/svg-icons/navigation/expand-more';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconHeadset from 'material-ui/svg-icons/hardware/headset';
import IconInfo from 'material-ui/svg-icons/action/event';

import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

export class DiscoverContainer extends Component {
	state = {
		searchResults: [],
		matchingArtists: [],
		data: [],
		yListOffset: 0,
		activeDetails: '',
		slideIndex: 0
	};

	async componentDidMount() {
		//this.props.onViewChange('program_list');

		let { data } = await axios.get(
			'https://api.festbot.com/artists/_design/default/_list/json/default-view'
		);
		//console.log(data)

		this.setState({ searchResults: data, data: data });

		console.log('artist data:', data);
		console.log('state search results:', this.state.searchResults);

		//window.addEventListener("scroll", this.onScroll)
		if (!this.props.match.params.artist_name == '') {
			this.artistKeywordFilter(this.props.match.params.artist_name);
		}

		const { userId } = qs.parse(this.props.location.search);
		if (!userId == '') {
			try {
				const { data } = await getUserId(userId);
				console.log(data);
				this.props.setUser(data);
			} catch (error) {
				alert('Network Error');
			}
		}

		this.matchingArtists();
	}

	// groupByArtist = (artists) => {
	// 	const artistNames = Ramda.groupBy(artist=>{
	// 		return artist.name
	// 	})
	// 	return artistNames(artists)
	// };
 

	matchingArtists = () => {
		const filteredResults = this.state.data.filter(artist => {
			return (
				Ramda.intersection(this.props.userData.topGenres, artist.genres)
					.length > 0
			);
		});

		console.log('Match GENRES LIST:', filteredResults);

		console.log('TOP ARTISTS:', this.props.userData.topArtists);

		const topArtists = this.state.data.filter(artist => {
			return (
				Ramda.contains(artist.name,this.props.userData.topArtists)
			);
		});


		console.log('Artist results of TOP ARTISTS:', topArtists);

		const exceptTopArtists = filteredResults.filter(artist => {
			return (
				!Ramda.contains(artist.name,this.props.userData.topArtists)
			);
		});

		// const grouppedArtistNames = this.groupByArtist(filteredResults)
		// const grouppedTopArtistNames =this.groupByArtist(topArtists)

		// const exceptTopArtists = Ramda.difference(Object.keys(this.groupByArtist(filteredResults)),Object.keys(this.groupByArtist(topArtists))).map(artist =>{
		// 	return 
		// })
		//const exceptTopArtists = Object.keys(grouppedTopArtistNames)
		
		console.log('Artist results EXCEPT of TOP ARTISTS:', exceptTopArtists);

		const listOfPersonalPreferences = topArtists.concat(exceptTopArtists);

		//const listOfPersonalPreferences = Ramda.symmetricDifference(topArtists,filteredResults)

		this.setState({
			searchResults: listOfPersonalPreferences,
			matchingArtists: listOfPersonalPreferences
		});
	};

	detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.id) {
			this.setState({ activeDetails: '', isOpenDetails: false });
		} else {
			this.setState({
				activeDetails: e.currentTarget.id,
				isOpenDetails: true
			});
		}
	};

	artistKeywordFilter = keyword => {
		const filteredResults = this.state.data.filter(artist => {
			return (
				artist.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
				artist.genres.filter(genres => {
					return (
						genres.toLowerCase().indexOf(keyword.toLowerCase()) > -1
					);
				}).length > 0
			);
		});

		console.log('filtered Results', filteredResults);
		if (filteredResults.length == 0) return;
		this.setState({
			activeDetails: '',
			isOpenDetails: false,
			searchResults: filteredResults
		});
		if (filteredResults.length == 1) {
			this.setState({
				activeDetails: filteredResults[0].name,
				isOpenDetails: true,
				searchResults: filteredResults
			});
		}

		if (keyword == '' && !this.props.userData.userId=='') {
			this.setState({ searchResults: this.state.matchingArtists });
		}
	};

	render() {
		const sliceOfArtist = this.state.searchResults.slice(
			this.state.yListOffset,
			this.state.yListOffset + 400
		);
		const artistList = sliceOfArtist.map((artist, index) => {
			return (
				<DiscoverArtistItem
					key={index}
					isActiveDetails={this.state.activeDetails === artist.name}
					isOpenDetails={this.state.isOpenDetails}
					artist={artist}
					detailsIsOpenHandler={this.detailsIsOpenHandler}
				/>
			);
		});

		return (
			<div className={classes.container}>
				<HeaderBar title="Discover" />

				<SearchBar
					defaultValue={this.props.match.params.artist_name}
					searchQueryChanged={this.artistKeywordFilter}
				/>
				{artistList}
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
			topGenres: state.topGenres
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setUser: userData => dispatch({ type: 'SET_USER', value: userData })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverContainer);
