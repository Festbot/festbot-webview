import React from 'react'
import logo from '../assets/images/festbot-logo-01.png'

const FestbotLogo = (props) => {
  return (
    <div>
      <img width={props.width} src={logo}/>
    </div>
  )
}

export default FestbotLogo
