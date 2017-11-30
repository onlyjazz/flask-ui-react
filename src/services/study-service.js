
import { GraphQl } from '../services';

// NOTE: aliases
const StudyService = {
    getStudy: getStudy,
    getStudyList: getStudyList,
    createStudy: createStudy,
    updateStudy: updateStudy,
    deleteStudy: deleteStudy,
};
// for example import StudyService from '../services';
export default StudyService;

// console.log('GRAPHQL StudyService method => ( params )'
//     ,'\n query:', query
// );

export function getStudy ( studyId ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `{ studyById ( id: ${studyId} ) {
                id nodeId customerId statusId
                briefTitle briefSummary officialTitle
                detailedDescription principalInvestigator
                collaborator sponsor nctNumber url isatemplate
                enrollmentTarget studyStartDate studyCompletionDate
            }}`
        ).then(success => {
            var measure = success.data.data.allMeasures.nodes[0];
            resolve( GraphQl.decodeVariables(measure||{}) );
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

export function getStudyList ( customerId ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `{ allStudies(orderBy: ID_ASC, condition: { customerId: ${customerId} }){ nodes {
                id briefTitle officialTitle
            }}}`
        ).then(success => {
            var list = success.data.data.allStudies.nodes;
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
export function createStudy ( study ) {
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
export function updateStudy () {
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
export function deleteStudy ( studyId ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `{ uuidNil }`
        ).then(resolve).catch(error => reject(GraphQl.parseError(error)) );
    });
}
