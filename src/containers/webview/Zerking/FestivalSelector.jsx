import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import SearchBar from '../../../ui/SearchBar.jsx';

import VisibilityControl from '../../../hoc/VisibilityControl/VisibilityControl.jsx'

import { getFestivalByName } from '../../../helpers/festivalApiHelper.js';

import { setFestival,getFestivalStages,getFestivalPois,setItemToZerking } from '../../../store/actions';

const FestivalSelectorContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
const FestivalItem = styled.div`
	margin: 50px;
	background-color: rgb(79, 60, 98);
	text-align: center;
	width: 90%;
	margin: 10px auto;
	padding: 10px 10px;
	font-size: 130%;
	color: white;
	box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
	border-radius: 3px;
	font-weight: 100;
	cursor: pointer;


`;


const FixedAddButton = styled.div`


background-color: rgb(22, 180, 88);
text-align: center;
width: 100%;

padding: 20px 10px;
font-size: 120%;
color: white;

font-weight: 100;
cursor: pointer;
box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

position:fixed;
bottom:0;
z-index:5;

`;



const Dots = styled.div`
	width: 10px;
	display: inline-block;
	float:right;
`;
const Dot = styled.div`
	height: 5px;
	width: 5px;
	background-color: #fff;
	border-radius: 50%;
	margin: 3px 2px;
	padding: 0;
`;

export class FestivalSelector extends Component {
	state ={
		showFixed:false
	}
	componentWillMount(){
	//	this.visibilityActionHandler()
	}


	festivalListFilter = async keyword => {
		const festivalList = await getFestivalByName(keyword);

		this.festivalListRender = festivalList.map(this.renderFestivalList);
		this.forceUpdate();
	};

	setActiveFestival = festival => {
		this.props.setActiveFestival(festival);
		festival&&this.props.getFestivalStages(festival._id)
		festival&&this.props.getFestivalPois(festival._id)
		this.props.setItemToZerking([])

		this.festivalListFilter();
	};

	componentDidMount() {
		this.festivalListFilter();
	}

	renderFestivalList = festival => {
		return (
			<FestivalItem key={festival._id} onClick={() => this.setActiveFestival(festival)}>
				{festival.name}
			</FestivalItem>
		);
	};


	visibilityActionHandler=(itemVisible)=>{
		if (!itemVisible) {
			this.setState({showFixed:true})

		} else {
			this.setState({showFixed:false})

		}
}


	render() {
		if (!this.props.festival) {
			return (
			
				<FestivalSelectorContainer>
					<FestivalItem style={{ backgroundColor: 'rgb(229, 0, 88)' }}>{`Select Festival`}</FestivalItem>
					<SearchBar searchQueryChanged={this.festivalListFilter} placeholder="Search Festival" />
					{this.festivalListRender}
				</FestivalSelectorContainer>

			);
		}

		return (
			<div>

			<VisibilityControl  always={true} visibilityActionHandler={this.visibilityActionHandler}>
					
				<FestivalItem onClick={this.props.onClick} style={{ backgroundColor: 'rgb(22, 180, 88)' }}>
				{this.props.itemsToZerking.length?`Add ${this.props.itemsToZerking.length} here ${this.props.festival.name}`:`${this.props.festival.name}`}
					<Dots onClick={() => this.setActiveFestival()}>
						<Dot />
						<Dot />
						<Dot />
					</Dots>
				</FestivalItem>
				</VisibilityControl>
				{this.props.itemsToZerking.length?this.state.showFixed&&<FixedAddButton onClick={this.props.onClick}>{`Add ${this.props.itemsToZerking.length} POI to ${this.props.festival.name}`}</FixedAddButton>:``}
			</div>
		);
	}
}



const mapDispatchToProps = dispatch => {
	return {
		setActiveFestival: festival => dispatch(setFestival(festival)),
		getFestivalStages: festivalId => dispatch(getFestivalStages(festivalId)),
		getFestivalPois: festivalId => dispatch(getFestivalPois(festivalId)),
		setItemToZerking: item => dispatch(setItemToZerking(item)),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(FestivalSelector);
