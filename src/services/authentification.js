
// outsource dependencies
import axios from 'axios';

// local dependencies
import { storage } from '../services';

// configuration
import { config } from '../constants';

/**
 * @description axios instance with base configuration of app
 * @public
 */
var axiosInstance = axios.create({
    baseURL: config.apiPath,
});
export { axiosInstance };

/**
 * @description signin request wich store session data in storage
 * @param { Object } credetional - 
 * @returns { Promise }
 * @public
 */
export function signin ({email, password}) {
    // Submit credentional to API
    return new Promise( ( resolve, reject ) => {
        axiosInstance
            .post('/signin', { password, email })
            .then(success => {
                // store tokens
                storage.set('auth', success.data);
                // set default auth heder
                axiosInstance.defaults.headers.common['Authorization'] = success.data.access_token;
                resolve(success);
            })
            .catch(reject);
    });
}

/**
 * @description send to server request to close current session
 * @returns { Promise }
 * @public
 */
export function signout () {
    // Submit credentional to API
    return new Promise( ( resolve, reject ) => {
        // storage.remove('auth');
        // resolve({});
        axiosInstance
            .get('/signout')
            .then(success => {
                // clear default auth heder
                delete axiosInstance.defaults.headers.common['Authorization'];
                // clear authentification tokens
                storage.remove('auth');
                resolve(success);
            })
            .catch(reject);
    });
}

/**
 * @description try to restore authentificated session
 * @returns { Promise }
 * @public
 */
export function refreshSession () {
    // Submit credentional to API
    return new Promise( ( resolve, reject ) => {
        // get authentification tokens
        var tokens = storage.get('auth');
        // clear default auth heder
        delete axiosInstance.defaults.headers.common['Authorization'];
        
        axiosInstance
            .get('/refreshSession', { params: { token: tokens.refresh_token } } )
            .then(success => {
                // store tokens
                storage.set('auth', success.data);
                // set default auth heder
                axios.defaults.headers.common['Authorization'] = success.data.access_token;
                resolve(success);
            })
            .catch(reject);
    });
}
