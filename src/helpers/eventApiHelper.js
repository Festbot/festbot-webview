import axios from '../helpers/cachedAxios.js';
import 'babel-polyfill';

const ROOT_URL='api.festbot.com'

export const getEventsByArtist = async function(artist=''){

  const { data: {docs:eventData} } = await axios.post(`https://${ROOT_URL}/events/_find`, { selector: { artist: artist } });

  return eventData

}


export const getEventsByFestivalId = async function(festivalId=''){

  const { data: {docs:eventData} } = await axios.post(`https://${ROOT_URL}/events/_find`, { selector: { festivalId: festivalId },
  limit: 2000,sort:[{'startDate':'asc'}] });

  return eventData

}
