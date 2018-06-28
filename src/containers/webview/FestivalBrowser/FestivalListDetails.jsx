import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './festivalListItem.css';
import RaisedButton from 'material-ui/RaisedButton';
import { Rating } from 'material-ui-rating';
import moment from 'moment';

export class ProgramDetails extends Component {
	state = {
		slideIndex: 0,
		events: [],
		artist: {
			facebook: '',
			website: '',
			spotify: '',
			genres: []
		}
	};

	render() {
		return (
			<div>
				<div className={classes.detailsContent}>
					<div style={{ width: '50%' }}>
						<h2>Start date: </h2>
						<p>{moment(this.props.festivalStartDate).format('MMM Do')}</p>
					</div>
					<div style={{ width: '50%' }}>
						<h2>End date:</h2>
						<p>{moment(this.props.festivalEndDate).format('MMM Do')}</p>
					</div>{' '}
					<div>
						<RaisedButton containerElement={<Link to={'/festival/' + this.props.festival._id} />} onClick={this.props.webviewMenuChange} label="Browse" primary={true} style={{ float: 'right' }} />
					</div>
				</div>

				<div className={classes.detailsHeader}>Description:</div>
				<div className={classes.detailsContent}>{this.props.festival.description}</div>

				<div className={classes.detailsContent}>
					<div style={{ width: '50%' }}>
						<h2>Rating: {this.props.festival.rating}</h2>
						<Rating
							itemStyle={{
								width: '25px',
								padding: '0',
								margin: '0'
							}}
							value={this.props.festival.rating}
						/>
					</div>
					<div style={{ width: '50%' }}>
						<h2>Ticket:</h2>
						<p>{this.props.festival.website}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default ProgramDetails;
