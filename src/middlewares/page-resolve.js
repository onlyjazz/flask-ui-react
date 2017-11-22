
// local dependencies
import { is } from '../services';
import { pageUpdateError, pageUpdateSuccess } from '../actions';
import { PAGE_UPDATE_START } from '../actions/types';

/**
 * @description try to emulate resolves for pages
 * @public
 */
export function pageResolve ( {dispatch} ) {
    return next => action => {
        if ( action.type === PAGE_UPDATE_START ) {
            var promise = new Promise(resolve=>resolve(action.data));
            
            if ( is.promise(action.data) ) {
                promise = action.data;
            } else if ( is.array(action.data)&&is.promise(action.data[0]) ) {
                promise = Promise.all(action.data);
            }
            
            promise
                .then( success => dispatch( pageUpdateSuccess(success) ) )
                .catch( error => dispatch( pageUpdateError(error) ) )
        }
        next(action);
    };
}
