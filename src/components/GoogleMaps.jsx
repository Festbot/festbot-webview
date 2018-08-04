import React, { Component } from 'react'
import querystring from 'querystring'
import classes from './GoogleMaps.css'
import axios from 'axios';
export class GoogleMaps extends Component {
  state={
    stage:''
  }
  async componentDidMount() {
    const {data:stage} =  await axios.get(`https://api.festbot.com/venues/${this.props.stageId}`);

    this.setState({ stage: stage });

  }

  handler=(e)=>{
    e.stopPropagation()
    window.location.href=`https://www.google.com/maps/search/?api=1&query=${this.state.stage.coordinates.lat},${this.state.stage.coordinates.lng}`
  }




  mapsItem = () =>{
    if (this.state.stage==''){return}

    if (this.state.stage.coordinates.lat==null){
      return <p>Map and Navigation will be available once the Location of the event has been confirmed by the Festbot team.</p>
    }
    return (<div>     <img className={classes.map} onClick={this.handler} src={this.getStaticMapUrl(this.state.stage.coordinates.lat,this.state.stage.coordinates.lng)}/>
    <p>Click for navigation</p>
      </div>

    )
  }


   getStaticMapUrl =  (lat, lng) =>{
    return (
      'https://maps.googleapis.com/maps/api/staticmap?' +
      querystring.stringify({
        center: `${lat},${lng}`,
        zoom: 16,
        scale: 2,
        format: 'png',
        size: '200x200',
        maptype: 'roadmap',
        markers: `color:red|${lat},${lng}`,
        key: 'AIzaSyC49vNbH1LIEEtQtY6KxUi7MkTZZqjLIgg',
	  })
    );
  };


  render() {


    return (
      <div>
      <div className={classes.title}>{this.props.stageName}</div>
      {this.mapsItem()}

      </div>
    )
  }
}

export default GoogleMaps
