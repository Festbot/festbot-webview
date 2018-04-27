import React, { Component } from 'react';
import {connect} from 'react-redux';
import {saveActiveFestbot} from '../../../components/apiHelper.js'

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
	 	savedShows: '',
		activeDetails: '',
		isModalOpen: false,
		selectedItem: ''
	};

	handleOpen = e => {
		this.setState({
			isModalOpen: true,
			selectedItem: e.currentTarget.id
		});
	};

	handleClose = () => {
		this.setState({ isModalOpen: false, selectedItem: '' });
	};

	submitHandler = async () => {
		
		const userId=this.props.userData.userId
		try {
			await saveActiveFestbot(userId,this.state.selectedItem)
			this.setState({
				savedShows: this.state.selectedItem
			});
		}
		catch (error) {
			alert('Network Error')
		}
		this.setState({
			isModalOpen: false,
		});
	};


	
	detailsIsOpenHandler = e => {
		if (this.state.activeDetails === e.currentTarget.id) {
			this.setState({ activeDetails: '' });
		} else {
			this.setState({ activeDetails: e.currentTarget.id });
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
											this.props.userData.activeFestival ===
											festival._id
										}
										isOpenDetails={
											this.state.activeDetails ===
											festival._id
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
		userData:{
			userId: state.userId,
			activeFestival: state.activeFestival,
		}
		
};
}

export default connect(mapStateToProps)(FestivalListBuilder);