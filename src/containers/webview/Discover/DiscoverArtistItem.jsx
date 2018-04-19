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

  

  detailsContentOpenHandler = (e) => {
    
    if (!this.props.isActiveDetails) {
      setTimeout(() => {
        window.scrollTo(0,this.offset(this.activeDetailsDiv)+80)
      }, 300);
    }
    this.props.detailsIsOpenHandler(e)
  }
  
  
  render() {

    const {artist,isActiveDetails,isOpenDetails} = this.props

    let renderingDetails = '';
    if (isActiveDetails) {

      renderingDetails = <Details artist={this.props.artist.slug} />
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
            artist.hasPhoto? 'url(http://festbot.com/assets/img/artist/' +
            artist._id +
            '.jpg)':'none'
        }}
      >
        <div id={this.props.artist.name} onClick={this.detailsContentOpenHandler} className={classes.listItemWrapper}>
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

export default DiscoverArtistItem
