import React, { Component } from 'react'
import classes from './FestivalProgramListItem.css';
import * as colors from 'material-ui/styles/colors';
import axios from 'axios';

import IconMap from 'material-ui/svg-icons/maps/near-me';
import IconHeadset from 'material-ui/svg-icons/hardware/headset';
import IconInfo from 'material-ui/svg-icons/action/event';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Rating } from 'material-ui-rating';

import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment';
import { SocialIcon } from 'react-social-icons';


export class ProgramDetails extends Component {
  state={
		slideIndex: 0,
		events:[],
		artist:{
			facebook:'',
			website:'',
			spotify:'',
			genres:[],

		}
  }

  async componentDidMount()  {
    
  const {data} = await axios.post("https://api.festbot.com/artists/_find",{selector:{slug: this.props.artist}})

	this.setState({artist: data.docs[0]})


}


handleChange = value => {
  this.setState({
    slideIndex: value
  });
};



  render() {
		const spotifyId = this.state.artist.spotify;
		
		const eventList = this.state.events.map((event,index)=>{
			return (
				<li>
					<div className={classes.CalendarContainer}>
						<div className={classes.CalendarRow}>{moment(event.startDate).format('MMM')}</div>
						<div className={classes.CalendarRow}>{moment(event.startDate).format('Do')}</div>
					</div>
					<div className={classes.venueName}>{event.festival}</div>
					<div className={classes.saveIcon}><StarBorder color={colors.blueGrey300} /></div>
				</li>
			)
		})

    return (
      <div>
      <Tabs
      onClick={(e)=>{e.stopPropagation()}}
      onChange={this.handleChange}
      value={this.state.slideIndex}
      tabItemContainerStyle={{backgroundColor: 'black',height:'45px'}}
      inkBarStyle={{backgroundColor:'white'}}
    >
      <Tab icon={<IconInfo />} label="" value={0} />
      <Tab icon={<IconHeadset />} label="" value={1} />
      <Tab icon={<IconMap />} label="" value={2} />
    </Tabs>
    <SwipeableViews
      index={this.state.slideIndex}
      onChangeIndex={this.handleChange}
    >
      <div>
  
        <div className={classes.detailsContent}>
          <div style={{width:'50%'}}>
            <h2>Start time: </h2>
            <p>{moment(this.props.event.startDate).format('hh:mm')}<br/>{moment(this.props.event.startDate).format('MMM Do (dddd)')}</p>
          </div>
          <div style={{width:'50%'}}>
            <h2>End time:</h2>
            <p>{moment(this.props.event.endDate).format('hh:mm')}<br/>{moment(this.props.event.endDate).format('MMM Do (dddd)')}</p>
         </div> 
        </div> 

        <div className={classes.detailsContent}>
        <div style={{width:'50%'}}>
            <h2>Rating: {this.props.eventRating}</h2>
            <Rating
                itemStyle={{
                  width: '25px',
                  padding: '0',
                  margin: '0'
                }}
                value={this.props.eventRating}
              />
          </div>
          <div style={{width:'50%'}}>
            <h2>Ticket:</h2>
            <p>{this.props.event.festival_slug}</p>
          </div> 
        </div>         

        <div className={classes.detailsContentGenre}>
        {this.state.artist.genres.map((genre,index) =>{
          return <div id={index} key={index} className={classes.inverse}>{genre}</div>
        })}
        </div>
        
      </div>

     

      {spotifyId ? (
        <div>
          <iframe src={'https://open.spotify.com/embed/artist/' + spotifyId} width="100%" height="300" seamless frameBorder={'0'} seamless allowtransparency="true" />
        </div>
      ) : (
        <div className={classes.centerCenter}>
          <p >Sorry we couldn't find the artist on Spotify</p>
        </div>
      )}


              <div className={classes.centerCenter}>
								<p>Map and Navigation will be available once the Location of the event has been confirmed by the organizer.</p>
							</div>
						</SwipeableViews>
					</div>
    )
  }
}

export default ProgramDetails
