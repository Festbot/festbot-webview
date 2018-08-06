import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './FestivalProgramContainer.css';
import axios from 'axios';
import 'babel-polyfill';
import * as Ramda from 'ramda';
import moment from 'moment';
import { saveFavouriteEvent, removeFavouriteEvent } from '../../../helpers/apiHelper.js';
import { Helmet } from 'react-helmet';
import SearchBar from '../../../ui/SearchBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FestivalProgramListItem from './FestivalProgramListItem.jsx';
import ScrollToTop from 'react-scroll-up';
import FilterSwitchers from '../../../containers/webview/FestivalProgramContainer/FilterSwitchers.jsx';
import DaySwitcher from '../../../components/DaySwitcher';

export class festivalProgramContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			now: new Date(),
			controlledDate: null,
			selectedLocation: [0, 1],
			searchResults: [],
			data: [],
			activeEvent: '',
			activeDetails: '',
			selectedDay: '',
			eventDays: [],
			yListOffset: 0,
			artist: [],
			lastOpenedDetailsHeight: 0,
			lastOpenedDetailsKey: 0,
			isEventListExist: true,
			isEventExpired:false,
			festival: ''
		};
	}

	async componentDidMount() {
		this.props.onViewChange('program_list');

		const { data: festival } = await axios.get(`https://api.festbot.com/festivals/${this.props.match.params.festival_id}`);

		this.setState({ festival: festival });

		const { data: artist } = await axios.get('https://api.festbot.com/artists/_design/default/_list/json/default-view');

		this.setState({ artist: artist });

		let { data } = await axios.get('https://api.festbot.com/events/_design/default/_list/all-data/order-by-date');

		const festivalProgramResults = data.filter(event => event.festivalId === this.props.match.params.festival_id);

		if (festivalProgramResults.length == 0) {
			this.setState({ isEventListExist: false });
		}

		if ((this.filterPastEvents(festivalProgramResults).length == 0)&&(!festivalProgramResults.length == 0)) {
			this.setState({ isEventExpired: true });
		}

		this.setState({ searchResults: this.filterPastEvents(festivalProgramResults), data: festivalProgramResults });
		this.updateEventDays(this.state.searchResults);
		this.updateEventLocations(this.state.searchResults);

		//this.initEventDay(); ha azt akarjuk hogy ugorjon bele az aktualis napba, de amiota szurjuk az almult napokat ennek nincs sok ertelme

		this.timer = setInterval(() => {
			this.setState({ now: new Date() });
			this.setState({ searchResults: this.filterPastEvents(festivalProgramResults), data: festivalProgramResults });
			this.updateEventDays(this.state.searchResults);
			this.updateEventLocations(this.state.searchResults);
		}, 1000 * 60);

		//window.addEventListener("scroll", this.onScroll)
	}

	componentWillUnmount() {
		//window.removeEventListener("scroll", this.onScroll)
		clearInterval(this.timer);
	}

	initEventDay = () => {
		const today = moment(new Date()).format('L');
		//const today = "06/30/2018"
		const todayIsFestivalDay = this.props.storedEventDays.filter(day => day == today);
		if (todayIsFestivalDay.length > 0) {
			this.props.setFilterToday(todayIsFestivalDay[0]);
		}
	};

	onScroll = () => {
		let docHeight = document.body.scrollHeight - document.body.clientHeight;
		let trigger = docHeight - window.scrollY;
		if (trigger < 80) {
			this.showMore();
			this.setState(function(prevState) {
				return {
					paddingTop: window.scrollY - (document.body.clientHeight - prevState.paddingTop)
				};
			});
		}
	};

	updateEventDays = data => {
		let Programs = data;
		let grouppedFestivalPrograms = this.groupByDays(Programs);
		let eventDays = Object.keys(grouppedFestivalPrograms).sort();

		this.props.eventDays(eventDays);
	};

	updateEventLocations = data => {
		let Programs = data;
		let grouppedFestivalPrograms = this.groupByStages(Programs);
		let eventStages = Object.keys(grouppedFestivalPrograms).sort();
		this.props.eventStages(eventStages);
	};

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
		const eventListWithoutPastEvents = this.filterPastEvents(this.state.data)
		const filteredResults = eventListWithoutPastEvents.filter(event => {
			return event.artist.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || event.stage.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
		});

		if (filteredResults.length == 0) return;
		this.setState({ searchResults: filteredResults });
	};

	filterPastEvents = data => {
		const most = moment(this.state.now).subtract(19, 'minutes');
		return data.filter(({endDate=event.startDate}) => {
			return most < moment(endDate);
		});
	};

	festivalEventFilter = () => {
		if (this.props.isActive.Favourite) {
			return this.state.searchResults.filter(event => {
				return !this.props.isActive.Favourite || this.isActiveFavouriteItem(event._id);
			});
		}

		return this.state.searchResults.filter(event => {
			return (
				(this.props.activeDay == 'ALL' ||
					moment(event.startDate)
						.format('L')
						.toLowerCase()
						.indexOf(this.props.activeDay.toLowerCase()) > -1) &&
				(this.props.activeStage == 'HELYSZÍNEK' || event.stage.toLowerCase().indexOf(this.props.activeStage.toLowerCase()) > -1) &&
				(!this.props.isActive.Favourite || this.isActiveFavouriteItem(event._id))
			);
		});
	};

	groupByDays = events => {
		const days = Ramda.groupBy(events => {
			return moment(events.startDate).format('L');
		});
		return days(events);
	};

	groupByStages = events => {
		const Stages = Ramda.groupBy(events => {
			return events.stage;
		});
		return Stages(events);
	};

	detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.id) {
			this.setState({ activeDetails: '', lastOpenedDetailsHeight: 0 });
		} else {
			this.setState({ activeDetails: e.currentTarget.id });
			const lastOpenedDetaisWasBeforeThis = Number(this.state.lastOpenedDetailsKey) < Number(e.currentTarget.title);
			this.initLastOpenedDetailsHeight(this.state.lastOpenedDetailsHeight, lastOpenedDetaisWasBeforeThis);
			this.setState({ lastOpenedDetailsKey: e.currentTarget.title });
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

	isActiveFavouriteItem = item => {
		const filteredResults = this.props.savedShows.filter(artist => {
			return artist.toLowerCase().indexOf(item.toLowerCase()) > -1;
		});
		return filteredResults.length > 0;
	};

	favouriteItemToggle = item => {
		if (this.isActiveFavouriteItem(item.currentTarget.name)) {
			this.props.removeFromFavourites(item.currentTarget.name);

			const userId = this.props.userId;
			removeFavouriteEvent(userId, item.currentTarget.name);
		} else {
			this.props.addToFavourites(item.currentTarget.name);

			const userId = this.props.userId;
			saveFavouriteEvent(userId, item.currentTarget.name);
		}
	};

	showMore = () => {
		this.setState(function(prevState) {
			return {
				yListOffset: prevState.yListOffset + 10
			};
		});
	};

	render() {
		if (this.state.isEventExpired){
			return (
				<div className={classes.center}>
				<div style={{ margin: 'auto', fontSize: '150%', textAlign: 'center' }}>
							Az összes program véget ért!<br /> 
						</div></div>
			)
		}

		if (this.state.data.length === 0) {
			return (
				<div className={classes.center}>
					{this.state.isEventListExist ? (
						<CircularProgress style={{ margin: 'auto' }} size={80} thickness={5} />
					) : (
						<div style={{ margin: 'auto', fontSize: '150%', textAlign: 'center' }}>
							A fesztivál programok feltöltése folyamatban van!<br /> Kérlek nézz vissza később!
						</div>
					)}
				</div>
			);
		}

		const Programs = this.festivalEventFilter();

		const sliceOfPrograms = Programs.slice(this.state.yListOffset, this.state.yListOffset + 100);
		const grouppedFestivalPrograms = this.groupByDays(sliceOfPrograms);

		const eventDays = Object.keys(grouppedFestivalPrograms).sort();

		const programListByDay = eventDays.map((day, daysIndex) => {
			return (
				<div key={daysIndex} style={{ paddingBottom: '40px' }}>
					<Subheader className={classes.subheader}>
						<h1 className={classes.listHeader}>{moment(day).format('LL')}</h1>
					</Subheader>
					<Divider />
					<Divider />
					{grouppedFestivalPrograms[day].map((event, index) => {
						return (
							<FestivalProgramListItem
								key={daysIndex * 1000 + index}
								index={daysIndex * 1000 + index}
								detailsIsOpenHandler={this.detailsIsOpenHandler}
								webviewMenuChange={this.props.onViewChange}
								event={event}
								addToFavourite={this.favouriteItemToggle}
								isActiveItem={this.isActiveFavouriteItem(event._id)}
								isOpenDetails={this.state.activeDetails === event._id}
								setLastOpenedDetailsHeight={this.setLastOpenedDetailsHeight}
								now={this.state.now}
								
							/>
						);
					})}
				</div>
			);
		});

		return (
			<div className={classes.container}>
				<Helmet>
					<title>{this.state.festival.name}</title>
				</Helmet>

				<FilterSwitchers activeDayClicked={this.festivalEventDayFilterHandler} activeStageClicked={this.festivalEventStageFilterHandler} isActiveFilter={this.props.isActive.Filter} />

				<div className={classes.cover} style={{ backgroundImage: this.state.festival.coverPhoto ? 'url(https://ucarecdn.com/' + this.state.festival.coverPhoto + '/)' : 'none' }}>
					<SearchBar searchQueryChanged={this.festivalEventKeywordFilter} />
				</div>

				<DaySwitcher />

				<div style={{ paddingBottom: '100px', paddingTop: this.state.paddingTop + 'px' }}>{programListByDay}</div>
				<ScrollToTop showUnder={1000}>
					<span className={classes.scrollToTopButton}>UP</span>
				</ScrollToTop>
			</div>
		);
	}
}

const mapStateToProps = ({festbot}) => {
	return {
		userId: festbot.userId,
		eventStages: festbot.eventStages,
		activeStage: festbot.activeStage,
		activeDay: festbot.activeDay,
		storedEventDays: festbot.eventDays,
		webviewMenu: festbot.webviewMenu,
		savedShows: festbot.savedShows,
		isActive: {
			Trending: festbot.isActiveTrending,
			Filter: festbot.isActiveFilter,
			Favourite: festbot.isActiveFavourite
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setFilterToday: day => dispatch({ type: 'UPD_ACTIVEDAY', value: day }),
		onTrendingToggle: () => dispatch({ type: 'UPD_TRENDING' }),
		onFilterToggle: () => dispatch({ type: 'UPD_FILTER' }),
		onFavouriteToggle: () => dispatch({ type: 'UPD_FAVOURITE' }),
		onViewChange: actualViewMenu => dispatch({ type: 'UPD_MENU', value: actualViewMenu }),
		addToFavourites: event => dispatch({ type: 'ADD_FAVOURITE', value: event }),
		removeFromFavourites: event => dispatch({ type: 'REMOVE_FAVOURITE', value: event }),
		eventDays: daysArray => dispatch({ type: 'UPD_EVENTDAYS', value: daysArray }),
		eventStages: stagesArray => dispatch({ type: 'UPD_EVENTSTAGES', value: stagesArray })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(festivalProgramContainer);
