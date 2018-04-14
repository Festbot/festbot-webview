import React from 'react';
import { Link } from 'react-router-dom'


import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';
import Add from 'material-ui/svg-icons/content/add';
import Done from 'material-ui/svg-icons/action/done';
import Avatar from 'material-ui/Avatar';
import { Rating } from 'material-ui-rating';

import { GridList, GridTile } from 'material-ui/GridList';
import { IconButton } from 'material-ui';

import * as colors from 'material-ui/styles/colors';

import { List, ListItem } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import classes from './festivalListItem.css';

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

const FestivalListItem = props => {
	return (
		<div>
			<ListItem
				onClick={props.detailsIsOpenHandler}
				title={props.festival.name}
				hoverColor={colors.grey50}
				rightIconButton={
					<IconButton
						name={props.festival.name}
						primary={props.isActiveItem}
						onClick={props.handleOpen}
					>
						{props.isActiveItem ? (
							<Done color={colors.orange900} />
						) : (
							<Add color={colors.teal400} />
						)}
					</IconButton>
				}
				primaryText={props.festival.name}
				secondaryText={
					<div>
						<FontIcon
							className="material-icons"
							style={styles.icon}
						>
							location_on
						</FontIcon>
						{props.festival.location.address}
						<FontIcon
							className="material-icons"
							style={styles.icon}
						>
							access_time
						</FontIcon>
						{props.festival.dates[0]}
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
				<div className={classes.flexRow}>
					<div className={classes.flexColumn}>
						<h2>Start date: </h2>
						<p>{props.festival.dates[0]}</p>
					</div>
					<div className={classes.flexColumn}>
						<h2>End date:</h2>
						<p>
							{
								props.festival.dates[
									props.festival.dates.length - 1
								]
							}
						</p>
					</div>

					<Avatar icon={<DetailsIcon />} />
				</div>
				<p />
				<div className={classes.column}>
					<div>
						<h2>Description: </h2>
						<p>{props.festival.description}</p>
					</div>

					<div className={classes.flexRow}>
						<p />
						<div className={classes.flexColumn}>
							<div>
								<h2>Ticket: </h2>
								<a href={props.festival.website}>
									<p>{props.festival.website}</p>
								</a>
							</div>
						</div>
						<div className={classes.flexColumn}>
							<div>
								<h2>
									Rating: {props.festival.rating}
									<Rating
										itemStyle={{
											width: '25px',
											padding: '0',
											margin: '0'
										}}
										value={props.festival.rating}
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
								title={props.festival.name}
								onClick={props.detailsIsOpenHandler}
								style={{ float: 'right' }}
							/>
						</div>
						<div className={classes.flexColumn}>
              <RaisedButton
                containerElement={<Link to={"/festival/" + props.festival.name}/>}
                onClick={props.webviewMenuChange}
								label="Browse"
								primary={true}
								style={{ float: 'right' }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FestivalListItem;
