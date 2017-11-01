
// outsource dependencies

// local dependencies
import { storage } from '../services';
import { Axios } from '../services';

// configuration

/**
 * @description signin request wich store session data in storage
 * @param { Object } credetional - 
 * @returns { Promise }
 * @public
 */
export function signin ({email, password}) {
    // Submit credentional to API
    return new Promise( ( resolve, reject ) => {
        Axios
            .post('/signin', { password, email })
            .then(success => {
                
                if ( success.data.access_token ) {
                    // store tokens
                    storage.set('auth', success.data);
                    // set default auth heder
                    Axios.defaults.headers.common['Authorization'] = success.data.access_token;
                    resolve(success);
                } else {
                    reject({message: 'Invalid Email or Password.'});
                }
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
        Axios
            .get('/signout')
            .then(success => {
                // clear default auth heder
                delete Axios.defaults.headers.common['Authorization'];
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
export function restoreSession () {
    // Submit credentional to API
    return new Promise( ( resolve, reject ) => {
        // get authentification tokens
        var tokens = storage.get('auth');
        // clear default auth heder
        delete Axios.defaults.headers.common['Authorization'];
        
        Axios
            .get('/refreshSession', { params: { token: tokens.refresh_token } } )
            .then(success => {
                // store tokens
                storage.set('auth', success.data);
                // set default auth heder
                Axios.defaults.headers.common['Authorization'] = success.data.access_token;
                resolve(success);
            })
            .catch(reject);
    });
}
