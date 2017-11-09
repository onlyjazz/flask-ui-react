
// outsource dependencies

// local dependencies
import { NAV_MINIFY, NAV_MAXIMIZE } from '../actions/types';

var initialState = {
    minify: false,
    tabIndex: 0,
};
// configuration
export default function ( state = initialState, action ) {
    
    var { type, ...option } = action;
    
    // console.log('NAV reducer => ()'
    //     ,'\n type:', type
    //     ,'\n option:', option
    //     ,'\n initialState:', initialState
    // );
    
    switch ( type ) {
        default: return state;
        //
        case NAV_MINIFY: return { ...state, ...option, minify: true };
        //
        case NAV_MAXIMIZE: return { ...state, ...option, minify: false };
    }
}
