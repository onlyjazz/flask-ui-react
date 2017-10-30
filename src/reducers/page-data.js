
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
    block: null,                // expect Object with current location or null
    payload: null,              // expect Promise wich expect the resolve
    data: null,                 // expect Object with resolved data
    location: {pathname:'/'},   // expect Object with current location
};
/**
 * @description
 * @example initilState( data )
 * @param { Object } data - chnge based property
 * @param { Object } state - previouse data
 * @returns { Object }
 * @function initilState
 * @private
 */
function initilState ( options, state ) {
    // it can be addition logic to check or determine some specific properties
    // based on previous state
    return { ...initil, ...options };
}

export default function ( state = initil, action ) {
    
    // console.log('reduser PAGE DATA'
    //     ,'\n action:', action
    //     ,'\n state:', state
    // );
    
    switch ( action.type ) {
        default: return state;
        // clear all data and add new location
        case DATA_PAGE_CHANGE: return { ...initil, url: action.location|| {pathname:'/'} };
        // 
        case DATA_LOAD_START: return initilState({
            payload: action.payload||action.promise,
            expextAnswer: true,
        }, state);
        // 
        case DATA_LOAD_SUCCESS: return initilState({
            data: action.data || action.success,
        }, state);
        // 
        case DATA_LOAD_ERROR: return initilState({
            error: action.error,
            errorMessage: action.errorMessage || action.message || 'Something wrong...',
        }, state);
        /*-------------------------------------------------
                BLOCKING of url currently not implemented
        ---------------------------------------------------*/
        // 
        case BLOCK_DATA_LOAD_START: return initilState({
            payload: action.payload || action.promise,
            block: action.block || state.location,
            expextAnswer: true,
        }, state);
        // 
        case BLOCK_DATA_LOAD_SUCCESS: return initilState({
            data: action.data || action.success,
        }, state);
        // 
        case BLOCK_DATA_LOAD_ERROR: return initilState({
            error: action.error,
            errorMessage: action.errorMessage || action.message || 'Something wrong...',
        }, state);

    }
}
