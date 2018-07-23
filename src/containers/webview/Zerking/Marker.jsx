import React, { Component } from 'react';
import { Consumer } from './Map.jsx';

const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

const icons = {
	parking: {
		icon: iconBase + 'parking_lot_maps.png'
	},
	library: {
		icon: iconBase + 'library_maps.png'
	},
	info: {
		icon: iconBase + 'info-i_maps.png'
	},
	arrow: {
		icon: iconBase + 'cross-hairs_highlight.png'
	},
	orange_pin: {
		icon: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png'
	}
};

export class Marker extends Component {
	componentWillUnmount() {
		console.log('unmount marker');
		if (this.marker) {
			this.marker.setMap(null);
		}
	}

	setMapMarker = (map, google) => {
		const { pos, iconType = 'orange_pin' } = this.props;

		this.marker = new google.maps.Marker({
			position: pos,
			map: map,
			icon: icons[iconType].icon
		});

		console.log('[mapsMARKER]', this.marker);
	};

	render() {
		return (
			<Consumer>
				{({ map, google }) => {
					if (map) {
						this.setMapMarker(map, google);
					}
				}}
			</Consumer>
		);
	}
}

export default Marker;
