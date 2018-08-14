import axios from '../helpers/cachedAxios.js';
import 'babel-polyfill';
import moment from 'moment';
import * as Ramda from 'ramda';

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


export const eventDays = function(data) {
  const Programs = data;
  let grouppedFestivalPrograms = groupByDays(Programs);
  let eventDays = Object.keys(grouppedFestivalPrograms).sort();
  return eventDays

  //this.props.eventDays(eventDays);
};

export const eventLocations = function(data) {
  const Programs = data;
  let grouppedFestivalPrograms = groupByStages(Programs);
  let eventStages = Object.keys(grouppedFestivalPrograms).sort();
  return eventStages

  //this.props.eventStages(eventStages);
};




	function groupByDays(events){
		const days = Ramda.groupBy(events => {
			return moment(events.startDate).format('L');
		});
		return days(events);
	};

	function groupByStages(events){
		const stages = Ramda.groupBy(events => {
			return events.stage;
		});
		return stages(events);
	};