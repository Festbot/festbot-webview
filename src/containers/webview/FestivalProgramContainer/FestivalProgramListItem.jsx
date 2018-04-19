import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'

import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';
import { Rating } from 'material-ui-rating';
import IconDetails from 'material-ui/svg-icons/navigation/expand-more';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconHeadset from 'material-ui/svg-icons/hardware/headset';

import IconInfo from 'material-ui/svg-icons/action/event';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import { GridList, GridTile } from 'material-ui/GridList';
import { IconButton } from 'material-ui';

import * as colors from 'material-ui/styles/colors';

import { List, ListItem } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import classes from './FestivalProgramListItem.css';

import ProgramDetails from './ProgramDetails.jsx'


const styles = {
	icon: {
		marginRight: 5,
		marginLeft: 5,
		fontSize: '12px',
		color: colors.orange800
	},
	rate: {
		marginRight: 5,
		marginLeft: 5,
		fontSize: '12px',
		color: colors.yellow700
	}
};
const propsEventRating= 4.5;



class FestivalProgramListItem extends Component {
  state={
    slideIndex: 0,
  }
  



  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  
  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop
  }

  

  detailsContentOpenHandler = (e) => {
    
    if (!this.props.isOpenDetails) {
      setTimeout(() => {
        window.scrollTo(0,this.offset(this.activeDetailsDiv)-45)
      }, 700);
    }
    this.props.detailsIsOpenHandler(e)
  }
  
  


render() {

      let propsEventLocation= 'Not announced yet'
      if (this.props.event.place!=='') {
        propsEventLocation = this.props.event.place;
      }
      let renderingDetails=''
      if (this.props.isOpenDetails) {

        renderingDetails = <ProgramDetails 
          artist={this.props.event.artist_slug}
          event={this.props.event}
          eventRating={propsEventRating}
          />
      }


    return (
    <div >

    <div ref={element => (this.activeDetailsDiv = element)} className={classes.listItemContainer}  style={{maxHeight: (this.props.isOpenDetails) ? '1000px' : '120px',minHeight: (this.props.isOpenDetails) ? '300px' : '120px' , backgroundImage: 'url(http://festbot.com/assets/img/artist/'+this.props.event.artistId+'.jpg)'}} >
    <div id={this.props.event.artist} onClick={this.detailsContentOpenHandler} className={classes.listItemWrapper} >
      
      <div className={classes.backdropLayer} ></div>
      <div className={classes.title}>{this.props.event.artist}</div> 
      <div className={classes.starIcon} onClick={(e)=>{e.stopPropagation()}} >
        <IconButton className={classes.iconButtonRoot} iconStyle={{width:'35',height: '35'}} style={{width:'40',height:'40'}} name={this.props.event._id} primary={this.props.isActiveItem} onClick={this.props.addToFavourite} > {this.props.isActiveItem ? (<Star color={colors.orange900} />) : (<StarBorder color={colors.blueGrey300} />)}</IconButton>
      </div>
      <div className={classes.detailsIcon}>  {!this.props.isOpenDetails ? (<IconDetails color="white"/>) : (<IconClose color="white"/>)}</div> 
      <div className={classes.country}>{moment(this.props.event.startDate).format('LT')}</div>
      <div className={classes.stage}>{propsEventLocation}</div>
      <div className={classes.stage}></div>
      <div className={classes.details} style={{maxHeight: (this.props.isOpenDetails) ? '880px' : '0px',padding: (this.props.isOpenDetails) ? '0' : '0px'}}>
        {renderingDetails}

      </div>  

    </div>

    </div>   
    </div>

    );
  }
 
};



export default FestivalProgramListItem;
