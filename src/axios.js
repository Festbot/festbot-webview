import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://159.65.198.31:5984' 
}); 

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';



export default instance;