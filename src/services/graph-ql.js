

import axios from 'axios';
import { is, storage } from '../services';

var Axios = axios.create({
    baseURL: 'http://flask.clearclinica.dev.dfusiontech.com:5004',
    // withCredentials: true,
    timeout: 1000,
    headers: {
       'Content-Type': 'application/json',
   },
});

var GraphQl = {
    getStudies: getStudies,
    getMeasure: getMeasure,
    tokenization: tokenization,
    deleteMeasures: deleteMeasures,
    getMeasuresPage: getMeasuresPage,
    encodeVariables: encodeVariables,
    decodeVariables: decodeVariables,
};

export default GraphQl;

function parseError ( error ) {
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

function tokenization () {
    if ( !Axios.defaults.headers['Token'] ) {
         Axios.defaults.headers['Token'] = storage.get('auth').jwtToken;
    }
}

/**
 * @description encode part of object item to json format in properties "variable"
 * @example toVariables({id:1, some: 2}, ['some'])
 * @param { Object } data
 * @param { Array } names - list name of properties  
 * @returns { Object }
 * @function encodeVariables
 * @private
 */
function encodeVariables ( data, names ) {
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
 * @function decodeVariables
 * @private
 */
function decodeVariables ( data ) {
    var parsed;
    var { variable, ...rest } = data;
    try { parsed = JSON.parse(variable);
    } catch ( err ) { parsed = {}; }
    return { ...rest, ...parsed };
}


export function getMeasuresPage ( customerId, studyId ) {
    tokenization();
    // NOTE: native promise can catch the exceptions
    return new Promise(function ( resolve, reject ) {
        var query = `{ allStudyMeasures(orderBy:ID_DESC, condition:{${(studyId?'studyId:'+studyId+',':'')} customerId: ${customerId} } ){
            totalCount,
            pageInfo { endCursor, hasNextPage, startCursor, hasPreviousPage },
            nodes {
                id name studyId variable distinctv
                briefTitle aggregatef
                dataFilter officialTitle
            }
        }}`;
        // console.log('GRAPHQL getMeasuresPage => ( customerId, studyId )'
        //     ,'\n customerId:', customerId
        //     ,'\n studyId:', studyId
        //     ,'\n query:', query
        //     ,'\n JSON query:', JSON.stringify({query})
        // );
        Axios.post('graphql', JSON.stringify({query}) )
            .then(success => {
                var list = success.data.data.allStudyMeasures.nodes;
                // var page = success.data.data.allStudyMeasures.pageInfo;
                var res = [];
                for (var key = 0; key < list.length; key++ ) {
                    res.push( decodeVariables(list[key]) );
                }
                resolve(res);
            })
            .catch(error =>  reject(parseError(error)) );
    });
}


export function getStudies ( customerId ) {
    tokenization();
    // NOTE: native promise can catch the exceptions
    return new Promise(function ( resolve, reject ) {
        var query = `{ allStudies(orderBy: ID_ASC, condition: { customerId: ${customerId} }){ nodes {
            id briefTitle officialTitle
        }}}`;
        // console.log('GRAPHQL getStudies => ( customerId )'
        //     ,'\n customerId:', customerId
        //     ,'\n query:', query
        //     ,'\n JSON query:', JSON.stringify({query})
        // );
        Axios.post('graphql', JSON.stringify({query}) )
            .then(success => {
                var list = success.data.data.allStudies.nodes;
                var res = [];
                for (var key = 0; key < list.length; key++ ) {
                    res.push( decodeVariables(list[key]) );
                }
                resolve(res);
            })
            .catch(error =>  reject(parseError(error)) );
    });
}

export function deleteMeasures ( list ) {
    tokenization();
    // NOTE: native promise can catch the exceptions
    return new Promise(function ( resolve, reject ) {
        for ( var key = 0, listQuery = '', id; key < list.length; key ++ ) {
            if ( list[key]&&list[key].id ) {
                id = list[key].id;
                listQuery += `measure_${id}: fDeleteMeasure(input: {id: ${id}}){ integer },`;
            }
        }
        var query = `mutation { ${listQuery.slice(0, -1)} }`;
        // console.log('GRAPHQL deleteMeasures => ( list )'
        //     ,'\n list:', list
        //     ,'\n query:', query
        //     ,'\n JSON query:', JSON.stringify({query})
        // );
        Axios.post('graphql', JSON.stringify({query}) )
            .then(resolve)
            .catch(error =>  reject(parseError(error)) );
    });
}

export function getMeasure ( id ) {
    tokenization();
    // NOTE: native promise can catch the exceptions
    return new Promise(function ( resolve, reject ) {
        var query = `{ allMeasures( condition: { id: ${id} }, first: 1) { nodes {
            id name customerId studyId variable
            aggregatef distinctv dataFilter
            statusId created modified funName
        }}}`;
        // console.log('GRAPHQL getMeasure => ( id )'
        //     ,'\n id:', id
        //     ,'\n query:', query
        //     ,'\n JSON query:', JSON.stringify({query})
        // );
        // 
        Axios.post('graphql', JSON.stringify({query}) )
            .then(success => {
                var measure = success.data.data.allMeasures.nodes[0];
                resolve(measure||{});
            })
            .catch(error =>  reject(parseError(error)) );
    });
}

export function updateMeasure ( id ) {
    tokenization();
    // NOTE: native promise can catch the exceptions
    return new Promise(function ( resolve, reject ) {
    // NOTE: from PHP project
        `
mutation { fInsertMeasure( input:{
    id:2918,
    name:"test info",
    customerId:54,
    studyId:2904,
    variable:"{\"entitytype\":\"study event\",\"item\":\"crf\"}",
    aggregatef:"COUNT",
    distinctv:true,
    dataFilter:"[{}]",
    statusId:1}
) {integer}
}
        `
        
        var query = `{ allMeasures( condition: { id: ${id} }, first: 1) { nodes {
            id name customerId studyId variable
            aggregatef distinctv dataFilter
            statusId created modified funName
        }}}`;
        // console.log('GRAPHQL getMeasure => ( id )'
        //     ,'\n id:', id
        //     ,'\n query:', query
        //     ,'\n JSON query:', JSON.stringify({query})
        // );
        // 
        Axios.post('graphql', JSON.stringify({query}) )
            .then(success => {
                var measure = success.data.data.allMeasures.nodes[0];
                resolve(measure||{});
            })
            .catch(error =>  reject(parseError(error)) );
    });
}


