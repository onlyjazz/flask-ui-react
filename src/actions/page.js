
// local dependencies
import { PAGE_UPDATE_START, PAGE_UPDATE_ERROR, PAGE_UPDATE_SUCCESS } from './types';


export function pageUpdate ( data ) {
    return {
        type: PAGE_UPDATE_START,
        data,
    }
}

export function pageUpdateError ( error, errorMessage ) {
    if ( !errorMessage ) {
        errorMessage = error.message||error.data;
    }
    return {
        type: PAGE_UPDATE_ERROR,
        resolve: {},
        errorMessage,
        error,
    }
}

export function pageUpdateSuccess ( data, field = 'resolve' ) {
    return {
        type: PAGE_UPDATE_SUCCESS,
        [field]: data
    }
}
