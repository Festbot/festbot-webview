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
			<div style={{ position: 'relative' }}>
				<ActionSearch
					style={{
						position: 'absolute',
						right: 0,
						top: 15,
						width: 20,
						height: 20
					}}
				/>
        <TextField
          inputStyle={{ borderColor: 'black' }}
					hintText="Search by Festival Name"
					onChange={this.debounce}
					fullWidth={true}
				/>
			</div>
		);
	}
}

export default SearchBar;
