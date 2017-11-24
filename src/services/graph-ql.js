
import { instanceGraphQl, is } from '../services';

/**
 * @example GraphQl('{ uuidNil }')
 * @param { String } query - wich will be sended to GraphQl 
 * @returns { Promise }
 * @public
 */
function GraphQl ( query, variables ) {
    return instanceGraphQl.post('graphql', JSON.stringify({query, variables: variables||null}) );
};

GraphQl.parseError = parseError;
GraphQl.encodeVariables = encodeVariables;
GraphQl.decodeVariables = decodeVariables;

export default GraphQl;

/**
 * @description try to parse GraphQl errors
 * @example GraphQl.parseError(error)
 * @param { Object } 
 * @returns { Object }
 * @public GraphQl.parseError
 */
export function parseError ( error ) {
    var res;
    try {
        if ( is.array( error.response.data.errors ) ) {
            res = { data: error.response.data.errors[0].message };
        } else {
            res = { data: error.message };
        }
    } catch ( e ) { res = { data: 'Unhandled error' }; }
    return res;
}

/**
 * @description encode part of object item to json format in properties "variable"
 * @example toVariables({id:1, some: 2}, ['some'])
 * @param { Object } data
 * @param { Array } names - list name of properties  
 * @returns { Object }
 * @function GraphQl.encodeVariables
 * @private
 */
export function encodeVariables ( data, names ) {
    var variable = {};
    for ( var key = 0; key < names.length; key ++ ) {
        if ( is.defined( data[names[key]] ) ) {
            variable[names[key]] = Object.assign(data[names[key]]);
            delete data[names[key]];
        }
    }
    try { variable = JSON.stringify(variable);
    } catch ( err ) { variable = '{}'; }
    return { ...data, variable };
}

/**
 * @description decode from properties "variable" of object item to js format 
 * @example toVariables({id:1, some: 2})
 * @param { Object } data
 * @returns { Object }
 * @function GraphQl.decodeVariables
 * @private
 */
export function decodeVariables ( data ) {
    var parsed;
    var { variable, ...serialized } = data;
    try { parsed = JSON.parse(variable);
    } catch ( err ) { parsed = {}; }
    return { ...serialized, ...parsed };
}
