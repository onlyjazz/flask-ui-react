
// outsource dependencies

// local dependencies
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

// configuration

export default function ( state = {}, action ) {
    
    switch ( action.type ) {
        default: return state;
        // 
        case AUTH_USER: return { ...state, authenticated: true };
        // 
        case UNAUTH_USER: return { ...state, authenticated: false };
        // 
        case AUTH_ERROR: return { ...state, error: action.payload };
        //     break;
    }
    
}
