
// outsource dependencies

// local dependencies
import {
    AUTH_USER,
    AUTH_ERROR,
    AUTH_START,
    UNAUTH_USER,
} from '../actions/types';

/**
 * @public
 */
export function authStart () {
    return {
        type: AUTH_START,
    }
}

/**
 * @param { Object } user
 * @public
 */
export function authUser ( user ) {
    return {
        type: AUTH_USER,
        user,
    }
}


/**
 * @public
 */
export function unauthUser () {
    return {
        type: UNAUTH_USER,
    }
}

/**
* @param { Object } error
* @param { String } errorMessage
 * @public
 */
export function authError ( error, errorMessage ) {
    return {
        type: AUTH_ERROR,
        errorMessage,
        error,
    }
}
