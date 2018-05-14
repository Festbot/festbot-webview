import React, { Component } from 'react'
import classes from './ContentBlockContainer.css'

export class ContentBlockContainer extends Component {


  render() {

    return (
      <div className={classes.container} 
      style={{
        backgroundColor:this.props.backgroundColor, 
        backgroundImage: "url('"+ this.props.imageUrl +"')",
        minHeight: this.props.height,
        
        backgroundPosition: this.props.backgroundPosition +" center"
      }} >
        {this.props.children}
      </div>
    )
  }
}

export default ContentBlockContainer
