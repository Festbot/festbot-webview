import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { saveActiveFestbot } from '../../../helpers/apiHelper.js';
import classes from './FestivalListBuilder.css';
import * as Ramda from 'ramda';
import FestivalListItem from './FestivalListItem.jsx';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import countries from '../../../helpers/countries.json';
import emojiFlags from 'emoji-flags';
import ConfirmationDialog from './ConfirmationDialog.jsx';
import querystring from 'querystring'

class FestivalListBuilder extends Component {
	state = {
		savedShows: '',
		activeDetails: '',
		isModalOpen: false,
		selectedItem: '',
		lastOpenedDetailsHeight: 0,
		lastOpenedDetailsKey: 0
	};

	handleOpen = e => {
		this.setState({
			isModalOpen: true,
			selectedItem: e.currentTarget.id,
			activeFestivalCoverPhoto: e.currentTarget.ref
		});
	};

	handleClose = () => {
		this.setState({ isModalOpen: false, selectedItem: '' });
	};

	submitHandler = async () => {
		const userId = this.props.userData.userId;

		try {
			await saveActiveFestbot(userId, this.state.selectedItem);
			
			this.props.setActiveFestival(this.state.selectedItem);

			if (querystring.parse(location.search)["?redirect"]) {

				window.location.href=querystring.parse(location.search)["?redirect"]
			}

		} catch (error) {
			alert('Network Error');
		}
		this.setState({
			isModalOpen: false
		});
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

	groupByCountry = festivals => {
		const countries = Ramda.groupBy(festival => {
			return festival.location.country;
		});
		return countries(festivals);
	};

	render() {
		const gruppedFestivals = this.groupByCountry(this.props.festivals);

		let sortedCountries = Object.keys(gruppedFestivals).sort();

		sortedCountries.splice(sortedCountries.indexOf('HU'), 1);
		sortedCountries = ['HU', ...sortedCountries];

		return (
			<Fragment>
				{sortedCountries.map((country, countryIndex) => {
					return (
						<div key={countryIndex} style={{ paddingBottom: '40px' }}>
							<Subheader className={classes.subheader}>
								<h1 className={classes.listHeader}>
									<div
										style={{
											paddingRight: '10px',
											display: 'inline-block'
										}}
									>
										{emojiFlags.countryCode(country).emoji}
									</div>
									{countries[country]}
								</h1>
								<p className={classes.headerP}>{gruppedFestivals[country].length} festivals</p>
							</Subheader>
							<Divider />
							<Divider />
							{gruppedFestivals[country].map((festival, index) => {
								return (
									<FestivalListItem
										key={countryIndex * 1000 + index}
										detailsIsOpenHandler={this.detailsIsOpenHandler}
										webviewMenuChange={this.props.onViewChange}
										festival={festival}
										handleOpen={this.handleOpen}
										isActiveItem={this.props.userData.activeFestival === festival._id}
										isOpenDetails={this.state.activeDetails === festival._id}
										setLastOpenedDetailsHeight={this.setLastOpenedDetailsHeight}
										showActivation={this.props.showActivation}
									/>
								);
							})}
						</div>
					);
				})}
				<ConfirmationDialog onCancelClick={this.handleClose} onEnableClick={this.submitHandler} open={this.state.isModalOpen} />
			</Fragment>
		);
	}
}

const mapStateToProps = ({festbot}) => {
	return {
		webviewMenu: festbot.webviewMenu,
		userData: {
			userId: festbot.userId,
			activeFestival: festbot.activeFestival
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setActiveFestival: festivalId => dispatch({ type: 'SET_ACTIVEFESTIVAL', value: festivalId }),
		
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FestivalListBuilder);
