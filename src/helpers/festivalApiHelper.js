import axios from 'axios';
import 'babel-polyfill';

const ROOT_URL='api.festbot.com'

export const getFestivalByName = async function(keyword=''){

  const { data: {docs:festivalData} } = await axios.post(`https://${ROOT_URL}/festivals/_find`, { selector: { name: { $regex: '(?i)' + keyword } } });

  return festivalData

}

