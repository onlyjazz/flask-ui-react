
// outsource dependencies
// import axios from 'axios';
// import { browserHistory } from 'react-router';

// local dependencies
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';
import { authenticateServices } from '../services';

export function unauthUser () {
    return {
        type: UNAUTH_USER,
    }
}

export function authUser ( user ) {
    return {
        type: AUTH_USER,
        payload: user,
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
        authenticateServices( false )
            .then(success=>dispatch( unauthUser() ) )
            .catch(error=>dispatch( unauthUser() ) );
    }
}
