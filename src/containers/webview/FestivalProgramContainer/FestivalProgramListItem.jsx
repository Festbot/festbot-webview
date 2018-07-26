import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import IconDetails from 'material-ui/svg-icons/navigation/expand-more';
import IconClose from 'material-ui/svg-icons/navigation/close';

// From https://github.com/oliviertassinari/react-swipeable-views

import { IconButton } from 'material-ui';

import * as colors from 'material-ui/styles/colors';


import classes from './FestivalProgramListItem.css';

import ProgramDetails from './ProgramDetails.jsx';

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
const propsEventRating = 4.5;

class FestivalProgramListItem extends Component {
	constructor (props){
		super(props);
		this.state = {slideIndex: 0}
	}



	offset(el) {
		var rect = el.getBoundingClientRect(),
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		return rect.top + scrollTop;
	}

	smoothScroll = el => {
		let fromTop = el.getBoundingClientRect();
		fromTop = el.getBoundingClientRect().top;

		if (fromTop < 2 && fromTop > -2) {
			const cardHeight = el.getBoundingClientRect().height;
			this.props.setLastOpenedDetailsHeight(cardHeight - 120);
			return;
		}

		let yOffset = window.pageYOffset || document.documentElement.scrollTop;
		let frameOffset = fromTop / 5;
		frameOffset < 1 && frameOffset > 0 ? (frameOffset = 2) : frameOffset;
		frameOffset < 0 && frameOffset > -1 ? (frameOffset = -2) : frameOffset;
		let scrollTo = yOffset + frameOffset;
		window.scrollTo(0, scrollTo);
		window.requestAnimationFrame(() => this.smoothScroll(el));
	};

	detailsContentOpenHandler = e => {
		if (!this.props.isOpenDetails) {
			window.requestAnimationFrame(() => this.smoothScroll(this.activeDetailsDiv));
		}
		this.props.detailsIsOpenHandler(e);
	};



	getProgress=()=>{
		const timeLeft = moment(this.props.event.endDate)-this.props.now
		const now = this.props.now;
		const duration = (moment(this.props.event.endDate)-moment(this.props.event.startDate))
		const progress = 100-((timeLeft/duration)*100)
		if (progress<0||progress>100) {return 0}
		return progress
	}

	onAir=()=>{
		let onAir=''
		const now=this.props.now
		const startDate= moment(this.props.event.startDate)
		const endDate = moment(this.props.event.endDate)
		const ended= moment(this.props.event.endDate)< moment(now)
		const isStarted =startDate<now

		if (isStarted 
			&& endDate>now
			&&this.props.event.endDate) {
		onAir = <div className={classes.onAir}>Ends {
			endDate.endOf().from(now)}</div>
			}

		
		if (!isStarted && startDate< moment(now).add(3,'hours')) {
			onAir = <div className={classes.onAir +' '+ classes.startsIn}>Starts {
				startDate.endOf().from(now)}</div>
		}

		if (ended) {
			onAir = <div className={classes.onAir +' '+ classes.ended}>Ended {
				endDate.endOf().from(now)}</div>
		}
		
		nextEvent=(thisEvent)=>{

		}
		

		return onAir
	}

	render() {
		let propsEventLocation = 'Not announced yet';
		if (this.props.event.place !== '') {
			propsEventLocation = this.props.event.stage;
		}
		let renderingDetails = '';
		if (this.props.isOpenDetails) {
			renderingDetails = <ProgramDetails artist={this.props.event.artist} event={this.props.event} eventRating={propsEventRating} />;
		}


		

		return (
			<div >
				<div
					ref={element => (this.activeDetailsDiv = element)}
					className={classes.listItemContainer}
					style={{
						maxHeight: this.props.isOpenDetails ? '1000px' : '120px',
						minHeight: this.props.isOpenDetails ? '300px' : '120px',
						backgroundImage: this.props.event.artistPhoto ? 'url(https://ucarecdn.com/' + this.props.event.artistPhoto + '/)':'none',
						transition: this.props.isOpenDetails ? 'all 0.3s ease-in-out' : 'none'
					}}
				>
					<div id={this.props.event._id} title={this.props.index} onClick={this.detailsContentOpenHandler} className={classes.listItemWrapper}>
						<div className={classes.backdropLayer} />
						<div className={classes.title}>{this.props.event.artist}</div>
						<div
							className={classes.starIcon}
							onClick={e => {
								e.stopPropagation();
							}}
						>
							<IconButton className={classes.iconButtonRoot} iconStyle={{ width: '30', height: '30' }} style={{ width: '35', height: '35' }} name={this.props.event._id} onClick={this.props.addToFavourite}>
								{' '}
								{this.props.isActiveItem ? <Star color={colors.orange900} /> : <StarBorder color={colors.blueGrey50} />}
							</IconButton>
						</div>
						<div className={classes.detailsIcon}> {!this.props.isOpenDetails ? <IconDetails color="white" /> : <IconClose color="white" />}</div>
						<div className={classes.country}>{moment(this.props.event.startDate).format('LT')}</div>
						<div className={classes.stage}>{propsEventLocation}</div>
						<div className={classes.stage} />
						{this.onAir()}
						{this.props.event.endDate&&<div className={classes.progressBar} style={{width:this.getProgress()+'%'}} />}
						<div className={classes.details} style={{ maxHeight: this.props.isOpenDetails ? '880px' : '0px', padding: this.props.isOpenDetails ? '0' : '0px' }}>
							{renderingDetails}
						</div>
					</div>
				</div>
			
			</div>	
		);
	}
}

export default FestivalProgramListItem;
