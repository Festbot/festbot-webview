import React from 'react'
import axios from 'axios';
import qs from 'query-string';




  export function saveFavouriteEvent(userId,event){
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
          showId: event
      }),
      url: 'http://159.65.198.31:5984/users/_design/default/_update/save-show/'+userId
  };
  
    return  axios(options);
}

export function removeFavouriteEvent(userId,event) {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      showId: event
    }),
    url: 'http://159.65.198.31:5984/users/_design/default/_update/remove-show/'+userId
};

  return  axios(options);
}

export function saveActiveFestbot(userId,festival){
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        festivalId: festival
    }),
    url: 'http://159.65.198.31:5984/users/_design/default/_update/set-active-festival/'+userId
};

  return axios(options);
}


