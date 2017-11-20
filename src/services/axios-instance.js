
// outsource dependencies
import axios from 'axios';

// local dependencies

// configuration
import { config } from '../constants';

/**
 * @description axios instance with base configuration of app
 * @public
 */
var axiosInstance = axios.create({
    baseURL: config.apiPath,
    withCredentials: true,
    headers: {
       'Content-Type': 'application/json',
   },
});

export default axiosInstance;
