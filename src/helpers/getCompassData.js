export function deviceOrientationListener(event) {
		var alpha = event.alpha; //z axis rotation [0,360)
		var beta = event.beta; //x axis rotation [-180, 180]
		var gamma = event.gamma; //y axis rotation [-90, 90]
    //Check if absolute values have been sent
    
    //alert("[absolute]",event.absolute)
		if (typeof event.webkitCompassHeading !== 'undefined') {
			alpha = event.webkitCompassHeading; //iOS non-standard
			var heading = alpha;
			return heading.toFixed([0]);
		} else {
			alert("Your device is reporting relative alpha values, so this compass won't point north :(");
			var heading = 360 - alpha; //heading [0, 360)
			return heading.toFixed([0]);
		}

		// // Change backgroud colour based on heading
		// // Green for North and South, black otherwise
		// if (heading > 359 || heading < 1) { //Allow +- 1 degree
		//   document.body.style.backgroundColor = "green";
		//   return "N"; // North
		// }
		// else if (heading > 179 && heading < 181){ //Allow +- 1 degree
		//   document.body.style.backgroundColor = "green";
		//   return "S"; // South
		// }
		// else { // Otherwise, use near black
		//   document.body.style.backgroundColor = "#161616";
		// }
  }

	export function addDeviceOrientationListener (deviceOrientationListener)  {

	
			window.addEventListener('deviceorientation', deviceOrientationListener);
	
  }
  

  export function removeDeviceOrientationListener (deviceOrientationListener) {

			window.removeEventListener('deviceorientation', deviceOrientationListener);

  }



