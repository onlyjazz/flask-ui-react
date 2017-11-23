
// outsource aliases
import 's-is';
import axios from 'axios';

// local dependencies
import storage from './storage';
import { config } from '../constants';

/**
 * @description axios instance with base configuration of app
 * @public
 */
var instanceAPI = axios.create({
    baseURL: config.apiPath,
    withCredentials: true,
    headers: {
       'Content-Type': 'application/json',
   },
});

/**
 * @description axios instance with base configuration of graphql
 * @public
 */
var instanceGraphQl = axios.create({
    baseURL: config.graphQlPath,
    // withCredentials: true,
    timeout: 1000,
    headers: {
       'Content-Type': 'application/json',
   },
});

/**
 * @description to restore session
 * @example
    authenticateServices() // try restore session from storage
    authenticateServices( {sesion} ) // try set session
    authenticateServices( false||null ) // clear session
 * @param { Any } session
 * @returns { Promise }
 * @public
 */
export function authenticateServices ( session ) {
    if ( is.undefined(session) ) {
        session = storage.get('auth');
    }
    return new Promise(function ( resolve, reject ) {
        if ( session ) {
            instanceGraphQl.defaults.headers['Token'] = session.jwtToken;
            instanceAPI.defaults.headers['Authorization'] = session.jwtToken;
            
            Promise.all([
                instanceAPI.get('/users/self'),
                instanceGraphQl.post('graphql', JSON.stringify({query: '{ uuidNil }'}) )
            ])
            .then(success => {
                storage.set('auth', session);
                resolve( success[0] );
            })
            .catch(error => {
                // console.log('authenticateServices ERROR:', error);
                delete instanceAPI.defaults.headers['Authorization'];
                delete instanceGraphQl.defaults.headers['Token'];
                storage.remove('auth');
                reject(error);
            })
        } else {
            delete instanceAPI.defaults.headers['Authorization'];
            delete instanceGraphQl.defaults.headers['Token'];
            storage.remove('auth');
            reject({});
        }
    });
}

var is = window.is;

// aliases for export all services
export { is };
export { storage };
export { instanceGraphQl };
export { instanceAPI as API };
export { default as GraphQl } from './graph-ql';
export { default as MeasureService } from './measure-service';
export { default as StudyService } from './study-service';

