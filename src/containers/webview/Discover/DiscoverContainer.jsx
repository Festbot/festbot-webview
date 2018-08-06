import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classes from './DiscoverContainer.css';

import 'babel-polyfill';

import SearchBar from '../../../ui/SearchBar.jsx';

import DiscoverArtistItem from './DiscoverArtistItem.jsx';

import ScrollToTop from 'react-scroll-up';

import {initMatchingArtistsOfUser,updateSearchResults} from '../../../store/actions'
import {getArtistsByNameGenre} from '../../../helpers/artistApiHelper.js'
 

export class DiscoverContainer extends Component {
	state = {
		data: [],
		yListOffset: 0,
		activeDetails: '',
		slideIndex: 0,
		lastOpenedDetailsHeight: 0,
		lastOpenedDetailsKey: 0
	};

	async componentDidMount() {
		this.props.onViewChange('hide');
			
		if (!this.props.match.params.artist_name == '') {
			this.artistKeywordFilter(this.props.match.params.artist_name);
		}

		this.props.initMatchingArtistsOfUser()
		
		if (this.props.userData.userDataReceived) {
			this.setState({
				listTitle: `Artists for You`
			});
		}

	}


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
		
		let filteredResults= await getArtistsByNameGenre(keyword)

		if (filteredResults.length == 0) return;
		this.props.updateSearchResults(filteredResults)
		this.setState({
			activeDetails: '',
			isOpenDetails: false,
			listTitle: `Search results: ${filteredResults.length == 100 ? '100+' : filteredResults.length}`
		});

		if (filteredResults.length == 1) {
			this.props.updateSearchResults(filteredResults)
			this.setState({
				activeDetails: filteredResults[0].name,
				isOpenDetails: true,
				listTitle: ''
			});
		}

		if (keyword == '' && !this.props.userData.userId == '') {
			this.setState({listTitle: 'Artists for You' });
			this.props.updateSearchResults(this.props.matchingArtists)
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
		if (!this.props.searchResults) {return <div></div>}
		const sliceOfArtist = this.props.searchResults.slice(this.state.yListOffset, this.state.yListOffset + 400);

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

const mapStateToProps = ({festbot,discover}) => {
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
		},
		searchResults: discover.searchResults,
		matchingArtists:discover.matchingArtists

	};
};

const mapDispatchToProps = dispatch => {
	return {
		setUser: userData => dispatch({ type: 'SET_USER', value: userData }),
		onViewChange: actualViewMenu => dispatch({ type: 'UPD_MENU', value: actualViewMenu }),
		initMatchingArtistsOfUser: ()=>dispatch(initMatchingArtistsOfUser()),
		updateSearchResults:data=>dispatch(updateSearchResults(data))

	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DiscoverContainer);
