
import { is } from '../services';
// import { config } from '../constants';

export { authRun } from './authRun';

/**
 * @description determine promisses on properties "payload" and resolve it
 * @public
 */
export function payloads ( {dispatch} ) {
    return next => action => {
        var { payload, error } = action;
        var data = action[action.payloadName || 'data'];
        if ( !error && !data && is.promise(payload) ) {
            payload
                .then( success => {
                    action[action.payloadName || 'data'] = success;
                    dispatch(action);
                })
                .catch( error => {
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
        if ( error && !errorMessage ) {
            action.errorMessage = error.status +' '+ error.statusText;
            dispatch(action);
        } else next(action);
    };
}
