import React, { Component } from 'react';
import { Consumer } from './Map.jsx';

const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
const iconBasePal4 = 'http://maps.google.com/mapfiles/kml/pal4/'
const iconBasePal3 = 'http://maps.google.com/mapfiles/kml/pal3/'
const iconBasePal2 = 'http://maps.google.com/mapfiles/kml/pal2'
const festbot = 'https://ucarecdn.com/'
const iconSize = '/-/resize/32x32/'

const icons = {
	parking: {
		icon: festbot + "e1f47a64-c102-4844-9332-88d843d6338b" + iconSize
	},
	library: {
		icon: iconBase + 'library_maps.png'
	},
	information: {
		icon: festbot + '02d14279-b76b-40ea-9805-547be8830f67' + iconSize
	},
	arrow: {
		icon: iconBase + 'cross-hairs_highlight.png'
	},
	default: {
		icon: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png'
	},
	first_aid: {
		icon: festbot + 'b65f907a-8872-4caf-a841-ceb587d87569' + iconSize
	},
	supermarket: {
		icon: festbot + 'e356dafb-a1e2-4ba4-8eed-f8de4aa4cc1b' + iconSize
	},
	coffee: {
		icon: festbot + '01f456bd-ac6d-4ca9-8840-85387014d6f0' + iconSize
	},
	camping: {
		icon: festbot + 'a66e1160-9c7b-4017-9488-3866c3d922b1' + iconSize
	},
	pharmacy: {
		icon: festbot + "853992e2-be7f-4140-b2b2-7aed4d939ad7" + iconSize 
	},	
	wc: {
		icon: festbot + 'c4867bcc-8b45-42ce-82b7-115271fd79a2' + iconSize
	},	
	shower: {
		icon: festbot + '785c43f0-fa5f-4a3c-ae0b-a8999ab45b65' + iconSize
	},	
	entrance: {
		icon: festbot + 'c7279112-4d22-41ca-96a4-dfd2b7abf001' + iconSize
	},	
	taxi: {
		icon: festbot + 'ddcdf7e7-93c5-4f70-94a2-581e73cb3ca8' + iconSize
	},	
	tobacco: {
		icon: festbot + 'fa51f40c-94db-4b7f-9006-0d4afa5843f5' + iconSize
	},	
	lockers: {
		icon: festbot + 'decd6d36-bbe2-47af-a5d3-18b8979e612f' + iconSize
	},	
	charging_station: {
		icon: festbot + '47f47e5a-d673-4386-b79a-32ad6c7dc348' + iconSize
	},	
	atm: {
		icon: festbot + 'f325181a-2d20-4a69-a09a-f9bffe13cfc2' + iconSize
	},	
	massage: {
		icon: festbot + 'f31c6f5e-85d4-41be-b78f-dfc0f60677a5' + iconSize
	},	
	bike_storage: {
		icon: festbot + '16965c32-abfb-403f-9ffd-0e91b597d4c0' + iconSize
	},	
	beer: {
		icon: festbot + 'b64d6ba8-5657-4ad8-a8d5-9007f1e9975b' + iconSize
	},	
	wine: {
		icon: festbot + 'a203f497-9f37-4154-a5f8-33084c33bd4b' + iconSize
	},	
	cocktails: {
		icon: festbot + 'eb27a9a6-9817-4877-b0dd-37f21cc3d81f' + iconSize
	},	
	whisky: {
		icon: festbot + 'cbfd7831-0acc-4bb5-bd65-b3b5beee836a' + iconSize
	},	
	shots: {
		icon: festbot + '73e04b7e-98d5-44f4-a5c6-47dd94445dde' + iconSize
	},	
	smoothie: {
		icon: festbot + '05e832ee-9d6b-469b-a7e2-4ad8d13a754e' + iconSize
	},	
	hotdog_hamburger: {
		icon: festbot + 'b86e63ce-85d7-48a9-b5d4-3e0b9e23a6d2' + iconSize
	},	
	pizza: {
		icon: festbot + 'f9e4dc46-4c60-406a-8626-da8c6d1ce98a' + iconSize
	},	
	mexican: {
		icon: festbot + 'e50dc3f8-742e-4c34-8e2d-40f6ce0fda6c' + iconSize
	},	
	gyros: {
		icon: festbot + 'ac1da83e-561a-423d-806f-c48cd77d5b88' + iconSize
	},	
	healthy_food: {
		icon: festbot + '288a0deb-2482-4af6-b02b-63a09f98adaa' + iconSize
	},	
	breakfast: {
		icon: festbot + '1aa2f496-dda8-4398-88ea-07ec020a1d88' + iconSize
	},	
	fish: {
		icon: festbot + 'dc30223c-26d2-4510-81f4-2f05a80f3434' + iconSize
	},	
	vegan: {
		icon: festbot + '27b2b3c6-9ccd-4685-b0ff-174b7e3cffaf' + iconSize
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


		let iconCategory=''
		if (icons[iconType]) {iconCategory = iconType} else { iconCategory ='default' }

		this.marker = new google.maps.Marker({
			position: pos,
			map: map,
			icon: {
				url: icons[iconCategory].icon,
				anchor: new google.maps.Point(16, 16)
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
