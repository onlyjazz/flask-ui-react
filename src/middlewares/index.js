
import { config } from '../constants';
import { is } from '../services';

window._actionType = 'AUTH';
/**
 * @description logger for each action
 * @public
 */
export function debugLog ( {dispatch} ) {
    return next => action => {
        if ( config.DEBUG&&(!window._actionType||(new RegExp(window._actionType, 'gi')).test(action.type) ) ) {
            var { type, data, payload, error, ...rest } = action;
            console.log(
                'Log DEBUG middlewares:'
                ,'\n\t action:', action
                ,'\n\t rest:', rest
                ,'\n\t payload:', payload
                ,'\n\t error:', error
                ,'\n\t type:', type
            );
        }
        next(action);
    };
}

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
            
            // action.errorMessage = error.status + eroo
            action.errorMessage = true;
            dispatch(action);
        } else next(action);
    };
}

