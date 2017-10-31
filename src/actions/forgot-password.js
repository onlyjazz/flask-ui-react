// outsource dependencies
import axios from 'axios';

// local dependencies
import {
    blockPageLoadStart,
    blockPageLoadError,
    blockPageLoadSuccess,
} from '../actions/page-data';

// configuration
import { config } from '../constants';

export function forgotPassword ( data ) {
    // redux-thunk add ability to return function from action    
    return function ( dispatch ) {
        dispatch( blockPageLoadStart() );
        // TODO: expect API endpoint
        axios
            .post(`${config.apiPath}/forgotPassword`, data)
            // update state on success
            .then(success => {
                dispatch( blockPageLoadSuccess(success) );
            })
            // update state on error
            .catch(error => {
                dispatch( blockPageLoadError(error, error.response.status+' '+error.response.statusText) );
            });
    }
}
