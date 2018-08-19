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

	changeHandler = item => {
		const arrayOfTags = item.map(result => result.value);
		this.props.input.onChange(arrayOfTags);
		
	};


	render (){
		const initialValue = poiTypeOptions().filter(tag=> {
			return this.props.input.value.indexOf(tag.value)>-1
		})
	
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
