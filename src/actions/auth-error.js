
// outsource dependencies

// local dependencies
import { AUTH_ERROR } from './types';

export function authError ( error ) {
    return {
        type: AUTH_ERROR,
        payload: error,
    }
}
