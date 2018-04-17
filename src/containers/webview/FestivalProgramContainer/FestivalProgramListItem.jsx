import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'

import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';
import Star from 'material-ui/svg-icons/toggle/star';
import Avatar from 'material-ui/Avatar';
import { Rating } from 'material-ui-rating';

import { GridList, GridTile } from 'material-ui/GridList';
import { IconButton } from 'material-ui';

import * as colors from 'material-ui/styles/colors';

import { List, ListItem } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import classes from './FestivalProgramListItem.css';




const styles = {
	icon: {
		marginRight: 5,
		marginLeft: 5,
		fontSize: '12px',
		color: colors.orange800
	},
	rate: {
		marginRight: 5,
		marginLeft: 5,
		fontSize: '12px',
		color: colors.yellow700
	}
};
const propsEventRating= 4.5;



const FestivalProgramListItem = props => {
  
  let propsEventLocation= 'Not announced yet'
  if (props.event.place!=='') {
    propsEventLocation = props.event.place;
  }

  let renderingDetails=''
  if (props.isOpenDetails) {
    renderingDetails = <div>
    <div className={classes.flexRow}>
    <div className={classes.flexColumn}>
      <h2>Start time: </h2>
      <p>{moment(props.event.startDate).format('LT')}</p>
    </div>
    <div className={classes.flexColumn}>
      <h2>End time:</h2>
      <p>
        {moment(props.event.endDate).format('LT')}
      </p>
    </div>

    <Avatar icon={<DetailsIcon />} />
  </div>
  <p />
  <div className={classes.column}>
    <div>
      <h2>Description: </h2>
      <p>{props.event.artist}</p>
    </div>

    <div className={classes.flexRow}>
      <p />
      <div className={classes.flexColumn}>
        <div>
          <h2>Ticket: </h2>
          <a href='ticketlink'>
            <p>{props.event.festival_slug}</p>
          </a>
        </div>
      </div>
      <div className={classes.flexColumn}>
        <div>
          <h2>
            Rating: {propsEventRating}
            <Rating
              itemStyle={{
                width: '25px',
                padding: '0',
                margin: '0'
              }}
              value={propsEventRating}
            />
          </h2>
        </div>
      </div>
    </div>
  </div>
  <p />

  <div className={classes.column}>
    <div className={classes.flexRow}>
      <div className={classes.flexColumn}>
        <RaisedButton
        
          label="Close"
          title={props.event.artist}
          onClick={props.detailsIsOpenHandler}
          style={{ float: 'right' }}
        />
      </div>
      <div className={classes.flexColumn}>
        <RaisedButton
          containerElement={<Link to={"/artist/" + props.event.artist}/>}
          onClick={props.webviewMenuChange}
          label="Artist Profile"
          primary={true}
          style={{ float: 'right' }}
        />
      </div>
    </div>
  </div>
  </div>
  
  }
      
       


 
	return (
		<div>
			<ListItem
				onClick={props.detailsIsOpenHandler}
				title={props.event.artist}
				hoverColor={colors.grey50}
				rightIconButton={
					<IconButton
						name={props.event.artist}
						primary={props.isActiveItem}
						onClick={props.addToFavourite}
					>
						{props.isActiveItem ? (
							<Star color={colors.orange900} />
						) : (
							<Star color={colors.blueGrey100} />
						)}
					</IconButton>
				}
				primaryText={props.event.artist}
				secondaryText={
					<div>
						<FontIcon
							className="material-icons"
							style={styles.icon}
						>
							location_on
						</FontIcon>
						<span className={classes.inverse}>{propsEventLocation}</span>
						<FontIcon
							className="material-icons"
							style={styles.icon}
						>
							access_time
						</FontIcon>
						{moment(props.event.startDate).format('LT')}
					</div>
				}
			/>
      <Divider />

			<div
				style={{
					maxHeight: props.isOpenDetails ? '600px' : '0'
				}}
				className={classes.detailsContainer}
			>
        {renderingDetails}
			</div>
		</div>
	);
};

export default FestivalProgramListItem;
