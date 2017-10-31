// outsource dependencies
// import axios from 'axios';

// local dependencies
import { TEST_ASYNC } from './types';

// configuration
// import { config } from '../constants';

export function testAsync ( data ) {
    // redux-thunk add ability to return function from action    
    return function ( dispatch ) {
        dispatch( { type:TEST_ASYNC, process: true } )
        // TODO for test async actions with THUNK
        // axios
        //     .get(`${apiPath}/`, data)
        //     // update state on success
        //     .then(success => {
        //         dispatch({ type: TEST, addition: 'SUCCESS' });
        //     })
        //     // update state on error
        //     .catch(error => {
        //         dispatch({ type: TEST, addition: 'ERROR'  });
        //     });
        setTimeout(() => dispatch({ type:TEST_ASYNC, payload: 'SUCCESS', process: false }), 5*1000);
    }
}
