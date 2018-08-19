import React,{Component} from 'react';
import Creatable from 'react-select/lib/Creatable';
import {poiTypeOptions } from './poiTypes.js';

const tagsStyles = {
	control: styles => ({
		...styles,
		width: '60vw',
		backgroundColor: 'white'
	}),
	option: styles => ({
		...styles,
		color: '#222'
	})

};



class CreatableMultiSelectDropdown extends Component {
	state={
		newItem:[]
	}
	changeHandler = item => {
		const arrayOfTags = item.map(result => result.value);
		this.props.input.onChange(arrayOfTags);

		const newItem = item.filter(item=>item.__isNew__)
		
		this.setState({newItem:newItem})
		
	};


	render (){
		let initialValue = poiTypeOptions().filter(tag=> {
			return this.props.input.value.indexOf(tag.value)>-1
		})
		

		if (this.state.newItem.length>0){
			initialValue = initialValue.concat(this.state.newItem)
		}
		return (
			<Creatable
				isMulti
				value={initialValue}
				onChange={this.changeHandler}
				options={poiTypeOptions()}
				styles={tagsStyles}
			/>
		);
	}
	
};

export default CreatableMultiSelectDropdown;
