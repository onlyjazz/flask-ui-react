
// outsource dependencies

// local dependencies
import { NAV_MINIFY, NAV_MAXIMIZE, NAV_CHANGE_MENU } from '../actions/types';
import { mainMenu } from '../constants';
import { is } from '../services';

var initialState = {
    minify: false,
    menu: mainMenu,
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
        //
        case NAV_CHANGE_MENU: if ( is.array(option.menu) ) {
            return { ...state, ...option };
        } else return { ...state, ...option, ...initialState };
    }
}
