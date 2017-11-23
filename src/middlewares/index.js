
import { is, authenticateServices, storage } from '../services';
import { toastr } from 'react-redux-toastr';
import * as types from '../actions/types';
import { unauthUser, authUser } from '../actions';
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

/**
 * @description try to check authentication and restore it
 * @public
 */
export function authRun ( {dispatch} ) {
    return next => action => {
        if ( action.type === types.AUTH_RUN ) {
            if ( storage.get('auth') ) {
                // restore session from storage
                authenticateServices()
                    .then(success => {
                        dispatch( authUser(success.data) );
                    })
                    .catch(error => {
                        dispatch( unauthUser() );
                    });
            } else dispatch( unauthUser() );
        } else next(action);
    };
}
