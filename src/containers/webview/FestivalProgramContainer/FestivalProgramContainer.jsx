import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux.jsx';
import { connect } from 'react-redux';
import classes from './FestivalProgramContainer.css';
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

import DatePicker from 'material-ui/DatePicker';
import { GridList, GridTile } from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconToday from 'material-ui/svg-icons/action/today';
import IconLocation from 'material-ui/svg-icons/maps/add-location';

import FestivalProgramListItem from './FestivalProgramListItem.jsx'
//import FilterElements from './FilterElements.jsx'
import DaySwitcher from '../../../components/DaySwitcher.jsx'
import StageSwitcher from '../../../components/StageSwitcher.jsx'


const items = Array(15).fill(null).map((e,i) =>{
  return <MenuItem
  value={i}
  key={i}
  primaryText={`Festival Stage ${i}`}
/>
});


export class festivalProgramContainer extends Component {
	state = {
    controlledDate: null,
    selectedLocation: [0,1],
    searchResults: [],
    data: [],
    activeEvent: '',
    activeDetails: '',
    selectedDay:'',
    eventDays:[],
    yListOffset:0,
    artist:[],

    
  };
  

  async componentDidMount() {
		this.props.onViewChange('program_list');
    
    const {data:artist} = await axios.get("http://159.65.198.31:5984/artists/_design/default/_list/json/default-view")
    console.log('artist details ',artist)
    this.setState({artist: artist})


		let { data } = await axios.get(
			'http://159.65.198.31:5984/shows/_design/default/_list/all-data/order-by-date'
		);
		//console.log(data)
    
    const festivalProgramResults = data
    .filter(event => {
      return (
        (event.festival
          .toLowerCase()
          .indexOf(this.props.match.params.festival_name.toLowerCase()) > -1 )
      ) 
    })

    this.setState({ searchResults: festivalProgramResults, data: festivalProgramResults });

		console.log('this festival program data:', data);
    console.log('state search results:', this.state.searchResults);

    this.updateEventDays(this.state.searchResults)
    this.updateEventLocations(this.state.searchResults)

    //window.addEventListener("scroll", this.onScroll)

	}

  componentWillUnmount() {
    //window.removeEventListener("scroll", this.onScroll)
  }

  onScroll = () =>{  
    console.log('document scroll height: ',document.body.scrollHeight,'document body height: ',document.body.clientHeight ,window.scrollY)
    let docHeight= document.body.scrollHeight-document.body.clientHeight
    let trigger= docHeight-window.scrollY
    if (trigger<80) {
      this.showMore()
      this.setState(function(prevState) {
        return {
          paddingTop: window.scrollY-(document.body.clientHeight-prevState.paddingTop)
        };
      });
    }


  }

  updateEventDays = (data) => {
    let Programs = data
    let grouppedFestivalPrograms = this.groupByDays(Programs)
    let eventDays = Object.keys(grouppedFestivalPrograms).sort()

    this.props.eventDays(eventDays)
  }

  updateEventLocations = (data) => {
    let Programs = data
    let grouppedFestivalPrograms = this.groupByStages(Programs)
    let eventStages = Object.keys(grouppedFestivalPrograms).sort()
    this.props.eventStages(eventStages)
  }



  addToFavourite = e => {
		this.setState({
      activeEvent: e.currentTarget.name
		});
	};


	handleChange = (event, date) => {
		this.setState({
			controlledDate: date
		});
	};

	onChangeLocationHandler = (event, index, value) => {
		this.setState({ selectedLocation: value });
  };
  
  
  festivalEventKeywordFilter = keyword => {
	

		const filteredResults = this.state.data
			.filter(event => {
				return (
					(event.artist
						.toLowerCase()
						.indexOf(keyword.toLowerCase()) > -1 )||
          (event.place
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) > -1)
				) 
			})

		console.log('filtered Results', filteredResults);
		if (filteredResults.length == 0) return
		this.setState({ searchResults: filteredResults });

	};


  festivalEventFilter=()=>{
    
    return this.state.searchResults.filter(event => {
      return (
        ((this.props.activeDay =='ALL')||(moment(event.startDate).format('L').toLowerCase().indexOf(this.props.activeDay.toLowerCase()) > -1 )) &&
        ((this.props.activeStage =='ALL LOCATION')||(event.place.toLowerCase().indexOf(this.props.activeStage.toLowerCase()) > -1)) &&
        ((!this.props.isActive.Favourite)||(this.isActiveFavouriteItem(event.artist) ))

      )})
  }


  groupByDays = (events) => {
    const days = Ramda.groupBy(events => {
      return moment(events.startDate).format('L')
    })
    return days(events)
  };

  groupByStages = (events) => {
    const Stages = Ramda.groupBy(events => {
      return events.place
    })
    return Stages(events)
  };


  detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.id) {
			this.setState({ activeDetails: '' });
		} else {
			this.setState({ activeDetails: e.currentTarget.id });
			console.log(this.state.activeDetails);
		}
  };
  
  isActiveFavouriteItem = item =>{
		
		const filteredResults = this.props.favouriteArtists
			.filter(artist => {
				return (
					(artist.toLowerCase().indexOf(item.toLowerCase()) > -1 )
				) 
      })
    return filteredResults.length >0

	}


  favouriteItemToggle=(item)=>{
    console.log(item.currentTarget.name)
    if (this.isActiveFavouriteItem(item.currentTarget.name)) {
      this.props.removeFromFavourites(item.currentTarget.name)
      console.log('torles')
    } else {
      this.props.addToFavourites(item.currentTarget.name)
      console.log('hozza adas')
    }
    
    console.log(this.props.favouriteArtists)

	}




    showMore = () =>{
      this.setState(function(prevState) {
        return {
          yListOffset: prevState.yListOffset+3
        };
      });
    }

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

    
    
    const Programs = this.festivalEventFilter()
   
    const sliceOfPrograms = Programs.slice(this.state.yListOffset,this.state.yListOffset+100)
    const grouppedFestivalPrograms = this.groupByDays(sliceOfPrograms)

    const eventDays = Object.keys(grouppedFestivalPrograms).sort()
    console.log('napok: ',this.state.eventDays) 
  
    const programListByDay = eventDays.map((days,index) =>{
      return (
        <div style={{ paddingBottom: '40px' }}>
						<Subheader className={classes.subheader}>
							<h1 className={classes.listHeader}>
								{moment(days).format('LL')}
							</h1><span className={classes.dayIndex}>Day {index+1}</span>
						</Subheader>
						<Divider />
            <Divider />
           { grouppedFestivalPrograms[days].map((event, index) =>{
              return (
                <FestivalProgramListItem
										detailsIsOpenHandler={
											this.detailsIsOpenHandler
										}
										webviewMenuChange={this.props.onViewChange}
										event={event}
										addToFavourite={this.favouriteItemToggle}
										isActiveItem={
											this.isActiveFavouriteItem(event._id)
										}
										isOpenDetails={
											this.state.activeDetails ===
											event.artist
                    }
									/>
							
							);
            })}
        </div>
      )
    })




  

		return (
			<div className={classes.container}>
        <HeaderBar title={this.props.match.params.festival_name} />
        <DaySwitcher activeDayClicked={this.festivalEventDayFilterHandler}/>
        <StageSwitcher activeStageClicked={this.festivalEventStageFilterHandler}/>
     
        <SearchBar searchQueryChanged={this.festivalEventKeywordFilter} />
				<div style={{paddingBottom: '100px',paddingTop:this.state.paddingTop+'px'}}>
          {programListByDay}
          <button onClick={this.showMore}> show more </button>
        </div>
        
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
    eventStages: state.eventStages,
    activeStage: state.activeStage,
    activeDay: state.activeDay,
    eventDays: state.eventDays,
    webviewMenu: state.webviewMenu,
    favouriteArtists: state.favouriteArtists,
		isActive: {
			Trending: state.isActiveTrending,
			Filter: state.isActiveFilter,
			Favourite: state.isActiveFavourite
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTrendingToggle: () => dispatch({ type: 'UPD_TRENDING' }),
		onFilterToggle: () => dispatch({ type: 'UPD_FILTER' }),
		onFavouriteToggle: () => dispatch({ type: 'UPD_FAVOURITE' }),
		onViewChange: actualViewMenu =>
      dispatch({ type: 'UPD_MENU', value: actualViewMenu }),
    addToFavourites:(artist) => dispatch({type: 'ADD_FAVOURITE', value: artist}),
    removeFromFavourites:(artist) => dispatch({type: 'REMOVE_FAVOURITE', value: artist}),
    eventDays:(daysArray) => dispatch({type: 'UPD_EVENTDAYS', value: daysArray}),
    eventStages:(stagesArray) => dispatch({type: 'UPD_EVENTSTAGES', value: stagesArray}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	festivalProgramContainer
);
