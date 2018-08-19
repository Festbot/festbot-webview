import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Uploader from './Uploader.jsx';
import CreatableMultiSelectDropdown from './CreatableMultiSelectDropdown.jsx';

import {
	getPoiById,
	updatePoiItem
} from '../../../helpers/festivalApiHelper.js';

const NotificationModal = styled.div`
	overflow-y: auto;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;

	align-items: center;
	background-color: rgb(22, 22, 22);
	z-index: 20;
	color: #ddd;
	flex-direction: column;
	colour: white;
`;

const FormItem = styled.div`
	padding: 10px;
	display: flex;
	justify-content: space-between;
`;

const InputField = styled(Field)`
	height: 24px;
	padding: 5px;
	border-radius: 5px;
`;
const Submit = styled.button`
	text-align: center;
	text-decoration: none;
	padding: 10px 20px;
	border-radius: 5px;
	font-size: 130%;
	background-color: rgb(22, 155, 90);
	color: #ddd;
`;
const Cancel = styled.button`
	text-align: center;
	text-decoration: none;
	padding: 10px 20px;
	border-radius: 5px;
	font-size: 130%;
	background-color: rgb(155, 22, 40);
	color: #ddd;
`;

const Image = styled.div`
    width: 85vw;
    height: 250px;
  background-color: black;
  position: relative;
  background-size: cover;
  background-position: center center;
`;

const Backdrop = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background-color: rgba(179,22,22,0.7);
`
const DeleteIcon = styled.img`
position:absolute;
right:25px;
bottom:25px;
width:25px;
`

class EditPoi extends Component {
    state={
        activeImages:[]
    }

	async componentWillMount() {
		this.initPoiValues()
	}


    initPoiValues= async ()=>{
        const { poiId } = this.props;
		this.poi = await getPoiById(poiId);
		this.props.initialize({
            name: this.poi.name,
			email: this.poi.email ? this.poi.email : '',
			contact: this.poi.contact ? this.poi.contact : '',
			phone: this.poi.phone ? this.poi.phone : '',
			url: this.poi.url ? this.poi.url : '',
			category: this.poi.category ? this.poi.category : '',
			coordinates: this.poi.coordinates ? this.poi.coordinates : '',
			tags: this.poi.tags ? this.poi.tags : [],
			email: this.poi.email ? this.poi.email : '',
			contact: this.poi.contact ? this.poi.contact : '',
			phone: this.poi.phone ? this.poi.phone : '',
			festivalId: this.poi.festivalId ? this.poi.festivalId : '',
			_rev: this.poi._rev
		});
    }

    deleteImageHandler=(image)=>{

        const updatedImages = this.poi.images.filter(imageId=>imageId!==image)
        this.poi.images=updatedImages
        this.setState({activeImages:updatedImages})
    }

	 submitForm = async values => {
        let updatedValues = {...values}
		if (values.images&&!this.poi.images==[]) {
            const updatedImages = values.images.concat(this.poi.images)
            updatedValues = { ...values, images: updatedImages }
        };
        if (!values.images&&!this.poi.images==[]) {
            const updatedImages = this.poi.images
            updatedValues = { ...values, images: updatedImages }
        }

        await updatePoiItem(this.props.poiId, updatedValues);
        this.props.onClose()
	};

	render() {
		const { handleSubmit } = this.props;
        
		let renderImages;
		console.log(this.poi);
		if (this.poi && !this.poi.images == '') {
			renderImages = this.poi.images.map(image => {
                const isDelete = this.state.activeImages.length==0?this.state.activeImages.indexOf(image)>-1:false
				return (
					<div key={image}>
						<Image  style={{backgroundImage: `url(https://ucarecdn.com/${image}/-/resize/600/)`}}>
                        {isDelete&&<Backdrop/>}
                        <DeleteIcon onClick={()=>this.deleteImageHandler(image)} src={`https://ucarecdn.com/0b417ab2-6f4b-48ca-a2da-a76257cf5f59/-/resize/32/`} />
                        </Image>
					</div>
				);
			});
		}

		return (
			<NotificationModal>
				<h1 style={{ padding: '10px' }}>POI Details</h1>
				<form onSubmit={handleSubmit(this.submitForm)}>
					<FormItem>
						<label htmlFor="images">Image</label>
						<Field name="images" component={Uploader} />
					</FormItem>

					<FormItem>
						<label htmlFor="name">Name</label>
						<InputField name="name" component="input" type="text" />
					</FormItem>
					<FormItem>
						<label htmlFor="tags">Tags</label>
						<Field
							name="tags"
							component={CreatableMultiSelectDropdown}
							type="tags"
						/>
					</FormItem>
					<FormItem>
						<label htmlFor="email">Email</label>
						<InputField
							name="email"
							component="input"
							type="email"
						/>
					</FormItem>
					<FormItem>
						<label htmlFor="contact">Contact Person</label>
						<InputField
							name="contact"
							component="input"
							type="text"
						/>
					</FormItem>
					<FormItem>
						<label htmlFor="phone">Phone</label>
						<InputField name="phone" component="input" type="tel" />
					</FormItem>
					<FormItem>
						<label htmlFor="url">Web</label>
						<InputField name="url" component="input" type="url" />
					</FormItem>
					<FormItem>
						<Submit type="submit">Submit</Submit>{' '}
						<Cancel onClick={this.props.onClose}>Cancel</Cancel>
					</FormItem>
				</form>
				{renderImages}
			</NotificationModal>
		);
	}
}

const mapStateToProps = ({ zerking, form }) => {
	return {
		groupedPoisById: zerking.groupedPoisById,
		initialValues: form.poiDetails
	};
};

export default reduxForm({
	form: 'poiDetails'
})(connect(mapStateToProps)(EditPoi));
