
// outsource dependencies
// import axios from 'axios';
// import { browserHistory } from 'react-router';

// local dependencies
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
import { storage } from '../services';
import { Axios } from '../services';

export function unauthUser () {
    return {
        type: UNAUTH_USER,
    }
}

export function authUser ( user ) {
    return {
        type: AUTH_USER,
        payload: user || Axios.get('private/self'),
    }
}

export function authError ( error, errorMessage ) {
    return {
        type: AUTH_ERROR,
        errorMessage,
        error,
    }
}

export function signout () {
    return function ( dispatch ) {
        Axios
            .get('/signout')
            .then(success=>clearSession(dispatch) )
            .catch(error=>clearSession(dispatch) );
    }
}

function clearSession ( dispatch ) {
    // clear default auth heder
    delete Axios.defaults.headers.common['Authorization'];
    // clear authentification tokens
    storage.remove('auth');
    // 
    dispatch( unauthUser() );
}

