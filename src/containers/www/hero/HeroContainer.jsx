import React from 'react'
import classes from './HeroContainer.css' 

const Hero = () => {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.header}>Get the most out of the festival season</div>
          <div className={classes.title}>Festbot is your best personal assistant for festivals</div>
          <div className={classes.getStarted}>Get Started</div>
        </div>
      </div>
    </div>
    
  )
}

export default Hero
