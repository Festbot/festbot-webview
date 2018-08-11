import React, { Component } from 'react';
import styled from 'styled-components';
import { icons } from '../Zerking/mapIcons.js';
import {getDirection} from '../../../helpers/getDirection.js'
import { connect } from 'react-redux';


const MapIcon = styled.img`
	position: relative;
	width: 32px;
	height: 32px;
  top: -16px;
  z-index:2;
`;

const NotificationModal = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;

	align-items: center;
	background-color: rgba(11, 11, 11, 0.8);
	z-index: 20;
	color: #ddd;
	flex-direction: column;
`;

const Ring = styled.div`
position: absolute;
left: 50%;
top: 50%;
	width: 70vw;
	height: 70vw;
	border: 1px solid rgb(70,220,150);
	border-radius: 50%;
	display: flex;
  justify-content: center;
  transform: translate(-50%,-50%) rotate(${props=>props.direction}deg);
`;

const InnerRing = styled.div`
position: absolute;
top: 25%;

	width: 35vw;
	height: 35vw;
	border: 1px solid #555;
	border-radius: 50%;
  transform: translate(-50%,-50%) rotate(${props=>props.direction}deg);
`;

const Info = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform:  translate(-50%,-50%);
font-size:200%
font-weight:bold;
text-align center;
text-shadow: 3px 3px 12px rgba(110, 110, 110, 1);
z-index:2;
color: rgb(70,220,150);
`
const Title = styled.div`
display:block;
font-weight:100;
line-height:140%;
`
const VerticalLine = styled.div`
position:absolute;
	height: 70vw;
	width: 1px;
  background-color: rgba(120, 120, 120, 0.6);
  
	margin: 0 auto;
`;

const HorizontalLine = styled.div`
	position: absolute;
	top: 35vw;
	height: 1px;
	width: 70vw;
	background-color: rgba(120, 120, 120, 0.6);
	margin: auto 0;
`;

export class CompassNavigation extends Component {


  calculateDirection = (lat1,lng1,lat2,lng2) => {
   
    const direction= getDirection(lat1,lng1,lat2,lng2)
    const compass = this.props.heading

    // ne kerdezd miert de igy lehet kiszamolni, h merre kell menni
    let x = (compass-direction)
    if(direction>compass) {x=-x}
    if (x>180) {x=x-360}
    if((compass-direction)>0) {x=-x}

    // const unit=(window.innerWidth*0.8)/360
    // x = unit*x
    return x.toFixed()
  }





	render() {
    const { poi,pos } = this.props;
    
		const iconType = poi.category;
		let iconCategory = '';
		if (icons[iconType]) {
			iconCategory = iconType;
		} else {
			iconCategory = 'default';
		}
		const iconUrl = icons[iconCategory].icon;


    let distance;
		if (this.props.poi.distance !== null) {
			const d = poi.distance;
			distance = `${d.toFixed()}m`;
			if (d > 1999) {
				distance = `${(d / 1000).toFixed(2)}km`;
			}
			if (d > 9999) {
				distance = `${(d / 1000).toFixed()}km`;
			}
		}


		return (
			<div>
				<NotificationModal onClick={this.props.compassNavigationClose}>
          
          <Info><Title>{poi.name}</Title>{distance}</Info>
					<Ring direction={this.calculateDirection(pos.lat,pos.lng,poi.coordinates.lat, poi.coordinates.lng)}>
            <MapIcon src={iconUrl} />
            <VerticalLine/>
            <HorizontalLine/>
            <InnerRing/>
					</Ring>
				</NotificationModal>
			</div>
		);
	}
}


const mapStateToProps = ({ zerking }) => {
  return {
    heading: zerking.heading
  };
};

export default connect(mapStateToProps)(CompassNavigation);
