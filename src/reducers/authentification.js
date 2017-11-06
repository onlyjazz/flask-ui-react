
// outsource dependencies

// local dependencies
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_RUN } from '../actions/types';

// configuration
export default function ( state = {}, action ) {
    
    var { type, ...option } = action;
    
    // console.log('AUTH reducer => ()'
    //     ,'\n type:', type
    //     ,'\n option:', option
    // );
    
    switch ( type ) {
        default: return state;
        //
        case AUTH_USER: return {
            ...state,
            user: option.payload,
            ready: true,
            error: null,
            errorMessage: null,
            authenticated: true,
        };
        // 
        case AUTH_ERROR: return {
            ...state,
            user: null,
            ready: true,
            authenticated: false,
            error: option.error,
            errorMessage: option.errorMessage,
        };
        // 
        case UNAUTH_USER: return {
            ...state,
            user: null,
            ready: true,
            error: null,
            errorMessage: null,
            authenticated: false,
        };
    }
    
}
