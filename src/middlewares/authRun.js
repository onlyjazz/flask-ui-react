
// local dependencies
import { Axios, refreshSession, storage } from '../services';
import { AUTH_RUN, AUTH_ERROR, AUTH_USER } from '../actions/types';

/**
 * @description try to check authentication and restore it
 * @public
 */
export function authRun ( {dispatch} ) {
    return next => action => {
        if ( action.type === AUTH_RUN && storage.get('auth') ) {
            // set default auth heder
            Axios.defaults.headers.common['Authorization'] = storage.get('auth').access_token;
            // get user
            Axios.get('/private/self')
                .then(success => {
                    dispatch({type: AUTH_USER, user: success.data })
                })
                .catch(error => {
                    refreshSession()
                        .then(success => {
                            Axios.get('/private/self')
                                .then(success => {
                                    dispatch({type: AUTH_USER, user: success.data })
                                })
                                .catch( error => {
                                    dispatch({type: AUTH_ERROR, error: error })
                                })
                        })
                        .catch(error => {
                            next(action);
                        });
                });
        } else next(action);
    };
}