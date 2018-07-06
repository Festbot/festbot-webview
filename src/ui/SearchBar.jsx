import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';

class SearchBar extends Component {
  
  debounce = (e,searchQuery) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }  
    
    this.timer = setTimeout(()=>{
      this.props.searchQueryChanged(searchQuery)
    },300)
  }

	render() {



		return (
			<div style={{ position: 'relative',display:'flex',paddingBottom:'10px' }}>
				<ActionSearch
					style={{
						position: 'absolute',
						right: '35px',
						zIndex:1,
						top: 15,
						width: 20,
						height: 20
					}}
				/>
        <TextField
					
					style={{borderColor: 'black',padding:'0 10px',backgroundColor:'rgba(255,255,255,0.9)',borderRadius:'20px',color:'grey',margin:'0 auto',display:'inline-block',width:window.innerWidth-70+"px"}}
					placeholder="Type your search"
					onChange={this.debounce}
					fullWidth={false}
					underlineStyle={{width:window.innerWidth-100+"px"}}
					name="search"
					
				/>
			</div>
		);
	}
}

export default SearchBar;
