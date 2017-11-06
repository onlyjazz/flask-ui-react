
// local dependencies
import { Axios, storage } from '../services';
import { unauthUser, authUser, authError } from '../actions';
import { AUTH_RUN } from '../actions/types';

/**
 * @description try to check authentication and restore it
 * @public
 */
export function authRun ( {dispatch} ) {
    return next => action => {
        if ( action.type === AUTH_RUN ) {
            if ( storage.get('auth') ) {
                // console.log('authRun => ()'
                //     ,'\n type:', action.type
                //     ,'\n option:', action
                // );        
                // set default auth heder
                Axios.defaults.headers.common['Authorization'] = storage.get('auth').access_token;
                // get user
                Axios.get('/private/self')
                .then(success => {
                    dispatch( authUser(success.data) );
                })
                .catch(error => {
                    // get authentification tokens
                    var tokens = storage.get('auth');
                    // clear default auth heder
                    delete Axios.defaults.headers.common['Authorization'];
                    // try to refresh session
                    Axios
                        .get('/refreshSession', { params: { token: tokens.refresh_token } } )
                        .then(success => {
                            Axios.get('/private/self')
                            .then(success => {
                                dispatch( authUser(success.data) );
                            })
                            .catch( error => {
                                dispatch( authError(error) );
                            })
                        })
                        .catch(error => {
                            next(action);
                        });
                });
            } else dispatch( unauthUser() );
        } else next(action);
    };
}