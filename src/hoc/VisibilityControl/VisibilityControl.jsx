import React, { Component } from 'react'
import classes from './VisibilityControl.css'
import debounce from 'lodash.debounce'

var isFirst= true

export class VisibilityControl extends Component {
  state= {
    visible:false,
    width:0,
  }

  componentDidMount =()=> {
    if (isFirst) {
      
    }
    window.addEventListener("scroll", debounce(this.checkVisible,10));

    this.setState((prevState) => ({
      width:this.div.getBoundingClientRect().width
    }));

    this.checkVisible()
    this.props.visibilityActionHandler&&this.props.visibilityActionHandler(true)
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.checkVisible);
  };


checkVisible=()=>{
    const rect = this.div.getBoundingClientRect()
    if (rect.y<window.innerHeight && rect.y+rect.height >0) {
      this.state.visible ? null : this.setState((prevState) => ({visible: true}));
      this.props.visibilityActionHandler&&this.props.visibilityActionHandler(this.state.visible)
    } 
    if (this.props.always && (rect.y>window.innerHeight || rect.y+rect.height <0)) {
      !this.state.visible ? null : this.setState((prevState) => ({visible: false}));
      this.props.visibilityActionHandler&&this.props.visibilityActionHandler(this.state.visible)
    }
  }


  render() {
    let effect={}
    switch (this.props.effect) {
      case 'fade':
        effect={opacity: this.state.visible ? 1:0.01,
        };
        break;
      case 'left':
        effect={
          transform: this.state.visible ? "translateX(0px)":"translateX(-"+ this.state.width +"px)"
        };
        break;
      case 'right':
        effect={
          transform: this.state.visible ? "translateX(0px)":"translateX(" + this.state.width + "px)"
        };
        break;
      case 'zoom':
        effect={
          transform: this.state.visible ? "scale(1)":"scale(0.8)"
        };
        break;
      default:
        effect={opacity: this.state.visible ? 1:0.01};
    }

    return (
      <div style={effect} className={[classes.container,classes[this.props.effect]].join(" ")} ref={el => (this.div = el)} >
        {this.props.children}
        
      </div>
    )
  }
}

export default VisibilityControl
