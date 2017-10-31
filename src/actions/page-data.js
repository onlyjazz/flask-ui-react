
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

/**
 * @param { Object } location - current location
 * @returns { Object }
 * @public
 */
export function pageChange ( location = {pathname: '/'} ) {
    return {
        type: DATA_PAGE_CHANGE,
        location,
    }
}

/**
 * @returns { Object }
 * @public
 */
export function pageLoadStart () {
    return {
        type: DATA_LOAD_START,
        expextAnswer: true,
    }
}

/**
 * @param { Object } data - results of request
 * @returns { Object }
 * @public
 */
export function pageLoadSuccess ( data ) {
    return {
        type: DATA_LOAD_SUCCESS,
        expextAnswer: false,
        data,
    }
}

/**
* @param { Object } error - results of request
* @param { String } message - prepered message from request if it present
* @returns { Object }
* @public
*/
export function pageLoadError ( error, message = 'Something went wrong...' ) {
    return {
        type: DATA_LOAD_ERROR,
        expextAnswer: false,
        message,
        error,
    }
}

/**
* @param { Object } [location] - location to redirect
* @returns { Object }
* @public
*/
export function blockPageLoadStart ( location = null ) {
    return {
        type: BLOCK_DATA_LOAD_START,
        blockLocation: location,
        expextAnswer: true,
    }
}

/**
 * @param { Object } data - results of request
 * @returns { Object }
 * @public
 */
export function blockPageLoadSuccess ( data ) {
    return {
        type: BLOCK_DATA_LOAD_SUCCESS,
        blockLocation: null,
        expextAnswer: false,
        data,
    }
}

/**
 * @param { Object } error - results of request
 * @param { String } message - prepered message from request if it present
 * @returns { Object }
 * @public
 */
export function blockPageLoadError ( error, message = 'Something went wrong...' ) {
    return {
        type: BLOCK_DATA_LOAD_ERROR,
        expextAnswer: false,
        blockLocation: null,
        message,
        error,
    }
}
