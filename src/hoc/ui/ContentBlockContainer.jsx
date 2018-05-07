import React, { Component } from 'react'
import classes from './ContentBlockContainer.css'

export class ContentBlockContainer extends Component {


  render() {

    return (
      <div className={classes.container} style={{backgroundColor:this.props.backgroundColor}} >
        {this.props.children}
      </div>
    )
  }
}

export default ContentBlockContainer
