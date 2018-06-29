import React, { Component } from 'react';

import classes from './FilterSwitchers.css';
import DaySwitcher from '../../../components/DaySwitcher.jsx';
import StageSwitcher from '../../../components/StageSwitcher.jsx';
import classNames from 'classnames';

export class FilterSwitchers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			prevPositionY: 0
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll = () => {
		if (!this.props.isActiveFilter) {
			!this.state.visible ? this.setState({ visible: true }) : null;
			return;
		}

		if ((window.scrollY < 100 && !this.state.visible && this.props.isActiveFilter) || (!this.state.visible && this.props.isActiveFilter && this.state.prevPositionY > window.scrollY)) {
			this.setState({ visible: true });
		}
		if (window.scrollY > 100 && this.state.visible && this.state.prevPositionY < window.scrollY) {
			this.setState({ visible: false });
		}
		this.setState({ prevPositionY: window.scrollY });
	};

	render() {
		const { activeDayClicked, activeStageClicked, isActiveFilter } = this.props;
		return (
			<div className={classNames(classes.container, { [classes.show]: this.state.visible && isActiveFilter, [classes.active]: isActiveFilter })}>
				<DaySwitcher activeDayClicked={activeDayClicked} />
				<StageSwitcher activeStageClicked={activeStageClicked} />
			</div>
		);
	}
}


export default FilterSwitchers;
