import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import 'babel-polyfill';


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
			'http://159.65.198.31:5984/festivals/_design/default/_list/all-data/default-view'
		);
		//console.log(data)
		data = [...data, ...data, ...data];
		data = data.map((item, key) => {
			return { ...item, ...{ name: item.name + key } };
		});
	

    this.setState({ searchResults: data, data: data });


		console.log('fest data:', data);
		console.log('state search results:', this.state.searchResults);
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
        <HeaderBar />
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
      Favourite: state.isActiveFavourite
      
    }

  };
};

const mapDispatchToProps =  dispatch => {
  return {
    onTrendingToggle: () => dispatch({type: 'UPD_TRENDING' }),
    onFilterToggle: () => dispatch({type: 'UPD_FILTER' }),
		onFavouriteToggle: () => dispatch({type: 'UPD_FAVOURITE'}),
		onToggle: (toggleName) => dispatch({type: 'UPD_TOGGLE', value: toggleName}),
    onViewChange: (actualViewMenu) => dispatch({type: 'UPD_MENU', value: actualViewMenu})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FestivalBrowserContainer);


