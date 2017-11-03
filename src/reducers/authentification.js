
// outsource dependencies

// local dependencies
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_RUN } from '../actions/types';

// configuration
export default function ( state = {}, action ) {
    
    var { type, ...option } = action;
    
    switch ( type ) {
        default: return state;
        //
        case AUTH_RUN: return { ...state, ...option, ready: true };
        //
        case AUTH_USER: return { ...state, ...option, ready: true, authenticated: true };
        // 
        case AUTH_ERROR: return { ...state, ...option, user: null, ready: true, authenticated: false };
        // 
        case UNAUTH_USER: return { ...state, ...option, user: null, ready: true, authenticated: false};
    }
    
}
