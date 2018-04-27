import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import 'babel-polyfill';
import qs from 'query-string';
import {getUserId} from '../../../components/apiHelper.js'


import Aux from '../../../hoc/Aux/Aux.jsx';
import classes from './FestbotBrowserContainer.css';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Subheader from 'material-ui/Subheader';
import * as colors from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { GridList, GridTile } from 'material-ui/GridList';

import SearchBar from '../../../ui/SearchBar.jsx';

import FestivalListBuilder from '../FestivalBrowser/FestivalListBuilder.jsx';
import HeaderBar from '../../../ui/HeaderBar.jsx'

import {Helmet} from "react-helmet";

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
		this.props.onViewChange('festbot')

		let { data } = await axios.get(
			'https://api.festbot.com/festivals/_design/default/_list/all-data/default-view'
		);
		//console.log(data)
		// data = [...data, ...data, ...data];
		// data = data.map((item, key) => {
		// 	return { ...item, ...{ name: item.name + key } };
		// });


    this.setState({ searchResults: data, data: data });


		console.log('fest data:', data);
		console.log('state search results:', this.state.searchResults);


		console.log(this.props)
		const {userId} = qs.parse(this.props.location.search)

		MessengerExtensions.getContext('817793415088295',
  			function success(thread_context){
    			alert(thread_context.psid);
  			},
  			function error(err){
	    		alert('error');
  			}
		);

		if (!userId=='') {
			try {
				const {data} = await getUserId(userId)
				console.log(data)
				this.props.setUser(data)
			}
			catch (error) {
				alert('Network Error')
			}

		}



	}




	festivalListFilter = keyword => {
		console.log(keyword);
		console.log(
			'object keys search results:',
			Object.keys(this.state.data)
		);

		const filteredResults = this.state.data
			.filter(festival => {
				return (
					(festival.name
						.toLowerCase()
						.indexOf(keyword.toLowerCase()) > -1 )||
          (festival.description
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) > -1)
				)
			})

		console.log('filtered Results', filteredResults);
		if (filteredResults.length == 0) return
		this.setState({ searchResults: filteredResults });

	};

	render() {
		console.log('user data:',this.props.userData)

		if (this.state.data.length ===0) {
			return (
				<div className={classes.center}>
					<CircularProgress
						style={{ margin: 'auto' }}
						size={80}
						thickness={5}
					/>
				</div>
			);
		}

		return (
			<div style={{ paddingBottom: '80px' ,paddingTop: '80px'}}>
				<Helmet>
					<title>Festbot - Festivals</title>
				</Helmet>
				<GridList cols={2} cellHeight="auto" padding={1}>
        <HeaderBar title='Festbot Activation' />
				</GridList>
				<p />
				<SearchBar searchQueryChanged={this.festivalListFilter} />

				<List>
					<FestivalListBuilder
						festivals={this.state.searchResults}
            handleOpen={this.handleOpen}

					/>
				</List>
			</div>
		);
	}
}

const mapStateToProps = state => {

  return{
    webviewMenu:state.webviewMenu,
    isActive:{
      Trending: state.isActiveTrending,
      Filter: state.isActiveFilter,
			Favourite: state.isActiveFavourite,
		},
		userData:{
			userId: state.userId,
			activeFestival: state.activeFestival,
			savedArtists: state.savedArtists,
			savedShows: state.savedShows,
			topArtists: state.topArtists,
			topGenres: state.topGenres
		}

  };
};

const mapDispatchToProps =  dispatch => {
  return {
    onTrendingToggle: () => dispatch({type: 'UPD_TRENDING' }),
    onFilterToggle: () => dispatch({type: 'UPD_FILTER' }),
		onFavouriteToggle: () => dispatch({type: 'UPD_FAVOURITE'}),
		onViewChange: (actualViewMenu) => dispatch({type: 'UPD_MENU', value: actualViewMenu}),
		setUser: (userData) => dispatch ({type: 'SET_USER',value: userData}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FestivalBrowserContainer);


