import axios from '../helpers/cachedAxios.js';
import 'babel-polyfill';
import moment from 'moment';

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


export const filterPastEvents = function(data){
  const most = moment(new Date()).subtract(19, 'minutes');
		return data.filter(({ endDate = event.startDate }) => {
			return most < moment(endDate);
		});
}