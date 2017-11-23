
import { GraphQl } from '../services';

// NOTE: aliases
const MeasureService = {
    getMeasure: getMeasure,
    getMeasureList: getMeasureList,
    createMeasure: createMeasure,
    updateMeasure: updateMeasure,
    deleteMeasure: deleteMeasure,
    deleteMeasureList: deleteMeasureList,
};
// for example import MeasureService from '../services';
export default MeasureService;

// console.log('GRAPHQL MeasureService method => ( params )'
//     ,'\n query:', query
// );

export function getMeasure ( measureId ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `{ allMeasures( condition: { id: ${measureId} }, first: 1) { nodes {
                id name customerId studyId variable
                aggregatef distinctv dataFilter
                statusId created modified funName
            }}}`
        ).then(success => {
            var measure = success.data.data.allMeasures.nodes[0];
            resolve( GraphQl.decodeVariables(measure||{}) );
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

export function getMeasureList ( customerId, studyId ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `{ allStudyMeasures(orderBy:ID_DESC, condition:{${(studyId?'studyId:'+studyId+',':'')} customerId: ${customerId} } ){
                totalCount,
                pageInfo { endCursor, hasNextPage, startCursor, hasPreviousPage },
                nodes {
                    id name studyId variable distinctv
                    briefTitle aggregatef
                    dataFilter officialTitle
                }
            }}`
        ).then(success => {
            var list = success.data.data.allStudyMeasures.nodes;
            // var page = success.data.data.allStudyMeasures.pageInfo;
            var res = [];
            for (var key = 0; key < list.length; key++ ) {
                res.push( GraphQl.decodeVariables(list[key]) );
            }
            resolve(res);
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

// TODO: !!!!!!!!!!!!!!!!! Need to implement
export function createMeasure ( measure ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `{ uuidNil }`
        ).then(success => {
            // var measure = success.data.data.allMeasures.nodes[0];
            // resolve( GraphQl.decodeVariables(measure) );
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

// TODO: !!!!!!!!!!!!!!!!! Need to implement
export function updateMeasure () {
    //  NOTE: from PHP project
    //         `
    // mutation { fInsertMeasure( input:{
    //     id:2918,
    //     name:"test info",
    //     customerId:54,
    //     studyId:2904,
    //     variable:"{\"entitytype\":\"study event\",\"item\":\"crf\"}",
    //     aggregatef:"COUNT",
    //     distinctv:true,
    //     dataFilter:"[{}]",
    //     statusId:1}
    // ) {integer}
    // }
    //         `
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `{ uuidNil }`
        ).then(success => {
            // var measure = success.data.data.allMeasures.nodes[0];
            // resolve( GraphQl.decodeVariables(measure) );
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

export function deleteMeasure ( measureId ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `mutation { fDeleteMeasure( input: {id: ${measureId}}) { integer } }`
        ).then(resolve).catch(error => reject(GraphQl.parseError(error)) );
    });
}

export function deleteMeasureList ( list ) {
    return new Promise(function ( resolve, reject ) {
        for ( var key = 0, listQuery = '', id; key < list.length; key ++ ) {
            if ( list[key]&&list[key].id ) {
                id = list[key].id;
                listQuery += `measure_${id}: fDeleteMeasure(input: {id: ${id}}){ integer },`;
            }
        }
        var query = `mutation { ${listQuery.slice(0, -1)} }`;
        GraphQl(query).then(resolve).catch(error => reject(GraphQl.parseError(error)) );
    });
}
