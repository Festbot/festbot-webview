import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux.jsx';
import { connect } from 'react-redux';
import classes from './DiscoverContainer.css';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';
import 'babel-polyfill';
import * as Ramda from 'ramda';
import moment from 'moment';

import HeaderBar from '../../../ui/HeaderBar.jsx';
import SearchBar from '../../../ui/SearchBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Details from './Details.jsx'
import DiscoverArtistItem from './DiscoverArtistItem.jsx'

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
		data: [],
		yListOffset: 0,
		activeDetails: '',
		slideIndex: 0
	};



	async componentDidMount() {
		//this.props.onViewChange('program_list');

		let { data } = await axios.get(
			'http://159.65.198.31:5984/artists/_design/default/_list/json/default-view'
		);
		//console.log(data)

		this.setState({ searchResults: data, data: data });

		console.log('artist data:', data);
		console.log('state search results:', this.state.searchResults);

		//window.addEventListener("scroll", this.onScroll)
		if (!this.props.match.params.artist_name == '') {
			this.artistKeywordFilter(this.props.match.params.artist_name);
		}
	}

	detailsIsOpenHandler = e => {
    


    //const rect = this.activeDetailsDiv.getBoundingClientRect();
    //console.log('DETAILS POSITION:' ,rect,"height:", this.props.detailsPanelHeight)
    //console.log('client height:' ,document.body.clientHeight)
    //window.scrollTo( 0, document.body.clientHeight-rect.top-100 );

    
		if (this.state.activeDetails === e.currentTarget.id) {
      
			this.setState({ activeDetails: '',isOpenDetails: false  });
		} else {
			this.setState({ activeDetails: e.currentTarget.id,isOpenDetails: true  });
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
	};


	render() {
		const sliceOfArtist = this.state.searchResults.slice(
			this.state.yListOffset,
			this.state.yListOffset + 400
		);
		const artistList = sliceOfArtist.map(artist => {
        return <DiscoverArtistItem 
        isActiveDetails = {this.state.activeDetails === artist.name}
        isOpenDetails={this.state.isOpenDetails}
        artist={artist}
        detailsIsOpenHandler={this.detailsIsOpenHandler}
      />

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
	};
};



export default connect(mapStateToProps)(
	DiscoverContainer
);


