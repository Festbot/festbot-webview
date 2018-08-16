import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScrollableAnchor from 'react-scrollable-anchor';
import PoiItem from './PoiItem.jsx';
import { getFestivalPois } from '../../../store/actions';
import CompassNavigation from '../Navigator/CompassNavigation.jsx';


export class PoiContaier extends Component {
	state = {
		heading: 0,
		scrollPosition: 0
	};

	componentDidMount = () => {
		window.addEventListener('scroll', this.onScroll);
	};

	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.onScroll);
	};

	onScroll = () => {
		this.setState({ scrollPosition: window.scrollY });
	};

	openCompassNavigation = poi => {
		if (poi.distance) {
			this.setState({ poiIdForCompass: poi._id });
		}
	};

	compassNavigationClose = () => {
		this.setState({ poiIdForCompass: '' });
	};

	render() {
		if (!this.props.pois) {
			return <div />;
		}

		if (!this.props.pos) {

		}

		const {
			pois,
			pos,
			festival,
			limit = false
		} = this.props;

		let compassNavigatorRender = '';
		if (this.state.poiIdForCompass) {
			compassNavigatorRender = (
				<CompassNavigation
					compassNavigationClose={this.compassNavigationClose}
					poiId={this.state.poiIdForCompass}
					pos={pos}
				/>
			);
		}

		
		let poiRender = '';
		let sliceOfPois = '';
		if (pois) {
			if (limit) {
				sliceOfPois = pois.slice(0, limit);
			} else {
				sliceOfPois = pois;
			}
			poiRender = sliceOfPois.map((poi, index) => (
				<PoiItem
					openCompassNavigation={this.openCompassNavigation}
					scrollPosition={this.state.scrollPosition}
					readOnly={this.props.readOnly}
					poi={poi}
					index={index}
					distance={poi.distance}
					pos={pos}
					deletePoi={this.deletePoi}
					festivalId={festival._id}
					key={poi._id + index}
					getFestivalPois={this.props.getFestivalPois}
				/>
			));
		}

		return (
			<div style={{ paddingBottom: '20px' }}>
				<ScrollableAnchor id={'poiList'}>
					<div />
				</ScrollableAnchor>
				{poiRender}
				{compassNavigatorRender}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFestivalPois: festivalId => dispatch(getFestivalPois(festivalId))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(PoiContaier);
