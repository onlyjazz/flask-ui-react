
import { is } from '../services';
import { toastr } from 'react-redux-toastr';
// import { config } from '../constants';

export { authRun } from './auth-run';
export { pageResolve } from './page-resolve';

/**
 * @description determine promisses on properties "payload" and resolve it
 * @public
 */
export function payloads ( {dispatch} ) {
    return next => action => {
        var { payload, error } = action;
        if ( !error && is.promise(payload) ) {
            payload
                .then( success => {
                    action.payload = success;
                    action.error = null;
                    dispatch(action);
                })
                .catch( error => {
                    action.payload = null;
                    action.error = error;
                    dispatch(action);
                });
        } else next(action);
    };
}


/**
 * @description determine promisses on properties "payload" and resolve it
 * @public
 */
export function errors ( {dispatch} ) {
    return next => action => {
        var { error, errorMessage } = action;
        if ( error ) {
            !errorMessage && (action.errorMessage = error.status +' '+ error.statusText);
            toastr.error('Error !', action.errorMessage);
            dispatch(action);
        } else next(action);
    };
}
