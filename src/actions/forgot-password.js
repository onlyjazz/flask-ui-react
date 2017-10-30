// outsource dependencies
import axios from 'axios';

// local dependencies
import {
    DATA_LOAD_START,
    DATA_LOAD_SUCCESS,
    DATA_LOAD_ERROR,
} from '../actions/types';

// configuration
import { config } from '../constants';

export function forgotPassword ( data ) {
    // redux-thunk add ability to return function from action    
    return function ( dispatch ) {
        dispatch( { type: DATA_LOAD_START } )
        // TODO: expect API endpoint
        axios
            .post(`${config.apiPath}/forgotPassword`, data)
            // update state on success
            .then(success => {
                dispatch( { type: DATA_LOAD_SUCCESS, data: success } );
            })
            // update state on error
            .catch(error => {
                console.log('forgotPassword error');
                dispatch( { type: DATA_LOAD_ERROR, error: error, errorMessage: error.response.status+' '+error.response.statusText } );
            });
    }
}
