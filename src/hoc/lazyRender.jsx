import React, { Component } from 'react'
import VisibilityControl from './VisibilityControl/VisibilityControl.jsx'

export default (WrappedComponent,Placeholder) =>{

  return class lazyRender extends Component {
    constructor(props){
      super(props);
      this.div = React.createRef();
    }

    state={
      visible:false,
      checkOnce:false
    }


    visibilityActionHandler=(itemVisible)=>{
      if (!itemVisible) {
        this.setState({visible:false})
   

      } else {
        this.setState({visible:true})

      }
  }
  

checkVisible=()=>{

  const rect = this.div.current.getBoundingClientRect()

  if (!this.state.visible&&rect.top<window.innerHeight && rect.top+rect.height >0) {
     this.setState((prevState) => ({visible: true}));
     console.log("set true")
  } else if (this.state.visible&& (rect.top>window.innerHeight || rect.top+rect.height <0)) {
      this.setState((prevState) => ({visible: false}));
   console.log("set false")
  }
}


    componentDidMount(){
      this.checkVisible()
      
    }

    componentDidUpdate(){
      this.checkVisible()
    }

    render() {

      return (
        <div ref={this.div}>
        
          {this.state.visible?<WrappedComponent {...this.props}/>:<Placeholder/>}
        
        </div>
      )
    }
  }
  
}

 