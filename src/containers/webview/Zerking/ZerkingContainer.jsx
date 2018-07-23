import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ZerkingContainer.css';
import { Helmet } from 'react-helmet';

import geolocationWrapper from './setGeolocation.js';
import Map from './Map.jsx';
import Marker from './Marker.jsx';
import FestivalSelector from './FestivalSelector.jsx';
import StageSelector from './StageSelector.jsx';
import PoiSelector from './PoiSelector.jsx';
import PoiContaier from './PoiContaier.jsx';

import { addItemToVenues, addItemToPois } from '../../../helpers/festivalApiHelper.js';

import { setFestival, getFestivalStages, getFestivalPois, setItemToZerking } from '../../../store/actions/actions.js';

import { foodTypes, drinkTypes, serviceTypes } from './poiTypes.js';

export class ZerkingContainer extends Component {
	state = {
		isOpen: {
			Stages: false,
			Food: false,
			Drink: false,
			Services: false
		}
	};

	static defaultProps = {
		pois: []
	};

	isOpenToggleHandler = e => {
		const item = e.currentTarget.id;
		this.setState({
			isOpen: { [item]: !this.state.isOpen[item] }
		});
	};

	submitItems = async () => {
		let item = '';

		for (var i = 0; i < this.props.itemsToZerking.length; i++) {
			if (this.props.itemsToZerking[i].category == 'stage') {
				item = this.props.itemsToZerking[i];
				await addItemToVenues(item);
			} else {
				item = this.props.itemsToZerking[i];
				await addItemToPois(item);
			}
		}
		await this.props.getFestivalStages(this.props.activeFestival._id);
		(await this.props.activeFestival) && this.props.getFestivalPois(this.props.activeFestival._id);
		this.props.setItemToZerking([]);
	};

	closeAllGroup = () => {
		this.setState({
			isOpen: {
				Stages: false,
				Food: false,
				Drink: false,
				Services: false
			}
		});
	};

	render() {
		// console.log("[active]",this.props.activeFestival)
		// console.log("[stages]",this.props.stages)
		// console.log("[pois]",this.props.pois)
		// console.log("[itemsToZerking]",this.props.itemsToZerking)

		// var beaches = [
		// 	['Bondi Beach', -33.890542, 151.274856, 4],
		// 	['Coogee Beach'-33.890542, 151.274856, 5],
		// 	['Cronulla Beach', -34.028249, 151.157507, 3],
		// 	['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
		// 	['Maroubra Beach', -33.950198, 151.259302, 1]
		// ];

		// var image = {
		// 	url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
		// 	// This marker is 20 pixels wide by 32 pixels high.
		// 	size: new google.maps.Size(20, 32),

		// 	// The origin for this image is (0, 0).
		// 	origin: new google.maps.Point(0, 0),
		// 	// The anchor for this image is the base of the flagpole at (0, 32).
		// 	anchor: new google.maps.Point(0, 32)
		// };

		// var shape = {
		// 	coords: [1, 1, 1, 20, 18, 20, 18, 1],
		// 	type: 'poly'
		// };

		// const poi = beaches.map(beach => {
		// return (
		//   <Marker position={{lat: beach[1], lng: beach[2]}} icon={image} title={beach[0]}></Marker>
		// )
		// });
		return (
			<div>
				<Helmet>
					<title>Zerking</title>
				</Helmet>

				<Map pos={this.props.pos}>
					{this.props.pois.map(poi => <Marker key={poi.coordinates.lat + poi.coordinates.lng} pos={{ lat: poi.coordinates.lat, lng: poi.coordinates.lng }} />)}

					<Marker pos={{ lat: 31.231416, lng: 121.573701 }} />
				</Map>

				<div className={classes.container}>
					<FestivalSelector onClick={this.submitItems} itemsToZerking={this.props.itemsToZerking} festival={this.props.activeFestival} />

					{this.props.activeFestival && (
						<div>
							{this.props.stages && <div onClick={this.isOpenToggleHandler} className={classes.button} id="Stages">{`Stages (${this.props.stages.length})`}</div>}
							{this.state.isOpen.Stages && <StageSelector stages={this.props.stages} festival={this.props.activeFestival} pos={this.props.pos} />}
							<div onClick={this.isOpenToggleHandler} className={classes.button} id="Food">{`Food (${foodTypes.length})`}</div>
							{this.state.isOpen.Food && <PoiSelector poiTypes={foodTypes} festival={this.props.activeFestival} pos={this.props.pos} />}
							<div onClick={this.isOpenToggleHandler} className={classes.button} id="Drinks">{`Drinks (${drinkTypes.length})`}</div>
							{this.state.isOpen.Drinks && <PoiSelector poiTypes={drinkTypes} festival={this.props.activeFestival} pos={this.props.pos} />}
							<div onClick={this.isOpenToggleHandler} className={classes.button} id="Services">{`Services (${serviceTypes.length})`}</div>
							{this.state.isOpen.Services && <PoiSelector poiTypes={serviceTypes} festival={this.props.activeFestival} pos={this.props.pos} />}
							{this.props.pois && <div className={classes.button}>{`${this.props.pois.length} POI's of ${this.props.activeFestival.name}`}</div>}
							<PoiContaier pois={this.props.pois} festival={this.props.activeFestival} pos={this.props.pos} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ zerking }) => {
	return {
		activeFestival: zerking.activeFestival,
		stages: zerking.stages,
		pois: zerking.pois,
		itemsToZerking: zerking.itemsToZerking
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setActiveFestival: festival => dispatch(setFestival(festival)),
		setItemToZerking: item => dispatch(setItemToZerking(item)),
		getFestivalStages: festivalId => dispatch(getFestivalStages(festivalId)),
		getFestivalPois: festivalId => dispatch(getFestivalPois(festivalId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(geolocationWrapper(ZerkingContainer));
