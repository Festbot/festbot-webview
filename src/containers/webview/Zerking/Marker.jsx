import React, { Component } from 'react';
import { Consumer } from './Map.jsx';

const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
const iconBasePal4 = 'http://maps.google.com/mapfiles/kml/pal4/'
const iconBasePal3 = 'http://maps.google.com/mapfiles/kml/pal3/'
const iconBasePal2 = 'http://maps.google.com/mapfiles/kml/pal2'
const festbot = 'https://ucarecdn.com/'

const icons = {
	parking: {
		icon: iconBase + 'parking_lot_maps.png'
	},
	library: {
		icon: iconBase + 'library_maps.png'
	},
	information: {
		icon: iconBasePal3 + 'icon43.png'
	},
	arrow: {
		icon: iconBase + 'cross-hairs_highlight.png'
	},
	default: {
		icon: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png'
	},
	first_aid: {
		icon: iconBasePal4 + 'icon63.png'
	},
	supermarket: {
		icon: iconBasePal3 + 'icon26.png'
	},
	coffee: {
		icon: iconBasePal2 + 'icon62.png'
	},
	camping: {
		icon: festbot + 'tents.png'
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
		if (this.marker) {
      
			return;
		}

		const { pos, iconType = 'default' } = this.props;

		console.log('addMarker');
		let iconCategory=''
		if (icons[iconType]) {iconCategory = iconType} else { iconCategory ='default' }

		this.marker = new google.maps.Marker({
			position: pos,
			map: map,
			icon: {
				url: icons[iconCategory].icon,
				anchor: new google.maps.Point(10, 16),
				size: new google.maps.Size(30, 30)
			}
		});
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
