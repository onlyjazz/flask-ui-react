
// outsource dependencies

// local dependencies
import { TEST } from './types';

export function test () {
    
    console.log('action TEST:'
        ,'\n arguments:', arguments
        ,'\n arguments[0]:', arguments[0]
        ,'\n arguments[1]:', arguments[1] 
        ,'\n arguments[2]:', arguments[2] 
        ,'\n arguments[3]:', arguments[3] 
    );
    
    return {
        type: TEST,
        payload: arguments,
    }
}
