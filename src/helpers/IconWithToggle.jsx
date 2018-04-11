import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const IconWithToogle = props => 
		<FontIcon
			title={props.title}
			onClick={props.handleItemClick}
			style={{ color: props.isToggled ? '#E65100' : '#444' }}
			className="material-icons"
		>
			{props.iconName}
		</FontIcon>



export default IconWithToogle;
