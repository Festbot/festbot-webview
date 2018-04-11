import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../../hoc/Aux/Aux.jsx';
import classes from './FestivalListBuilder.css';
import * as Ramda from 'ramda';

import FestivalListItem from './FestivalListItem.jsx';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import countries from '../../../helpers/countries.json';
import emojiFlags from 'emoji-flags';
import ConfirmationDialog from './ConfirmationDialog.jsx';

class FestivalListBuilder extends Component {
	state = {
		activeFestival: '',
		activeDetails: '',
		isModalOpen: false,
		selectedItem: ''
	};

	handleOpen = e => {
		this.setState({
			isModalOpen: true,
			selectedItem: e.currentTarget.name
		});
	};

	handleClose = () => {
		this.setState({ isModalOpen: false, selectedItem: '' });
	};

	submitHandler = () => {
		this.setState({
			isModalOpen: false,
			activeFestival: this.state.selectedItem
		});
	};

	detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.title) {
			this.setState({ activeDetails: '' });
		} else {
			this.setState({ activeDetails: e.currentTarget.title });
			console.log(this.state.activeDetails);
		}
	};


  groupByCountry = (festivals) => {
    const countries = Ramda.groupBy(festival => {
      return festival.location.country
    })
    return countries(festivals)
  };



	render() {
		console.log('[Redux at festbot activation]:', this.props.webviewMenu)
		const gruppedFestivals = this.groupByCountry(this.props.festivals)
		console.log(Object.keys(gruppedFestivals).sort())
		let sortedCountries = Object.keys(gruppedFestivals).sort()

		sortedCountries.splice(sortedCountries.indexOf('HU'),1)
		sortedCountries = ['HU', ...sortedCountries]

		console.log(sortedCountries)
		return [
			sortedCountries.map(country => {
				return (
					<div style={{ paddingBottom: '40px' }}>
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
							<p className={classes.headerP}>
								{gruppedFestivals[country].length} festivals
							</p>
						</Subheader>
						<Divider />
						<Divider />
						{gruppedFestivals[country].map(festival => {
							return (
								<Aux>
									<FestivalListItem
										detailsIsOpenHandler={
											this.detailsIsOpenHandler
										}
										webviewMenuChange={this.props.onViewChange}
										festival={festival}
										handleOpen={this.handleOpen}
										isActiveItem={
											this.state.activeFestival ===
											festival.name
										}
										isOpenDetails={
											this.state.activeDetails ===
											festival.name
										}
									/>
								</Aux>
							);
						})}
					</div>
				);
			}),
			<ConfirmationDialog
				onCancelClick={this.handleClose}
				onEnableClick={this.submitHandler}
				open={this.state.isModalOpen}
			/>
		];
	}
}


const mapStateToProps = state => {
  return{
    webviewMenu:state.webviewMenu,
};
}

export default connect(mapStateToProps)(FestivalListBuilder);