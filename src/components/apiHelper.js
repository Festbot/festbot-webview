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
      url: 'https://api.festbot.com/users/_design/default/_update/save-show/'+userId
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
    url: 'https://api.festbot.com/users/_design/default/_update/remove-show/'+userId
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
    url: 'https://api.festbot.com/users/_design/default/_update/set-active-festival/'+userId
};

  return axios(options);
}

export function getUserId(userId){
  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
        userId: userId
    }),
    url: 'https://api.festbot.com/users/'+userId
};

  return axios(options);
}

