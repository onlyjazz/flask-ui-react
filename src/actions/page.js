
// local dependencies
import { PAGE_UPDATE_START, PAGE_UPDATE_ERROR, PAGE_UPDATE_SUCCESS } from './types';


export function pageUpdate ( payload ) {
    return {
        type: PAGE_UPDATE_START,
        payload,
    }
}

export function pageUpdateError ( error, errorMessage ) {
    return {
        type: PAGE_UPDATE_ERROR,
        errorMessage,
        error,
    }
}

export function pageUpdateSuccess ( field = 'payload', data ) {
    return {
        type: PAGE_UPDATE_SUCCESS,
        [field]: data
    }
}
