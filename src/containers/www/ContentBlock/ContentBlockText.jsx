import React from 'react'
import classes from './ContentBlockText.css'

const ContentBlockText = (props) => {
  return (
    <div className={classes.container} style={{textAlign: props.alignDirection}}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.description}>{props.description}</div>
    </div>
  )
}

export default ContentBlockText
