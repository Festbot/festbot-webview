import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as Ramda from 'ramda';

import geolocationWrapper from '../Zerking/setGeolocation.js';

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
import StageFilter from '../Navigator/StageFilter.jsx';

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

const Container = styled.div`
	background-color: #2c2c2c;
`;
const CarouselContainer = styled.div`
	width: 100%;
	overflow-x: scroll;
	white-space: nowrap;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	scroll-snap-type: mandatory;

	scroll-snap-destination: 0% 100%;
	scroll-snap-points-x: repeat(100%);
`;
const CarouselPage = styled.div`
	scroll-snap-align: start;
	width: 100vw;
	display: inline-block;
`;

const NotificationModal = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(11, 11, 11, 0.7);
	z-index: 20;
	flex-direction: column;
	text-align: center;
	color: #ddd;
	p {
		font-size: 100%;
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
const FestivalActivation = styled(Link)`
text-align: center;
text-decoration: none;
padding: 10px 20px;
border-radius: 50px;
width: 80%;
font-size: 200%;
background-color: rgb(22, 155, 90);
color: #ddd;
`;

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
		let isAndroid = !!window.AbsoluteOrientationSensor;
		let showOpenChromeOverlay = this.props.isWebview && isAndroid;

		let noGpsData =
			(!this.props.pos && !isAndroid) ||
			(!this.props.pos && isAndroid && !this.props.isWebview);

		if (!this.props.stages || this.props.activeFestivalData) {
			return <div>Loading...</div>
		}


		if (this.props.activeFestival==null) {
			return <NotificationModal>
			<FestivalActivation to="/?redirect=/navigator" >
				Válassz aktív fesztivált
			</FestivalActivation>
		</NotificationModal>;
		}

		const renderStages = this.props.stages.filter(stage => {
			return stage.coordinates.lat !== null;
		});

		const pagedRenderStages = Ramda.splitEvery(15, renderStages);

		const RenderStagePages = pagedRenderStages.map((StagePage, index) => {
			return (
				<CarouselPage key={index}>
					<Title>{`Stages - ${
						this.props.activeFestivalData.name
					} `}</Title>
					<StageFilter stages={StagePage} />
				</CarouselPage>
			);
		});

		return (
			<Container
				style={
					showOpenChromeOverlay || noGpsData
						? { height: '100vh', overflow: 'hidden' }
						: {}
				}
			>
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

						{RenderStagePages}
					</CarouselContainer>
				</PoiFilterContainer>

				{this.props.filteredStages.length > 0 && (
					<PoiContaier
						readOnly
						limit={10}
						pois={this.props.filteredStages}
						festival={this.props.activeFestival}
						pos={this.props.pos}
					/>
				)}

				<PoiContaier
					readOnly
					limit={10}
					pois={this.props.filteredPois}
					festival={this.props.activeFestival}
					pos={this.props.pos}
				/>

				{showOpenChromeOverlay && (

						<NotificationModal>
							<OpenChrome
								href="intent://webview.festbot.com/navigator#Intent;scheme=https;action=android.intent.action.VIEW;end;"
								target="_blank"
							>
								Open in Chrome
							</OpenChrome>
						</NotificationModal>

				)}

				{noGpsData && (

						<NotificationModal>
							<OpenChrome>Waiting for GPS signal</OpenChrome>
							<p>Please walk a few steps outdoor.</p>
						</NotificationModal>

				)}
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
		filteredStages: zerking.stagesToFiltering,
		activeFestivalData: zerking.activeFestivalData,
		filterItems: zerking.filterItems,
		pos: zerking.pos,
		webviewMenu: festbot.webviewMenu,
		isWebview: festbot.isWebview
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
