
// outsource dependencies

// local dependencies
import { AUTH_USER, UNAUTH_USER/*, AUTH_ERROR*/ } from '../actions/types';

// configuration
export default function ( state = {}, action ) {
    
    var { type, ...option } = action;
    
    // console.log('reduser AUTHENTIFICATION'
    //     // ,'\n action:', action
    //     ,'\n state:', state
    //     ,'\n type:', type
    //     ,'\n option:', option
    // );
    
    switch ( type ) {
        default: return state;
        // 
        case AUTH_USER: return { ...state, ...option, authenticated: true };
        // 
        case UNAUTH_USER: return { ...state, ...option, authenticated: false};
        //     break;
    }
    
}
