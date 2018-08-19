import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
    align-items:flex-end;
	overflow-x: scroll;
	width: 100%;
	position: absolute;
	bottom: 0;
    right: 0;
    -webkit-overflow-scrolling: touch;

`;

const ImageItem = styled.div`
    transition: all 0.3s ease-out;
	height: ${props => props.isZoom?'80vw':'100px'};
	width: ${props => props.isZoom?'80vw':'100px'};
	margin: 10px;
	z-index:5;
	position: relative;
  background-size: cover;
  background-position: center center;
`;

export class Images extends Component {
    state={
        imageToZoom:''
    }
	onClickHandler = e => {
        e.stopPropagation();
        if (this.state.imageToZoom==e.currentTarget.id) {
            this.setState({imageToZoom:''})
        } else {
            this.setState({imageToZoom:e.currentTarget.id})
        }
        
    };
    
	render() {
	
		let renderImages;
		if (this.props.poi && !this.props.poi.images == '') {
			renderImages = this.props.poi.images.map(image => {
                const isZoom = this.state.imageToZoom ==image
				return (
					<div key={image}>
                        <ImageItem 
                            isZoom={isZoom}
                            onClick={this.onClickHandler}
                            id={image}
							style={{
								backgroundImage: `url(https://ucarecdn.com/${image}/-/resize/600/)`
							}}
						/>
					</div>
				);
			});
		}

		return <Container>{renderImages}</Container>;
	}
}

export default Images;
