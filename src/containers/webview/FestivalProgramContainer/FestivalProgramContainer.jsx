import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import classes from './FestivalProgramContainer.css';
import * as Ramda from 'ramda';
import 'babel-polyfill';
import styled from 'styled-components';

import moment from 'moment';
import {
	saveFavouriteEvent,
	removeFavouriteEvent
} from '../../../helpers/apiHelper.js';
import { Helmet } from 'react-helmet';
import SearchBar from '../../../ui/SearchBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FestivalProgramListItem from './FestivalProgramListItem.jsx';
import ScrollToTop from 'react-scroll-up';
import FilterSwitchers from '../../../containers/webview/FestivalProgramContainer/FilterSwitchers.jsx';
import DaySwitcher from '../../../components/DaySwitcher';

import { filterPastEvents,eventDays,eventLocations} from '../../../helpers/eventApiHelper.js';
import {initProgramListByFestivalId,  updatePrograms,initPrograms,initEventFlags,updateEventDays,updateEventLocations} from '../../../store/actions'

const NotificationModal = styled.div`
overflow:hidden;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(11, 11, 11, 0.9);
	z-index: 20;
	flex-direction: column;
	text-align: center;
	color: #ddd;
	p {
		font-size: 100%;
		padding:0 10px;
	}
`;
const OpenChrome = styled.a`
	text-align: center;
	text-decoration: none;
	padding: 10px 20px;
	border-radius: 50px;
	width: 80%;
	font-size: 200%;
	background-color: rgb(22, 155, 90);
	color: #ddd;
`;


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
			isEventExpired: false,
			festival: '',
			scrollPosition: 0,
			activeFestival:this.props.activeFestival
		};
	}

	async componentDidMount() {
		this.props.onViewChange('program_list');


		let activeFestival = this.props.match.params.festival_id;

		this.props.initProgramListByFestivalId(activeFestival)


		this.timer = setInterval(() => {
			if(!this.props.data) {return}
			this.setState({ now: new Date() }); 
			this.props.updatePrograms(filterPastEvents(this.props.searchResults))
			this.props.initPrograms(this.props.searchResults)

			this.props.updateEventDays(eventDays(this.props.searchResults));
			this.props.updateEventLocations(eventLocations(this.props.searchResults));
		}, 1000 * 60);

		window.addEventListener('scroll', this.onScrollLazyLoad);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollLazyLoad);
		clearInterval(this.timer);
		this.props.initEventFlags();

	}

	initEventDay = () => {
		const today = moment(new Date()).format('L');
		//const today = "06/30/2018"
		const todayIsFestivalDay = this.props.storedEventDays.filter(
			day => day == today
		);
		if (todayIsFestivalDay.length > 0) {
			this.props.setFilterToday(todayIsFestivalDay[0]);
		}
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
		const eventListWithoutPastEvents = this.filterPastEvents(
			this.props.data
		);
		const filteredResults = eventListWithoutPastEvents.filter(event => {
			return (
				event.artist.toLowerCase().indexOf(keyword.toLowerCase()) >
					-1 ||
				event.stage.toLowerCase().indexOf(keyword.toLowerCase()) > -1
			);
		});

		if (filteredResults.length == 0) return;
		this.props.updatePrograms(filteredResults);
	};



	festivalEventFilter = () => {
		if (this.props.isActive.Favourite) {
			return this.props.searchResults.filter(event => {
				return (
					!this.props.isActive.Favourite ||
					this.isActiveFavouriteItem(event._id)
				);
			});
		}

		return this.props.searchResults.filter(event => {
			return (
				(this.props.activeDay == 'ALL' ||
					moment(event.startDate)
						.format('L')
						.toLowerCase()
						.indexOf(this.props.activeDay.toLowerCase()) > -1) &&
				(this.props.activeStage == 'HELYSZÍNEK' ||
					event.stage
						.toLowerCase()
						.indexOf(this.props.activeStage.toLowerCase()) > -1) &&
				(!this.props.isActive.Favourite ||
					this.isActiveFavouriteItem(event._id))
			);
		});
	};

	groupByDays = events => {
		const days = Ramda.groupBy(events => {
			return moment(events.startDate).format('L');
		});
		return days(events);
	};


	detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.id) {
			this.setState({ activeDetails: '', lastOpenedDetailsHeight: 0 });
		} else {
			this.setState({ activeDetails: e.currentTarget.id });
			const lastOpenedDetaisWasBeforeThis =
				Number(this.state.lastOpenedDetailsKey) <
				Number(e.currentTarget.title);
			this.initLastOpenedDetailsHeight(
				this.state.lastOpenedDetailsHeight,
				lastOpenedDetaisWasBeforeThis
			);
			this.setState({ lastOpenedDetailsKey: e.currentTarget.title });
		}
	};

	setLastOpenedDetailsHeight = e => {
		this.setState({ lastOpenedDetailsHeight: e });
	};

	initLastOpenedDetailsHeight = (
		lastOpenedDetailsHeight,
		lastOpenedDetaisWasBeforeThis
	) => {
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

	onDetailsOpenAnimationStateChange = e => {
		this.detailsOpenAnimationInProgress = e;
	};

	onScrollLazyLoad = () => {
		if (!this.detailsOpenAnimationInProgress) {
			this.setState({ scrollPosition: window.scrollY });
		}
	};

	render() {
	
		if (
			this.props.match.path == '/festivals' &&
			this.props.shouldRedirect
		) {
			return <Redirect to={`/festival-list`} />;
		}

		if (this.props.shouldReload) {
			return <NotificationModal>
					<OpenChrome
						onClick={()=>location.reload()}
					>
						Reload the page
					</OpenChrome>
					<p>Something went wrong, click the button to reload the page.</p>
				</NotificationModal>
		}

		if (!this.props.data||!this.props.searchResults){
			return <div className={classes.center}>
			
				<CircularProgress
					style={{ margin: 'auto' }}
					size={80}
					thickness={5}
				/></div>
		}

		if (this.props.isEventExpired) {
			return (
				<div className={classes.center}>
					<div
						style={{
							margin: 'auto',
							fontSize: '150%',
							textAlign: 'center'
						}}
					>
						Az összes program véget ért!<br />
					</div>
				</div>
			);
		}

		if (this.props.data.length === 0) {
			return (
				<div className={classes.center}>
					{this.props.isEventListExist ? (
						<CircularProgress
							style={{ margin: 'auto' }}
							size={80}
							thickness={5}
						/>
					) : (
						<div
							style={{
								margin: 'auto',
								fontSize: '150%',
								textAlign: 'center'
							}}
						>
							A fesztivál programok feltöltése folyamatban van!<br />{' '}
							Kérlek nézz vissza később!
						</div>
					)}
				</div>
			);
		}

		const Programs = this.festivalEventFilter();

		const sliceOfPrograms = Programs.slice(
			this.state.yListOffset,
			this.state.yListOffset + 200
		);

		const daysOfEvent = eventDays(sliceOfPrograms)
		const grouppedFestivalPrograms = this.groupByDays(sliceOfPrograms);

		const programListByDay = daysOfEvent.map((day, daysIndex) => {
			return (
				<div key={daysIndex} style={{ paddingBottom: '40px' }}>
					<Subheader className={classes.subheader}>
						<h1 className={classes.listHeader}>
							{moment(day).format('LL')}
						</h1>
					</Subheader>
					<Divider />
					<Divider />
					{grouppedFestivalPrograms[day].map((event, index) => {
						return (
							<FestivalProgramListItem
								onDetailsOpenAnimationStateChange={
									this.onDetailsOpenAnimationStateChange
								}
								scrollPosition={this.state.scrollPosition}
								key={daysIndex * 1000 + index}
								index={daysIndex * 1000 + index}
								detailsIsOpenHandler={this.detailsIsOpenHandler}
								webviewMenuChange={this.props.onViewChange}
								event={event}
								addToFavourite={this.favouriteItemToggle}
								isActiveItem={this.isActiveFavouriteItem(
									event._id
								)}
								isOpenDetails={
									this.state.activeDetails === event._id
								}
								setLastOpenedDetailsHeight={
									this.setLastOpenedDetailsHeight
								}
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
					<title>{this.props.activeFestivalData.name}</title>
				</Helmet>

				<FilterSwitchers
					activeDayClicked={this.festivalEventDayFilterHandler}
					activeStageClicked={this.festivalEventStageFilterHandler}
					isActiveFilter={this.props.isActive.Filter}
				/>

				<div
					className={classes.cover}
					style={{
						backgroundImage: this.props.activeFestivalData.coverPhoto
							? 'url(https://ucarecdn.com/' +
							  this.props.activeFestivalData.coverPhoto +
							  '/)'
							: 'none'
					}}
				>
					<SearchBar
						searchQueryChanged={this.festivalEventKeywordFilter}
					/>
				</div>

				<DaySwitcher />

				<div
					style={{
						paddingBottom: '100px',
						paddingTop: this.state.paddingTop + 'px'
					}}
				>
					{programListByDay}
				</div>
				<ScrollToTop showUnder={1000}>
					<span className={classes.scrollToTopButton}>UP</span>
				</ScrollToTop>
			</div>
		);
	}
}

const mapStateToProps = ({ festbot,zerking }) => {
	return {
		userId: festbot.userId,
		activeFestival: festbot.activeFestival,
		shouldRedirect:festbot.shouldRedirect,
		shouldReload:festbot.shouldReload,
		isEventListExist:festbot.isEventListExist,
		isEventExpired:festbot.isEventExpired,
		searchResults:festbot.searchResults,
		data:festbot.data,
		activeFestivalData: zerking.activeFestivalData,
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
		initProgramListByFestivalId:festivalId=>dispatch(initProgramListByFestivalId(festivalId)),
		updatePrograms:(data)=>dispatch(updatePrograms(data)),
		initPrograms:(data)=>dispatch(initPrograms(data)),
		initEventFlags:()=>dispatch(initEventFlags()),
		setFilterToday: day => dispatch({ type: 'UPD_ACTIVEDAY', value: day }),
		onTrendingToggle: () => dispatch({ type: 'UPD_TRENDING' }),
		onFilterToggle: () => dispatch({ type: 'UPD_FILTER' }),
		onFavouriteToggle: () => dispatch({ type: 'UPD_FAVOURITE' }),
		onViewChange: actualViewMenu =>
			dispatch({ type: 'UPD_MENU', value: actualViewMenu }),
		addToFavourites: event =>
			dispatch({ type: 'ADD_FAVOURITE', value: event }),
		removeFromFavourites: event =>
			dispatch({ type: 'REMOVE_FAVOURITE', value: event }),
		updateEventDays: daysArray =>
			dispatch(updateEventDays( daysArray) ),
		updateEventLocations: stagesArray =>
			dispatch(updateEventLocations( stagesArray ))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(festivalProgramContainer);
