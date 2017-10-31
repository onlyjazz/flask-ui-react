
// outsource dependencies

// local dependencies
import {
    DATA_PAGE_CHANGE,
    DATA_LOAD_START,
    DATA_LOAD_SUCCESS,
    DATA_LOAD_ERROR,
    BLOCK_DATA_LOAD_START,
    BLOCK_DATA_LOAD_SUCCESS,
    BLOCK_DATA_LOAD_ERROR,
} from '../actions/types';

// configuration
var initil = {
    expextAnswer: false,        // expect Boolean to show hide preloaders to show on the page 
    data: null,                 // expect Object with resolved data
    location: {pathname: '/'},  // expect Object with current location
    blockLocation: null,        // expect Object with current location or null
};

export default function ( state = initil, action ) {
    
    // console.log('reduser PAGE DATA'
    //     ,'\n action:', action
    //     ,'\n state:', state
    // );
    
    var { type, ...option } = action;
    
    switch ( type ) {
        default: return state;
        // clear all data and add new location
        case DATA_PAGE_CHANGE: return { ...initil, ...option };
        // 
        case DATA_LOAD_START: return { ...initil, ...option };
        // 
        case DATA_LOAD_SUCCESS: return { ...initil, ...option };
        // 
        case DATA_LOAD_ERROR: return { ...initil, ...option };
        // 
        case BLOCK_DATA_LOAD_START:
            // if for block loading is not difen url
            // take it from current defined
            !option.blockLocation&&(option.blockLocation = state.location);
            return { ...initil, ...option };
        // 
        case BLOCK_DATA_LOAD_SUCCESS: return { ...initil, ...option };
        // 
        case BLOCK_DATA_LOAD_ERROR: return { ...initil, ...option };
    }
}
