
// local dependencies
import { Axios, storage } from '../services';
import { unauthUser, authUser } from '../actions';
import { AUTH_RUN } from '../actions/types';

/**
 * @description try to check authentication and restore it
 * @public
 */
export function authRun ( {dispatch} ) {
    return next => action => {
        if ( action.type === AUTH_RUN ) {
            if ( storage.get('auth') ) {     
                // set default auth heder
                Axios.defaults.headers.common['Authorization'] = storage.get('auth').jwtToken;
                // get user
                Axios.get('/users/self')
                    .then(success => {
                        dispatch( authUser(success.data) );
                    })
                    .catch(error => {
                        // get authentification tokens
                        var tokens = storage.get('auth');
                        // remove old tokens
                        storage.remove('auth');
                        // clear default auth heder
                        delete Axios.defaults.headers.common['Authorization'];
                        // try to refresh session
                        Axios
                            .get('/refreshSession', { params: { token: tokens.refresh_token } } )
                            .then(success => {
                                Axios.get('/users/self')
                                .then(success => {
                                    dispatch( authUser(success.data) );
                                })
                                .catch( error => {
                                    dispatch( unauthUser() );
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
