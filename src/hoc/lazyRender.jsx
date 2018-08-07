import React, { Component } from 'react'
import VisibilityControl from './VisibilityControl/VisibilityControl.jsx'

export default (WrappedComponent,Placeholder) =>{

  return class lazyRender extends Component {
    state={
      isVisible:false,
    }

    visibilityActionHandler=(itemVisible)=>{
      if (!itemVisible) {
        this.setState({isVisible:false})
        console.log("not visible")
      } else {
        this.setState({isVisible:true})
        console.log("visible")
      }
  }
  

    render() {

      return (
        <div>
        <VisibilityControl always visibilityActionHandler={this.visibilityActionHandler}  >
          {this.state.isVisible?<WrappedComponent {...this.props}/>:<Placeholder/>}
        </VisibilityControl>
        </div>
      )
    }
  }
  
}

 