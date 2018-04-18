import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux.jsx';
import { connect } from 'react-redux';
import classes from './DiscoverContainer.css';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';
import 'babel-polyfill';
import * as Ramda from 'ramda';
import moment from 'moment'

import HeaderBar from '../../../ui/HeaderBar.jsx';
import SearchBar from '../../../ui/SearchBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import IconDetails from 'material-ui/svg-icons/navigation/expand-more';



export class DiscoverContainer extends Component {
  state = {

    searchResults: [],
    data: [],
    yListOffset:0,
    activeDetails: '',

  };
  
  
  async componentDidMount() {
		//this.props.onViewChange('program_list');
	
		let { data } = await axios.get(
			'http://159.65.198.31:5984/artists/_design/default/_list/all-data/default-view'
		);
		//console.log(data)
    

    this.setState({ searchResults: data, data: data });

		console.log('artist data:', data);
    console.log('state search results:', this.state.searchResults);

  

    //window.addEventListener("scroll", this.onScroll)
    this.artistKeywordFilter(this.props.match.params.artist_name)
	}

  detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.id) {
      this.setState({ activeDetails: '' });
      this.setState({ isOpenDetails: false });
		} else {
    
			this.setState({ activeDetails: e.currentTarget.id });
      console.log(this.state.activeDetails);
      this.setState({ isOpenDetails: true });
      
		}
  };

  artistKeywordFilter = keyword =>{

		const filteredResults = this.state.data
    .filter(artist => {
      return (
        (artist.name
          .toLowerCase()
          .indexOf(keyword.toLowerCase()) > -1 )||
        (artist.genres.filter(genres =>{
          return (genres.toLowerCase().indexOf(keyword.toLowerCase()) > -1)
          }).length > 0
        )
      )
    })

  console.log('filtered Results', filteredResults);
  if (filteredResults.length == 0) return
  this.setState({ activeDetails: '' , isOpenDetails: false ,searchResults: filteredResults });
  if (filteredResults.length == 1) {
    this.setState({ activeDetails: filteredResults[0].name,isOpenDetails: true,searchResults: filteredResults });
  }
  
  }


  render() {



    const sliceOfArtist = this.state.searchResults.slice(this.state.yListOffset,this.state.yListOffset+100)
    const artistList = sliceOfArtist.map((artist) =>{

      let renderingDetails=''
        if (this.state.isOpenDetails) {
          

          renderingDetails = <div>
        <div className={classes.detailsHeader}>On tour</div> 
        <div className={classes.detailsContent}>
        <p></p><p></p>
          Sziget: 18 April, 2018
          <p></p>
          Tomorrowland: 18 April, 2018
          <p></p>
          Custom festival: 18 April, 2018
          <p></p><p></p>
        </div> 

        <div className={classes.detailsHeader}>Details</div>
        <div className={classes.detailsContent}>
        <p></p><p></p>
          Facebook: {artist.facebook}
          <p></p>
          Website: {artist.website}
          <p></p>
        </div>
      </div>
        }

      return (
        <div className={classes.listItemContainer}  style={{maxHeight: (this.state.activeDetails ===
          artist.name) ? '600px' : '120px',minHeight: (this.state.activeDetails ===
            artist.name) ? '414px' : '120px' , backgroundImage: 'url(http://festbot.com/assets/img/artist/'+artist._id+'.jpg)'}} >
          <div className={classes.listItemWrapper} >
            
            <div className={classes.backdropLayer} id={artist.name} onClick={this.detailsIsOpenHandler}></div>
            <div className={classes.title}>{artist.name}</div> 
            <div className={classes.detailsIcon}><IconDetails color="white"/></div> 
            <div className={classes.country}>{artist.country}</div>
            <div className={classes.details} style={{maxHeight: (this.state.activeDetails ===
              artist.name) ? '480px' : '0px',padding: (this.state.activeDetails ===
                artist.name) ? '16px' : '0px'}}>
              {renderingDetails}

            </div>  

          </div>
          
          
        </div>
        
      )})

    return (
      <div className={classes.container}>
        <HeaderBar title="Discover" />
     
        <SearchBar defaultValue={this.props.match.params.artist_name} searchQueryChanged={this.artistKeywordFilter} />
        {artistList}
      </div>
    )
  }
}

export default DiscoverContainer
