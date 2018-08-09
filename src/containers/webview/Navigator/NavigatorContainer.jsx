import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Helmet } from 'react-helmet';

import geolocationWrapper from '../Zerking/setGeolocation.js';
import Map from '../Zerking/Map.jsx';
import Marker from '../Zerking/Marker.jsx';
import StageSelector from '../Zerking/StageSelector.jsx';

import PoiContaier from '../Zerking/PoiContaier.jsx';
import PoiFilterContainer from './PoiFilterContainer.jsx';
import withFilteredPoiTypes from './withFilteredPoiTypes.jsx';
import PoiSelector from '../Zerking/PoiSelector.jsx';
import { foodTypes, drinkTypes, serviceTypes } from '../Zerking/poiTypes.js';
import {
	initUserActiveFestivalStages,
	initUserActiveFestivalPois
} from '../../../store/actions';

const PoiFilter = withFilteredPoiTypes(PoiSelector);

const Title = styled.div`
text-align:center;
	font-size: 140%;
	color: white;
	padding: 10px 0;
	border-radius: 3px;
	background-color: rgba(22, 22, 22, 0.9);
	width: 100%;
	box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
	background-color: #2c2c2c;
`;
const CarouselContainer = styled.div`
width:100%;
overflow-x: scroll;
white-space:nowrap;
overflow: auto;
  -webkit-overflow-scrolling: touch;
scroll-snap-type: mandatory;

  scroll-snap-destination: 0% 100%;
  scroll-snap-points-x: repeat(100%);
`
const CarouselPage = styled.div`
scroll-snap-align: start;
width:100vw;
display: inline-block;
`


export class NavigatorContainer extends Component {
	state = {
		initPage: 0
	};

	componentDidMount() {
		this.props.setMenu('hide');
		this.props.initUserActiveFestivalStages();
		this.props.initUserActiveFestivalPois();
	}

	changeHander = e => {
		this.setState({ initPage: e });
	};

	render() {
		if (!this.props.activeFestivalData) {
			return <div>Waiting for active festival data...</div>;
		}
		return (
			<Container>
			<PoiFilterContainer
					pois={this.props.pois}
					coverPhoto={this.props.activeFestivalData.coverPhoto}
				>
			<CarouselContainer>
				<CarouselPage>
				<Title>{`Services - ${
					this.props.activeFestivalData.name
				} `}</Title>
				<PoiFilter
					pois={this.props.pois}
					poiTypes={serviceTypes}
					pos={{ lat: 0, lng: 0 }}
					festival={this.props.activeFestival}
				/>
				</CarouselPage>
				<CarouselPage>
				<Title>{`Drinks - ${
					this.props.activeFestivalData.name
				} `}</Title>
				<PoiFilter
					pois={this.props.pois}
					poiTypes={drinkTypes}
					pos={{ lat: 0, lng: 0 }}
					festival={this.props.activeFestival}
				/>

				</CarouselPage>
				<CarouselPage>
				<Title>{`Food - ${
					this.props.activeFestivalData.name
				} `}</Title>
				<PoiFilter
					pois={this.props.pois}
					poiTypes={foodTypes}
					pos={{ lat: 0, lng: 0 }}
					festival={this.props.activeFestival}
				/>
				</CarouselPage>
				</CarouselContainer>
				</PoiFilterContainer>

				


				<PoiContaier
					readOnly
					limit={10}
					pois={this.props.filteredPois}
					festival={this.props.activeFestival}
					pos={this.props.pos}
				/>

				
			</Container>
		);
	}
}

const mapStateToProps = ({ festbot, zerking }) => {
	return {
		userId: festbot.userId,
		activeFestival: festbot.activeFestival,
		stages: zerking.stages,
		pois: zerking.pois,
		filteredPois: zerking.filteredPois,
		activeFestivalData: zerking.activeFestivalData,
		filterItems: zerking.filterItems,
		pos: zerking.pos,
		webviewMenu: festbot.webviewMenu
	};
};

const mapDispatchToProps = dispatch => {
	return {
		initUserActiveFestivalStages: () =>
			dispatch(initUserActiveFestivalStages()),
		initUserActiveFestivalPois: () =>
			dispatch(initUserActiveFestivalPois()),
		setMenu: actualViewMenu =>
			dispatch({ type: 'UPD_MENU', value: actualViewMenu })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(geolocationWrapper(NavigatorContainer));
