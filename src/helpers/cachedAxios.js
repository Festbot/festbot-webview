import axios from 'axios'

const axiosInstance = axios.create()
export default axiosInstance
// const cachios = require('cachios');

// const axiosInstance = axios.create({
//   stdTTL: 1*24*60 * 60,
// });

// const cachiosInstance = cachios.create(axiosInstance);
 
// export default cachiosInstance









// all requests will now use this axios instance

// import { setupCache } from 'axios-cache-adapter'
 
// const cache = setupCache({
//   maxAge: 1*24*60 * 60 * 1000,
//   debug:true
// })
 
// const api = axios.create({
//   adapter: cache.adapter
// })
//  export default api