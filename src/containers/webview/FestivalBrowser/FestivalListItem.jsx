import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';
import Add from 'material-ui/svg-icons/content/add';
import Done from 'material-ui/svg-icons/action/done';
import Avatar from 'material-ui/Avatar';
import { Rating } from 'material-ui-rating';

import { GridList, GridTile } from 'material-ui/GridList';
import { IconButton } from 'material-ui';
import IconDetails from 'material-ui/svg-icons/navigation/expand-more';
import IconClose from 'material-ui/svg-icons/navigation/close';

import * as colors from 'material-ui/styles/colors';

import { List, ListItem } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import classes from './festivalListItem.css';

import FestivalListDetails from './FestivalListDetails.jsx';

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

class FestivalListItem extends Component {
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
		frameOffset < 1 && frameOffset > 0 ? (frameOffset = 1) : frameOffset;
		frameOffset < 0 && frameOffset > -1 ? (frameOffset = -1) : frameOffset;
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

	render() {
		let renderingDetails = '';
		if (this.props.isOpenDetails) {
			renderingDetails = (
				<FestivalListDetails
					festivalStartDate={this.props.festival.dates[0]}
					festivalEndDate={this.props.festival.dates[this.props.festival.dates.length - 1]}
					festival={this.props.festival}
					detailsIsOpenHandler={this.props.detailsIsOpenHandler}
					webviewMenuChange={this.props.webviewMenuChange}
				/>
			);
		}

		return (
			<div>
				<div ref={element => (this.activeDetailsDiv = element)} className={classes.listItemContainer} style={{ maxHeight: this.props.isOpenDetails ? '1000px' : '120px', minHeight: this.props.isOpenDetails ? '300px' : '120px' }}>
					<div
						className={classes.backgroundContainer}
						style={{
							maxHeight: this.props.isOpenDetails ? '1000px' : '120px',
							minHeight: this.props.isOpenDetails ? '300px' : '120px',
							backgroundImage: this.props.festival.coverPhoto ? 'url(https://ucarecdn.com/' + this.props.festival.coverPhoto + '/)':'none',
							transition: this.props.isOpenDetails ? 'all 0.3s ease-in-out' : 'none'
						}}
					/>
					<div id={this.props.festival._id} title={this.props.index} onClick={this.detailsContentOpenHandler} className={classes.listItemWrapper}>
						<div className={classes.backdropLayer} />
						<div className={classes.title}>{this.props.festival.name}</div>
						<div
							className={classes.starIcon}
							onClick={e => {
								e.stopPropagation();
							}}
						>
						{this.props.showActivation && <IconButton className={classes.iconButtonRoot} iconStyle={{ width: '30', height: '30' }} style={{ width: '35', height: '35' }} id={this.props.festival._id} onClick={this.props.handleOpen}>
						{' '}
						{this.props.isActiveItem ? <Done color={colors.orange900} /> : <Add color={colors.teal400} />}
					</IconButton>}
							
						</div>
						<div className={classes.detailsIcon}> {!this.props.isOpenDetails ? <IconDetails color="white" /> : <IconClose color="white" />}</div>
						<div className={classes.country}>{moment(this.props.festival.dates[0]).format('MMM Do')}</div>
						<div className={classes.stage}>{this.props.festival.location.address}</div>

						<div className={classes.details} style={{ maxHeight: this.props.isOpenDetails ? '880px' : '0px', padding: this.props.isOpenDetails ? '0' : '0px' }}>
							{renderingDetails}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FestivalListItem;
