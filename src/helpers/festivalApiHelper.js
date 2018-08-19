import axios from '../helpers/cachedAxios.js';
import axiosNoCache from 'axios'
import 'babel-polyfill';

const ROOT_URL = 'api.festbot.com';

export const getFestivalByName = async function(keyword = '') {
	const {
		data: { docs: festivalData }
	} = await axiosNoCache.post(`https://${ROOT_URL}/festivals/_find`, { selector: { name: { $regex: '(?i)' + keyword } } });

	return festivalData;
};


export const getFestivalDataById = async function (festivalId){
	const { data: festival } = await axios.get(`https://api.festbot.com/festivals/${festivalId}`);
	return festival
}



export const getStagesByFestivalId = async function(keyword = '') {
	const {
		data: { docs: festivalData }
	} = await axiosNoCache.post(`https://${ROOT_URL}/venues/_find`, { selector: { festivalId: { $regex: '(?i)' + keyword } }, limit: 250 });

	return festivalData;
};

export const getPoisByFestivalId = async function(keyword = '') {
	const {
		data: { docs: festivalData }
	} = await axiosNoCache.post(`https://${ROOT_URL}/pois/_find`, { selector: { festivalId: { $regex: '(?i)' + keyword } }, limit: 250 });

	return festivalData;
};

export const getPoiById = async function(keyword = '') {
	const 
		{data: result }
	 = await axiosNoCache.get(`https://${ROOT_URL}/pois/${keyword}`);
	return result;
};

export const addItemToVenues = async function(item) {
	await axiosNoCache.post(`https://${ROOT_URL}/venues/`, item);
	return;
};

export const addItemToPois = async function(item) {
	await axiosNoCache.post(`https://${ROOT_URL}/pois/`, item);
	return;
};

export const updatePoiItem = async function(id,item) {
	await axiosNoCache.put(`https://${ROOT_URL}/pois/${id}`, item);
	return;
};

export const deleteItemFromPois = async function(item) {
	await axiosNoCache.delete(`https://${ROOT_URL}/pois/${item}`);
	return;
};
