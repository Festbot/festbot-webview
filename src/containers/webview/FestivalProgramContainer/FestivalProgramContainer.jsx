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
import FilterElements from './FilterElements.jsx'



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
    selectedDays:[0],
    eventDays:[],
    yListOffset:0,
    
  };
  

  async componentDidMount() {
		this.props.onViewChange('program_list');
	
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

    this.updateEventDays()

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

  updateEventDays = () => {
    let Programs = this.state.searchResults
    let grouppedFestivalPrograms = this.groupByDays(Programs)
    let eventDays = Object.keys(grouppedFestivalPrograms).sort()

   
    const eventDaysMenuItem = eventDays.map((e,i) =>{
      return <MenuItem
      value={i}
      key={i}
      primaryText={moment(e).format('LL')+' Day '+(i+1)}
    />
    });    


    this.setState(function(prevState) {
      return {
        eventDays: eventDaysMenuItem
      };
    });
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
  
  festivalEventFilter=()=>{

  }

  groupByDays = (events) => {
    const days = Ramda.groupBy(events => {
      return moment(events.startDate).format('L')
    })
    return days(events)
  };


  detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.title) {
			this.setState({ activeDetails: '' });
		} else {
			this.setState({ activeDetails: e.currentTarget.title });
			console.log(this.state.activeDetails);
		}
	};


    compare =(a,b)=>{
       // Use toUpperCase() to ignore character casing
      const startA = a.startDate.toUpperCase();
      const startB = b.startDate.toUpperCase();

      let comparison = 0;
      if (startA > startB) {
        comparison = 1;
      } else if (startA < startB) {
        comparison = -1;
      }
      return comparison;
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

   
    
    const Programs = this.state.searchResults
    // const sortList = Programs.sort(this.compare)
    // console.log('sorted: ',sortList)
    const sliceOfPrograms = Programs.slice(this.state.yListOffset,this.state.yListOffset+50)
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
										addToFavourite={this.addToFavourite}
										isActiveItem={
											this.state.activeEvent ===
											event.artist
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
        <FilterElements
          DateValue={this.state.controlledDate}
          DateOnChange={this.handleChange}
          LocationValue={this.state.selectedLocation}
          LocationOnChange={this.onChangeLocationHandler}
          LocationItems={items}
          isActiveFilter={this.props.isActive.Filter}
          EventDays={this.state.eventDays}
          SelectedDays={this.state.SelectedDays}
    
        />
        <SearchBar searchQueryChanged={this.festivalEventFilter} />
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
		webviewMenu: state.webviewMenu,
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
			dispatch({ type: 'UPD_MENU', value: actualViewMenu })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	festivalProgramContainer
);
