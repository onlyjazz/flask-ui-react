
// outsource dependencies

// local dependencies
import {
    blockPageLoadStart,
    blockPageLoadError,
    blockPageLoadSuccess,
} from '../actions/page-data';
// import axiosInstance from '../services';

// configuration

export function forgotPassword ( data ) {
    // redux-thunk add ability to return function from action    
    return function ( dispatch ) {
        dispatch( blockPageLoadStart() );
        // TODO: expect API endpoint
        // axiosInstance
        //     .post('/forgotPassword', data)
        //     // update state on success
        //     .then(success => {
        //         dispatch( blockPageLoadSuccess(success) );
        //     })
        //     // update state on error
        //     .catch(error => {
        //         dispatch( blockPageLoadError(error, error.response.status+' '+error.response.statusText) );
        //     });
    }
}
