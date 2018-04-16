import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment'

import classes from './DaySwitcher.css'

export class DaySwitcher extends Component {


  festivalEventDayFilterHandler=(activeDay)=>{
    const day = this.props.eventDays[activeDay.currentTarget.id]
    this.props.setActiveDay(day) 
    if (activeDay.currentTarget.id=='ALL') {this.props.setActiveDay('ALL') }
  }


  render() {
    console.log('active Day',this.props.activeDay)
    console.log('event Days',this.props.eventDays)
    const eventDaysSwitcherItem = this.props.eventDays.map((e,i) =>{
      return <div id={i} onClick={this.festivalEventDayFilterHandler} className={(this.props.activeDay==this.props.eventDays[i]) ? classes.active : classes.item }>
      {moment(e).format('dddd M[/]D')}
      </div>
 
    });    

    return (
      <div className={classes.container} style={this.props.isActive.Filter? {height: '44px'}:{height: '0px'}}>
      <div id='ALL' onClick={this.festivalEventDayFilterHandler} className={(this.props.activeDay=="ALL") ? classes.active : classes.item }>ALL</div>
      {eventDaysSwitcherItem}
      </div>
    )
  }
}



const mapStateToProps = state => {
	return {
    eventDays: state.eventDays,
    activeDay: state.activeDay,
		isActive: {
			Filter: state.isActiveFilter,
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
    setActiveDay: day => dispatch({type: 'UPD_ACTIVEDAY', value: day}),

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DaySwitcher);





