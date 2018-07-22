import axios from 'axios';
import 'babel-polyfill';

const ROOT_URL='api.festbot.com'

export const getFestivalByName = async function(keyword=''){

  const { data: {docs:festivalData} } = await axios.post(`https://${ROOT_URL}/festivals/_find`, { selector: { name: { $regex: '(?i)' + keyword } } });

  return festivalData

}

export const getStagesByFestivalId = async function(keyword=''){

  const { data: {docs:festivalData} } = await axios.post(`https://${ROOT_URL}/venues/_find`, { selector: { festivalId: { $regex: '(?i)' + keyword } } });

  return festivalData

}

export const getPoisByFestivalId = async function(keyword=''){

  const { data: {docs:festivalData} } = await axios.post(`https://${ROOT_URL}/pois/_find`, { selector: { festivalId: { $regex: '(?i)' + keyword } } });

  return festivalData

}

export const addItemToVenues = async function(item){

  await axios.post(`https://${ROOT_URL}/venues/`, item);
  return 
}

export const addItemToPois = async function(item){
  await axios.post(`https://${ROOT_URL}/pois/`, item);
  return 
}

export const deleteItemFromPois = async function(item){
  console.log("[ACTION}",item)
  await axios.delete(`https://${ROOT_URL}/pois/${item}`);
  return 
}