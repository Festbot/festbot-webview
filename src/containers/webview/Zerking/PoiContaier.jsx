import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScrollableAnchor from 'react-scrollable-anchor';
import PoiItem from './PoiItem.jsx';
import { getFestivalPois } from '../../../store/actions';
import CompassNavigation from '../Navigator/CompassNavigation.jsx';
import EditPoi from './EditPoi.jsx'


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

	modalClose = () => {
		this.setState({ poiIdForCompass: '', poiIdForEdit:''});
	};


	openPoiEditForm=poi=>{
		this.setState({ poiIdForEdit: poi._id })
	}


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

		

		let rendereditPoi = '';
		if (this.state.poiIdForEdit) {
			rendereditPoi = (
				<EditPoi
					onClose={this.modalClose}
					poiId={this.state.poiIdForEdit}
				/>
			);
		}


		let compassNavigatorRender = '';
		if (this.state.poiIdForCompass) {
			compassNavigatorRender = (
				<CompassNavigation
					compassNavigationClose={this.modalClose}
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
					onClickHandler={this.props.isZerking?this.openPoiEditForm:this.openCompassNavigation}
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
				{rendereditPoi}
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
