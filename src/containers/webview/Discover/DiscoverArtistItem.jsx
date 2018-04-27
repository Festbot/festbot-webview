import React, { Component } from 'react'


import classes from './DiscoverContainer.css';

import Details from './Details.jsx'

import IconDetails from 'material-ui/svg-icons/navigation/expand-more';
import IconClose from 'material-ui/svg-icons/navigation/close';


export class DiscoverArtistItem extends Component {
  state={
    cardHeight:0,
  }

  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    console.log('scrolltop:', scrollTop,' pageYOffset:', window.pageYOffset,' documentElement.scrollTop:', document.documentElement.scrollTop,' recttop:', rect.top,)

    return rect.top + scrollTop

  }

  smoothScroll=(el) =>{
    let fromTop = el.getBoundingClientRect();
    fromTop = el.getBoundingClientRect().top;

    if (fromTop<2 ) {
      clearInterval(this.intervalId)
      const cardHeight = el.getBoundingClientRect().height
      this.setState({cardHeight: cardHeight});
      return
    }

    let yOffset = window.pageYOffset || document.documentElement.scrollTop;
    let frameOffset = fromTop/20;
    (frameOffset<1)?frameOffset=1:frameOffset;
    let scrollTo= yOffset+frameOffset
    window.scrollTo(0,scrollTo)
  }

  componentWillUnmount() {
    
  }

  detailsContentOpenHandler = (e) => {
    
    

    if (!this.props.isActiveDetails) {

      setTimeout(() => {
        this.intervalId = setInterval(() => this.smoothScroll(this.activeDetailsDiv),10)
        //window.scrollTo(0,this.offset(this.activeDetailsDiv))
      }, 450);
    }
    this.props.detailsIsOpenHandler(e)
  }
  


  
  render() {

    const {artist,isActiveDetails,isOpenDetails} = this.props

    let renderingDetails = '';
    if (isActiveDetails) {

      renderingDetails = <Details 
        artist={artist.slug} />
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
            artist.hasPhoto? 'url(https://chatbot.festbot.com/assets/img/artist/' +
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



export default DiscoverArtistItem;


