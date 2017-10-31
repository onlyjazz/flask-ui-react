
// outsource dependencies


// local dependencies
import { blockPageLoadStart, blockPageLoadError, blockPageLoadSuccess } from '../actions';
import { signin as signinRequest } from '../services';

// configuration

/**
 * @description async action sign in
 * @param { Object } 
 * @public
 */
export function signin ({email, password}) {
    return function ( dispatch ) {
        dispatch( blockPageLoadStart() );
        // Submit credentional to API
        signinRequest({email, password})
            // update state on success
            .then(success => {
                // update state auth
                // dispatch({ type: AUTH_USER });
                // update state data_page
                dispatch( blockPageLoadSuccess(success) );
            })
            // update state on error
            .catch(error => {
                dispatch( blockPageLoadError(error, error.response.status+' '+error.response.statusText) );
            });
    }
}
