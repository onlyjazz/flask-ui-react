
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
});

export default axiosInstance;
