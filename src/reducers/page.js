
// outsource dependencies

// local dependencies
import { PAGE_UPDATE_START, PAGE_UPDATE_ERROR, PAGE_UPDATE_SUCCESS } from '../actions/types';


var initialState = {
    expectAnswer: true,
    errorMessage: '',
    resolve: {},
    error: null,
};
// configuration
export default function ( state = initialState, action ) {
    
    var { type, ...option } = action;
    
    // console.log('PAGE reducer => ()'
    //     ,'\n type:', type
    //     ,'\n option:', option
    //     ,'\n initialState:', initialState
    // );
    
    switch ( type ) {
        default: return state;
        //
        case PAGE_UPDATE_START: return initialState;
        
        case PAGE_UPDATE_ERROR: return { ...state, ...option, expectAnswer: false };
        
        case PAGE_UPDATE_SUCCESS: return { ...state, ...option, expectAnswer: false };
    }
}
