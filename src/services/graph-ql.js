

import axios from 'axios';
import { is, storage } from '../services';
// 
// var Axios = axios.create({
//     baseURL: 'http://flask.clearclinica.dev.dfusiontech.com:5004',
//     // withCredentials: true,
// });
// 
// 
// var tokens = ;
// Axios.defaults.headers.common['Token'] = tokens.jwtToken;
// 
// 

var GraphQl = {
    getStudies: getStudies,
    getMeasuresPage: getMeasuresPage,
};

function parseError ( error ) {
    var res;
    try {
        if ( is.array( error.response.data.errors ) ) {
            res = { data: error.response.data.errors[0].message };
        } else {
            res = error.response.data;
        }
    } catch ( e ) { res = {data: 'Unknown error'}; }
    return res;
}



export function getMeasuresPage ( customerId, studyId ) {
    // NOTE: native promise can catch the exceptions
    return new Promise(function ( resolve, reject ) {
        var query = `{
            allStudyMeasures(orderBy:ID_DESC, condition:{${(studyId?'studyId:'+studyId+',':'')} customerId: ${customerId} } ){
                totalCount,
                pageInfo { endCursor, hasNextPage, startCursor, hasPreviousPage, },
                nodes {
                    id,
                    name,
                    studyId,
                    variable,
                    distinctv,
                    briefTitle,
                    aggregatef,
                    dataFilter,
                    officialTitle,
                }
            }
        }`;

        axios({ method: 'POST', json: true, data: JSON.stringify({query}),
            url: 'http://flask.clearclinica.dev.dfusiontech.com:5004/graphql',
            headers: {
               'Token': storage.get('auth').jwtToken,
               'Content-Type': 'application/json',
            },
        })
        .then(success => {
            var list = success.data.data.allStudyMeasures.nodes;
            // var page = success.data.data.allStudyMeasures.pageInfo;
            var res = [];
            var item;
            var vars;
            for (var key = 0; key < list.length; key++ ) {
                item = list[key];
                vars = JSON.parse(item.variable);
                res.push({ ...item, ...vars });
            }
            resolve(res);
        })
        .catch(error =>  reject(parseError(error)) );
    });
}


export function getStudies ( customerId ) {
    // NOTE: native promise can catch the exceptions
    return new Promise(function ( resolve, reject ) {
        var query = `{
            allStudies(orderBy: ID_ASC, condition: { customerId: ${customerId} }){
                nodes { id, briefTitle, officialTitle, }
            }
        }`;

        axios({ method: 'POST', json: true, data: JSON.stringify({query}),
            url: 'http://flask.clearclinica.dev.dfusiontech.com:5004/graphql',
            headers: {
               'Token': storage.get('auth').jwtToken,
               'Content-Type': 'application/json',
            },
        })
        .then(success => {
            var list = success.data.data.allStudies.nodes;
            resolve(list);
        })
        .catch(error =>  reject(parseError(error)) );
    });
}


export default GraphQl;
