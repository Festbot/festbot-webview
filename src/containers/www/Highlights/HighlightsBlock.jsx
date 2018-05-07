import React from 'react'
import classes from './HighlightsBlock.css'

const HighlightsBlock = (props) => {
  return (
    <div className={classes.container} style={{textAlign: props.alignDirection}}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.description}>{props.description}</div>
    </div>
  )
}

export default HighlightsBlock
