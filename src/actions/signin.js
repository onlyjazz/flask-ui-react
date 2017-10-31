
// outsource dependencies
import axios from 'axios';

// local dependencies
import { authError } from './auth-error';
import { AUTH_USER } from './types';

// configuration
// var apiPath = 'http://127.0.0.1:8000';
var apiPath = 'http://localhost:8000';

export function signin ({email, password}) {
    
    return function ( dispatch ) {              // redux-thunk add ability to return function from action
        // Submit credentional to API
        axios
            .post(`${apiPath}/signin`, {       // apiPath+'/signin'
                password,                      // password: password,
                email,                         // email: email,
            })
            .then(success => {
                // TODO on succes Update state, Save token, redirect to privat page
                // update state  
                dispatch({ type: AUTH_USER });
                // store token
                localStorage.setItem('auth', success.data.access_token);
                // navigate to private page actual for react router lower then 4.0.0 version
                // browserHistory.push('/feature');
            })
            // update state on error
            .catch(error => dispatch( authError(error) ) );
    }
}
