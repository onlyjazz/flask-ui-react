
// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr'

// local  dependencies
import auth from './authentification';

var rootReducer = combineReducers({
    state: (state = {}) => state,
    toastr,
    auth,
    form,
});

export default rootReducer;
