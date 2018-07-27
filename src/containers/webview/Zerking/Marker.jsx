import React, { Component } from 'react';
import { Consumer } from './Map.jsx';
import {icons} from './mapIcons.js'


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


		let iconCategory=''
		if (icons[iconType]) {iconCategory = iconType} else { iconCategory ='default' }

		this.marker = new google.maps.Marker({
			position: pos,
			map: map,
			icon: {
				url: icons[iconCategory].icon,
				anchor: new google.maps.Point(16, 16),
				scaledSize: new google.maps.Size(32, 32)
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
