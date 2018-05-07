import React from 'react';
import phoneCanvas from '../../../assets/images/phone_canvas-01.png';
import classes from './ContentBlockImage.css';

const ContentBlockImage = (props) => {
	return (
		<div className={classes.container}>
			<img src={phoneCanvas} />
      
      <div className={classes.frame}>
				<div className={classes.video}>
					<video autoPlay loop height="416">
						<source
							src={props.videoUrl}
							type="video/mp4"
						/>
					</video>
				</div>
      </div>
      
		</div>
	);
};

export default ContentBlockImage;
