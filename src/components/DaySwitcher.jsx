import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import classes from './DaySwitcher.css';
import { isNull } from 'util';

export class DaySwitcher extends Component {
	constructor(props) {
		super(props);
		this.switcherContainer = React.createRef();
	}

	festivalEventDayFilterHandler = activeDay => {
		const day = this.props.eventDays[activeDay.currentTarget.id];
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});

		this.props.setActiveDay(day);
		if (activeDay.currentTarget.id == 'ALL') {
			this.props.setActiveDay('ALL');
		}
	};

	setActiveRef = e => {
		this.activeItem = e;
		if (e !== null) {
			this.state = { activeItem: this.activeItem };
			this.scrollOnClick();
		}
	};

	scrollOnClick = () => {
		const itemObject = this.state.activeItem.getBoundingClientRect();
		const visibleWidth = this.switcherContainer.current.offsetWidth;
		const objectPosition = this.state.activeItem.offsetLeft;

		this.switcherContainer.current.scrollTo({
			left: objectPosition - (visibleWidth - itemObject.width) / 2,
			behavior: 'smooth'
		});
	};

	render() {
		const eventDaysSwitcherItem = this.props.eventDays.map((e, i) => {
			return (
				<div
					ref={this.props.activeDay == this.props.eventDays[i] ? this.setActiveRef : null}
					id={i}
					key={i}
					onClick={this.festivalEventDayFilterHandler}
					className={this.props.activeDay == this.props.eventDays[i] ? classes.active : classes.item}
				>
					{moment(e).format('dddd M[/]D')}
				</div>
			);
		});

		return (
			<div ref={this.switcherContainer} className={classes.container}>
				<div id="ALL" onClick={this.festivalEventDayFilterHandler} className={this.props.activeDay == 'ALL' ? classes.active : classes.item}>
					ALL
				</div>
				{eventDaysSwitcherItem}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		eventDays: state.eventDays,
		activeDay: state.activeDay,
		isActive: {
			Filter: state.isActiveFilter
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setActiveDay: day => dispatch({ type: 'UPD_ACTIVEDAY', value: day })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DaySwitcher);
