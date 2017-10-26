
// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as reducerReduxForm } from 'redux-form';

var rootReducer = combineReducers({
    state: (state = {}) => state,
    form: reducerReduxForm,
});

export default rootReducer;
