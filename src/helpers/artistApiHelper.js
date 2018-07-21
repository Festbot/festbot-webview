import axios from 'axios';
import 'babel-polyfill';

const ROOT_URL='api.festbot.com'

export const getArtistsByGenre = async function(keyword=''){

  const {
    data: { docs: filteredResults }
  } = await axios.post(`https://${ROOT_URL}/artists/_find`, {
    selector: {  genres: { $elemMatch: { $regex: '(?i)' + keyword }  }},
    limit: 50,
    sort: [{ featured: 'desc' }, { popularity: 'desc' }]
  });

  return filteredResults

}

export const getArtistsByNameGenre = async function(keyword='',limit=100){

  const {
    data: { docs: filteredResults }
  } = await axios.post(`https://${ROOT_URL}/artists/_find`, {
    selector: { $or: [{ name: { $regex: '(?i)' + keyword } }, { genres: { $elemMatch: { $regex: '(?i)' + keyword } } }] },
    limit: limit,
    sort: [{ featured: 'desc' }, { popularity: 'desc' }]
  });

  return filteredResults

}
