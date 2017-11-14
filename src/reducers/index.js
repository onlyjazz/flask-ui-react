
// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr'

// local  dependencies
import auth from './authentification';
import page from './page';
import nav from './nav';

var rootReducer = combineReducers({
    state: (state = {}) => state,
    toastr,
    page,
    auth,
    form,
    nav,
});

export default rootReducer;
