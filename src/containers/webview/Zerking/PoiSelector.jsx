import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { icons } from './mapIcons.js';

import {
	addItemToZerking,
	removeItemToZerking,
	getFestivalPois
} from '../../../store/actions';

import { goToAnchor } from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

const MapIcon = styled.img`
	position: relative;
	width: 32px;
	height: 32px;
	margin: 0 auto;
`;

const MapIconTitle = styled.div`
	padding-top: 5px;
	font-size: 90%;
`;
const Title = styled.div`
	text-align: center;
	font-size: 140%;
	color: white;
	padding: 10px 0;
	border-radius: 3px;
	background-color: rgba(22, 22, 22, 0.9);
	width: 100%;
	box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.5);
`;

const PoiItem = styled.div`
	text-align: center;
	background-color: ${props =>
		props.isToggledForZerkig ? 'rgb(80,100,0)' : 'rgba(22,22,22,0.9)'};
	color: rgb(59, 40, 78);
	color: #ddd;

	margin: 8px 10px;
	padding: 8px 8px;
	box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.5);
	border-radius: 3px;
	font-weight: 100;
	cursor: pointer;
	flex: 1 auto;
	display: flex;
	flex-direction: column;
	alig-items: ceter;
`;
const PoiContainer = styled.div`
	display: flex;
	overflow: hidden;
	flex-wrap: wrap;

	align-content: stretch;
`;

const CarouselPage = styled.div`
	scroll-snap-align: start;
	width: 100vw;
  display: inline-block;
`;

export class PoiSelector extends Component {
	componentDidMount() {
		configureAnchors({ offset: -250, scrollDuration: 500 });
	}

	setItemToZerking = (e, poiType) => {
		if (this.isToggledForZerkig(poiType.key)) {
			this.props.removeItemToZerking(poiType.key);
			return;
		}

		const item = {
			category: poiType.key,
			name: poiType.name,
			festivalId: this.props.festival._id,
			coordinates: {
				lat: this.props.pos.lat,
				lng: this.props.pos.lng
			}
		};
		this.props.addItemToZerking([item]);

		if (this.props.noscroll) {
			goToAnchor('poiList');
		}

		return;
	};

	isToggledForZerkig = category => {
		let matchedItem = '';
		matchedItem = this.props.itemsToZerking.filter(poi => {
			return poi.category == category;
		});
		return matchedItem.length > 0;
	};

	renderPoi = poiType => {
		const iconType = poiType.key;
		let iconCategory = '';
		if (icons[iconType]) {
			iconCategory = iconType;
		} else {
			iconCategory = 'default';
		}
		const iconUrl = icons[iconCategory].icon;

		return (
			<PoiItem
				isToggledForZerkig={this.isToggledForZerkig(poiType.key)}
				onClick={e => this.setItemToZerking(e, poiType)}
				key={poiType.key}
			>
				<MapIcon src={iconUrl} />
				<MapIconTitle>{poiType.name}</MapIconTitle>
			</PoiItem>
		);
	};

	render() {
		const { poiTypes } = this.props;
    if (this.props.poiTypes.length == 0) {return <div></div>}
		let poiRender = '';
		if (this.props.poiTypes) {
			poiRender = poiTypes.map(this.renderPoi);
		}


		return (
			<CarouselPage>
				{this.props.type&&<Title>{`${this.props.type} - ${this.props.activeFestivalData &&
					this.props.activeFestivalData.name} `}</Title>}
				<PoiContainer>{poiRender}</PoiContainer>
			</CarouselPage>
		);
	}
}

const mapStateToProps = ({ zerking }) => {
	return {
		activeFestival: zerking.activeFestival,
		itemsToZerking: zerking.itemsToZerking
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addItemToZerking: item => dispatch(addItemToZerking(item)),
		removeItemToZerking: category =>
			dispatch(removeItemToZerking(category)),
		getFestivalPois: festivalId => dispatch(getFestivalPois(festivalId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PoiSelector);
