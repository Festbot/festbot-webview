import React, { Component } from 'react';
import { connect } from 'react-redux';

import PoiItem from './PoiItem.jsx';
import { getFestivalPois } from '../../../store/actions';

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

	render() {
		if (!this.props.pois) {
			return <div />;
		}
		const {
			pois,
			pos,
			festival,
			readOnly = false,
			limit = false
		} = this.props;
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
					scrollPosition={this.state.scrollPosition}
					readOnly={readOnly}
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

		return <div style={{ paddingBottom: '20px' }}>{poiRender}</div>;
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
