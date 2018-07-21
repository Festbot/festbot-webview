import React, { Component } from 'react'


import classes from './DiscoverContainer.css';

import Details from './Details.jsx'

import IconDetails from 'material-ui/svg-icons/navigation/expand-more';
import IconClose from 'material-ui/svg-icons/navigation/close';


export class DiscoverArtistItem extends Component {


  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  
    return rect.top + scrollTop

  }

  smoothScroll=(el) =>{
    let fromTop = el.getBoundingClientRect();
    fromTop = el.getBoundingClientRect().top;
    
    if (fromTop<2 && fromTop>-2) {
      const cardHeight = el.getBoundingClientRect().height
      this.props.setLastOpenedDetailsHeight(cardHeight-120)
      return
    }

    let yOffset = window.pageYOffset || document.documentElement.scrollTop;
    let frameOffset = fromTop/5;
		(frameOffset<1 && frameOffset>0)?frameOffset=1:frameOffset;
		(frameOffset<0 && frameOffset>-1)?frameOffset=-1:frameOffset;
    let scrollTo= yOffset+frameOffset
    window.scrollTo(0,scrollTo)
    window.requestAnimationFrame(()=>this.smoothScroll(el))
  }



  detailsContentOpenHandler = (e) => {

   if (!this.props.isActiveDetails) {
     window.requestAnimationFrame(()=>this.smoothScroll(this.activeDetailsDiv))
   }
    this.props.detailsIsOpenHandler(e)
  }
  


  
  render() {

    const {artist,isActiveDetails,isOpenDetails} = this.props

    let renderingDetails = '';
    if (isActiveDetails) {

      renderingDetails = <Details 
        artistId={artist._id}
        artist={artist} />
    }

    return (
      <div ref={element => (this.activeDetailsDiv = element)}
        className={classes.listItemContainer}
        style={{
          maxHeight:
          isActiveDetails
              ? '1000px'
              : '120px',
          minHeight:
          isActiveDetails
              ? '300px'
              : '120px',
          backgroundImage:
            artist.artistPhoto? 'url(https://ucarecdn.com/' +
            artist.artistPhoto +
            '/)':'none',

            transition: isActiveDetails ? 'all 0.3s ease-in-out':'none'
        }}
      >
        <div id={this.props.artist.name} title={this.props.index} onClick={this.detailsContentOpenHandler} className={classes.listItemWrapper}>
          <div
            className={classes.backdropLayer}

          />
          <div className={classes.title}>{artist.name}</div>
          <div
            className={classes.detailsIcon}
      
          >
            {' '}
            {!(isActiveDetails) ? (
              <IconDetails color="white" />
            ) : (
              <IconClose color="white" />
            )}
          </div>
          <div className={classes.country}>{artist.country}</div>
          <div
            className={classes.details}
            style={{
              maxHeight:
                isActiveDetails
                  ? '880px'
                  : '0px',
              padding:
                isActiveDetails
                  ? '0px'
                  : '0px'
            }}
          >
          <div ref={element => (this.activeDetailsDiv = element)}>
            {renderingDetails}
          </div>
            
          </div>
        </div>
      </div>
    );
  }
}



export default DiscoverArtistItem;


