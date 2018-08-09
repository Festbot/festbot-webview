import React, { Component } from 'react';
import store from '../store/store.js';
import { connect } from 'react-redux';
import { setHeading } from '../store/actions';

var isListening = false;

export const getHeadingWrapper = WrappedComponent => {
	if (!isListening) {
		isListening = true;

		if (window.AbsoluteOrientationSensor) {
			const sensor = new AbsoluteOrientationSensor({ frequency: 10 });
			sensor.onreading = () =>{
        console.log(calculateHeading(...sensor.quaternion))
        store.dispatch(setHeading(calculateHeading(...sensor.quaternion).toFixed(0)));
      }
        
			sensor.onerror = event => {
				if (event.error.name == 'NotReadableError') {
					console.log('Sensor is not available.');
				}
			};
			sensor.start();
		} else {
			window.addEventListener(
				'deviceorientation',
				function deviceOrientationListener(event) {
					var heading = 0;
					var alpha = event.alpha; //z axis rotation [0,360)
					//Check if absolute values have been sent

					//alert("[absolute]",event.absolute)
					if (typeof event.webkitCompassHeading !== 'undefined') {
						alpha = event.webkitCompassHeading; //iOS non-standard
						heading = alpha;
					} else {
						console.warn(
							"Your device is reporting relative alpha values, so this compass won't point north :("
						);
						heading = 360 - alpha; //heading [0, 360)
					}
					store.dispatch(setHeading(heading.toFixed(0)));
				}
			);
		}
  }
  
  function calculateHeading(w, x, y, z) {

    let t0 = 2.0 * (w * x + y * z);
    let t1 = 1.0 - 2.0 * (x * x + y * y);
    let X = Math.atan2(t0, t1);
    return -(toDeg(X))+180
  }


  function toDeg(rad) {
    return rad * 180 / Math.PI;
}

	class heading extends Component {
		render() {
			return (
				<WrappedComponent
					{...this.props}
					heading={this.props.heading}
				/>
			);
		}
	}

	const mapStateToProps = ({ zerking }) => {
		return {
			heading: zerking.heading
		};
	};

	return connect(mapStateToProps)(heading);
};

export default getHeadingWrapper;
