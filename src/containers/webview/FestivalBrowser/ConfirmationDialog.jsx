import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class ConfirmatiponDialog extends Component {
	render() {
		const {
			onCancelClick,
			onEnableClick,
			open
		} = this.props;

		//modal buttons
		const actions = [
			<FlatButton
				label="cancel"
				primary={true}
				onClick={onCancelClick}
			/>,
			<FlatButton
				label="enable"
				primary={true}
				onClick={onEnableClick}
			/>
		];

		return (
			<Dialog
				title="Festbot activation"
				actions={actions}
				modal={false}
				open={open}
			>
				<p>
					Activate your Festbot to follow this venue events and
					receive useful informations.
				</p>
			</Dialog>
		);
	}
}

export default ConfirmatiponDialog;
