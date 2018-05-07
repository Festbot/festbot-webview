import React, { Component } from 'react'
import classes from './HighlightsContainer.css'

export class HighlightsContainer extends Component {


  render() {

    return (
      <div className={classes.container} style={{backgroundColor:this.props.backgroundColor}} >
        {this.props.children}
      </div>
    )
  }
}

export default HighlightsContainer
