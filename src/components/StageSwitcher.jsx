import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './StageSwitcher.css';

import LeftArrowIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightArrowIcon from 'material-ui/svg-icons/navigation/chevron-right';
export class StageSwitcher extends Component {
	state = {
		isOpenDropdown: false
	};

	festivalEventStageFilterHandler = activeStage => {
		const stage = activeStage.currentTarget.id;
		window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
		this.props.setActiveStage(stage);
		if (activeStage.currentTarget.id == 'HELYSZÍNEK') {
			this.props.setActiveStage('HELYSZÍNEK');
		}
		this.dropdownToggleHandler();
	};

	dropdownToggleHandler = () => {

		this.setState(prevState => {
			return {
				isOpenDropdown: !prevState.isOpenDropdown
			};
		});
	};

	navigationClickHandler = e => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		const index = this.props.eventStages.indexOf(this.props.activeStage);
		//Left shift
		if (index > 0 && e.currentTarget.id == 1) {
			this.props.setActiveStage(this.props.eventStages[index - e.currentTarget.id]);
		}
		//Right shift
		if (index < this.props.eventStages.length-1 && e.currentTarget.id == -1) {
			this.props.setActiveStage(this.props.eventStages[index - e.currentTarget.id]);
		}

		if (index == 0 && e.currentTarget.id == 1) {
			this.props.setActiveStage('HELYSZÍNEK');
		}
		
	};

	render() {
		let eventStageSwitcherItem = this.props.eventStages.map((e, i) => {
			<li id="HELYSZÍNEK" onClick={this.festivalEventStageFilterHandler} className={this.props.activeStage == e ? classes.activeSelection : classes.item}>
				HELYSZÍNEK Stages
			</li>;
			if (this.props.eventStages.length > 1) {
				return (
					<li id={e} key={i} onClick={this.festivalEventStageFilterHandler} className={this.props.activeStage == e ? classes.activeSelection : classes.item}>
						{e}
					</li>
				);
			}

			return null;
		});

		return (
			<div>
				<div className={classes.container} >
					<div className={classes.navigation}>
						<LeftArrowIcon id={1} onClick={this.navigationClickHandler} style={{ height: '100%', margin: 'auto', width: '30px' }} />
					</div>
					<div id={this.props.activeStage} onClick={this.dropdownToggleHandler} className={classes.active}>
						<span className={classes.slidein}>{(this.props.activeStage=="HELYSZÍNEK")?"HELYSZÍNEK / STAGE ":this.props.activeStage}</span>
					</div>
					<div className={classes.navigation}>
						<RightArrowIcon id={-1} onClick={this.navigationClickHandler} style={{ height: '100%', margin: 'auto', width: '30px' }} />
					</div>
				</div>
				<div className={classes.dropDownContainer} style={this.state.isOpenDropdown ? { maxHeight: '300px' } : { maxHeight: '0', padding: '0' }}>
					<li id="HELYSZÍNEK" onClick={this.festivalEventStageFilterHandler} className={this.props.activeStage == 'HELYSZÍNEK' ? classes.activeSelection : classes.item}>
						HELYSZÍNEK ( ALL )
					</li>
					{eventStageSwitcherItem}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		eventStages: state.eventStages,
		activeStage: state.activeStage,
		isActive: {
			Filter: state.isActiveFilter
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setActiveStage: stage => dispatch({ type: 'UPD_ACTIVESTAGE', value: stage })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StageSwitcher);
