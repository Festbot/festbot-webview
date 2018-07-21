import axios from 'axios';
import 'babel-polyfill';

const ROOT_URL='api.festbot.com'

export const getEventsByArtist = async function(artist=''){

  const { data: {docs:eventData} } = await axios.post(`https://${ROOT_URL}/events/_find`, { selector: { artist: artist } });

  return eventData

}

