
// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// local  dependencies
import auth from './auth';
import pageData from './page-data';

var rootReducer = combineReducers({
    state: (state = {}) => state,
    pageData,
    auth,
    form,
});

export default rootReducer;
