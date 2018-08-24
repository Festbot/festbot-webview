import React, { Component } from 'react';

import styled from 'styled-components';

import { icons } from './mapIcons.js';
import Hammer from 'hammerjs';

import Navigation from './Navigation.jsx';

import { deleteItemFromPois } from '../../../helpers/festivalApiHelper.js';

import lazyRender from '../../../hoc/lazyRender.jsx';
import headingWrapper from '../../../hoc/headingWrapper.jsx';

const MapIcon = styled.img`
	position: relative;
	padding-left: 5px;
	width: 32px;
	height: 32px;
`;
const DeleteButton = styled.div`
	position: absolute;
	right: 10px;

	width: 90px;
	background-color: red;
	margin: 1px 0;
	text-align: center;
	font-size: 120%;
	color: white;
	padding: 18px 0;
	border-radius: 3px;
	transition: all 0.3s ease-out;
	opacity: ${props => (props.swiped ? 1 : 0.01)};
`;

const Poi = styled.div`
	position: relative;

	background-color: rgba(22, 22, 22, 0.9);

	color: rgb(59, 40, 78);
	color: #ddd;

	text-align: center;
	width: 90%;
	margin: 10px auto;
	padding: 15px 10px;
	font-size: 100%;

	border-radius: 3px;
	font-weight: 110;
	cursor: pointer;
	transition: all 0.3s ease-out;

	transform: translateX(${props => (props.swiped ? -100 : 0)}px);
	z-index: 2;
`;

const Flexbox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const PoiTitle = styled.div`
	width: 70%;
	margin: 0 auto;
`;
const LocationInfo = styled.div`
	display: inline-block;
	position: relative;
	margin: 0 5px;
	font-size: 90%;
`;

const Wrapper = props => <div {...props}>{props.children}</div>;

export class PoiItem extends Component {
	constructor(props) {
		super(props);
		this.NavigationMarker = headingWrapper(Navigation);
		this.itemRef = React.createRef();
	}

	state = {
		heading: 0,
		swiped: 0
	};
	static defaultProps = { pos: { lat: 0, lng: 0 }, distance: null };

	componentDidMount() {
		if (this.props.readOnly) {
			return;
		}
		this.mc = new Hammer(this.itemRef.current);

		this.mc.on('swipeleft', this.swipeLeft);
		this.mc.on('swiperight', this.swipeRight);

	}

	componentWillUnmount() {
		if (this.props.readOnly) {
			return;
		}
		
		this.mc.off('swipeleft',this.swipeLeft);
		this.mc.off('swiperight',this.swipeRight);
	}

	swipeLeft=()=>{
		this.setState({ swiped: this.itemRef.current.id })
	}

	swipeRight=()=>{
		this.setState({ swiped: 0 })
	}


	// addSwipe = e => {
	// 	const mc = new Hammer(e);
	// 	mc.on('swipeleft', () => {
	// 		this.setState({ swiped: mc.element.id });
	// 	});
	// 	mc.on('swiperight', () => {
	// 		this.setState({ swiped: 0 });
	// 	});
	// };

	deletePoi = async item => {
		await deleteItemFromPois(item);
		await this.props.getFestivalPois(this.props.festivalId);
	};

	render() {
		
		const { poi } = this.props;
		const NavigationWithHeading = this.NavigationMarker;

		const iconType = poi.category;
		let iconCategory = '';

		if (icons[iconType]) {
			iconCategory = iconType;
		} else {
			iconCategory = 'default';
		}

		let iconUrl
		if (poi.logo) {
			iconUrl = `https://ucarecdn.com/${poi.logo}/-/resize/64x64/`
		} else {
			iconUrl = icons[iconCategory].icon;
		}

		const isSwiped = this.state.swiped == poi._id;

		let distance;
		if (this.props.distance !== null) {
			const d = this.props.distance;
			distance = `${d.toFixed()}m`;
			if (d > 1999) {
				distance = `${(d / 1000).toFixed(2)}km`;
			}
			if (d > 9999) {
				distance = `${(d / 1000).toFixed()}km`;
			}
		}

		return (
			<Wrapper style={{ position: 'relative', display: 'block' }}>
				{!this.props.readOnly && (
					<DeleteButton
						onClick={() =>
							this.deletePoi(`${poi._id}?rev=${poi._rev}`)
						}
						swiped={isSwiped}
					>
						Delete
					</DeleteButton>
				)}
				<Poi innerRef={this.itemRef} swiped={isSwiped} id={poi._id}>
					<NavigationWithHeading poi={poi} pos={this.props.pos} />

					<Flexbox onClick={()=>this.props.onClickHandler(poi)}>
						<MapIcon src={iconUrl} />
						<PoiTitle>{poi.name || poi.category}</PoiTitle>
						{this.props.distance !== null && (
							<LocationInfo>{distance}</LocationInfo>
						)}
					</Flexbox>
				</Poi>
			</Wrapper>
		);
	}
}

const Placeholder = styled.div`
	height: 32px;
	padding: 15px 10px;
	background-color: rgba(22, 22, 22, 0.9);
	margin: 10px auto;
`;

export default lazyRender(PoiItem, Placeholder);
