
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// local dependencies
import { GraphQl, is } from '../services';
import { Preloader, FormSelect, FormInput } from '../components';


function getCrfList ( customerId, studyId, event = '' ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `mutation{fListOfStudyCrfs(input:{customerId:${customerId},studyId:${studyId},event:"${event}"}) {strings}}`
        ).then(success => {
            var items = success.data.data.fListOfStudyCrfs.strings;
            resolve(items);
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

function getItemsList ( customerId, studyId, event = '', crf = '' ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `mutation{fListOfStudyItems(input:{customerId:${customerId},studyId:${studyId},event:"${event}",crf:"${crf}"}) {strings}}`
        ).then(success => {
            var items = success.data.data.fListOfStudyItems.strings;
            resolve(items);
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

function getEventsList ( customerId, studyId ) {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `mutation{fListOfStudyEvents(input:{customerId:${customerId},studyId:${studyId}}) {strings}}`
        ).then(success => {
            var events = success.data.data.fListOfStudyEvents.strings;
            if ( !events || events.length === 0 ) {
                events = ['Study event'];
            }
            resolve(events);
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

function getAlertsList () {
    return new Promise(function ( resolve, reject ) {
        GraphQl(
            `mutation{fListOfTableColumns(input:{tn:"alerts"}) {strings}}`
        ).then(success => {
            var alerts = success.data.data.fListOfTableColumns.strings;
            resolve(alerts);
        })
        .catch(error =>  reject(GraphQl.parseError(error)) );
    });
}

function getStudyList ( customerId ) {
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

function getMeasure ( measureId ) {
    return new Promise(function ( resolve, reject ) {
        if ( is.countable(measureId) ) {
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
        } else { // new measure
            resolve({
                name: '',
                studyId: 0,
                aggregatef: '',
                distinctv: '',
                item: '',
                entitytype: '',
            });
        }
    });
}

const isAlert = entitytype => /alerts/i.test(entitytype);

class MeasureEdit extends Component {
    
    constructor ( props ) {
        super(props);
        // binded function to display errors
        this.showError = this.handleError.bind(this);
        
        this.state = {
            // base data
            entitytype: '',
            studyId: '',
            event: '',
            name: '',
            crf: '',
            item: '',
            // selects
            studies: [],
            alerts: [],
            items: [],
            crfList: [],
            events: [],
            // flags
            asNew: false,
            errorMessage: '',
            expectAnswer: true,
        };
        
        var { auth, match, initialize } = props;
        
        Promise.all([
            getStudyList( auth.user.customer_id ),
            getMeasure( match.params.id ),
            getAlertsList(),
        ]).then(all => {
            var studies = all[0];
            var measure = all[1];
            var alerts = all[2];
            
            Promise.all([
                measure.studyId&&getEventsList(auth.user.customer_id, measure.studyId ),
                measure.event&&getCrfList(auth.user.customer_id, measure.studyId, measure.event ),
                measure.crf&&getItemsList(auth.user.customer_id, measure.studyId, measure.event, measure.crf ),
            ])
            .then(all => {
                // update state
                this.setState({
                    expectAnswer: false,
                    events: all[0]||[],
                    crfList: all[1]||[],
                    items: all[2]||[],
                    studies: studies,
                    alerts: alerts,
                    entitytype: measure.entitytype||'',
                    studyId: measure.studyId||'',
                    event: measure.event||'',
                    name: measure.name||'',
                    crf: measure.crf||'',
                });
                // init values on the form
                initialize( measure );
            }).catch( this.showError );
        }).catch( this.showError );
    }
    
    handleError ( error ) {
        if ( error && this.state.expectAnswer ) {
            var message = 'Something went wrong ...';
            toastr.error('ERROR:', message);
            this.setState({
                expectAnswer: false,
                errorMessage: message,
            });
        }
    }
    
    onStudyChange ( studyId ) {
        // console.log('onStudyChange ( studyId )'
        //     ,'\n state:', this.state
        //     ,'\n studyId:', studyId
        // );
        this.setState({ studyId });
    }
    
    onEntityTypeChange ( entitytype ) {
        // console.log('onEntityTypeChange ( entitytype )'
        //     ,'\n state:', this.state
        //     ,'\n entitytype:', entitytype
        // );
        
        if ( isAlert(entitytype) ) {
            this.setState({
                entitytype,
                event: '',
                crf: '',
            });
        } else {
            this.setState({ entitytype, expectAnswer: true });
            // update events list
            getEventsList( this.props.auth.user.customer_id, this.state.studyId )
                .then( events => this.setState({ events, expectAnswer: false}) )
                .catch( this.showError );
        }
    }
    
    onEventChange ( event ) {
        // console.log('onEventChange ( event )'
        //     ,'\n state:', this.state
        //     ,'\n event:', event
        // );
        this.setState({ event, expectAnswer: true });
        // update events list
        getCrfList( this.props.auth.user.customer_id, this.state.studyId, event )
            .then( crfList => this.setState({ crfList, expectAnswer: false}) )
            .catch( this.showError );
    }
    
    onCRFChange ( crf ) {
        // console.log('onCRFChange ( crf )'
        //     ,'\n state:', this.state
        //     ,'\n crf:', crf
        // );
        this.setState({ crf, expectAnswer: true });
        // update events list
        getItemsList( this.props.auth.user.customer_id, this.state.studyId, this.state.event, crf )
            .then( items => this.setState({ items, expectAnswer: false}) )
            .catch( this.showError );
    }
    
    submit ( values, dispatch, form ) {
        
        var { studyId, asNew } = this.state;
        var { entitytype, item, crf = '', event = '', distinctv, aggregatef, name } = values;
        
        var measureId = !asNew&&is.countable(values.id) ? values.id : null;
        
        var variable = `\\"entitytype\\":\\"${entitytype}\\",\\"item\\":\\"${item}\\"`;
        if ( !isAlert(values.entitytype) ) {
            variable = `\\"entitytype\\":\\"${entitytype}\\",\\"item\\":\\"${item}\\",\\"event\\":\\"${event}\\",\\"crf\\":\\"${crf}\\"`;
        }

        var query = `mutation { fInsertMeasure( input: { statusId: 1, dataFilter: "[{}]",
            id: ${measureId},
            customerId: ${this.props.auth.user.customer_id},
            studyId: ${studyId},
            distinctv: ${distinctv},
            aggregatef: "${aggregatef}",
            name: "${name}",
            variable:"{${variable}}"
        }) {integer} }`;
        
        // console.log('MEASURE EDIT submit => ()'
        //     ,'\n props:', this.props
        //     ,'\n state:', this.state
        //     ,'\n auth:', this.props.auth
        //     ,'\n values:', values
        //     ,'\n asNew:', this.state.asNew
        //     ,'\n query:', query
        // );
        this.setState({ expectAnswer: true });
        GraphQl(query).then(success => {
            toastr.success('SAVE', 'Measure was updated.');
            // update state
            this.setState({ expectAnswer: false });
        }).catch( this.showError );
    }
    
    Error () {
        return !this.state.errorMessage ? ('') : (
            <div className="row">
                <div className="col-xs-12">{/* col-xs-10 col-xs-offset-1 */}
                    <p className="alert alert-danger" onClick={ () => this.setState({errorMessage: ''}) }>
                        <strong> Error: </strong>
                        { this.state.errorMessage }
                    </p>
                </div>
            </div>
        );
    }
    
    Variable () {
        
        var { items, alerts, event, crf, entitytype } = this.state;
        var vars = [];
        var fieldsDisabled = true;
        if ( isAlert(entitytype) ) {
            vars = alerts;
            fieldsDisabled = false;
        } else if ( entitytype ) {
            vars = items;
            fieldsDisabled = !(event&&crf);
        }
        
        return (
            <Paper zDepth={2} className="clearfix">
                <h2 className="col-xs-12 top-indent-2" style={{fontSize: '24px', fontWeight: 'normal'}}> Variable </h2>
                <div className="col-xs-12 offset-bottom-4">
                    <Field
                        disabled={fieldsDisabled}
                        name="item"
                        label="Fields"
                        component={ FormSelect }
                        preChange={(event, index, item) => this.setState({item} ) } >
                        <MenuItem value={0} disabled={true} primaryText="Fields" />
                        {(vars||[]).map( (field, key) => ( <MenuItem key={key} value={field} primaryText={field} /> ))}
                    </Field>
                </div>
                <div className="col-xs-12 offset-bottom-4">
                    <Field name="aggregatef" label="Aggregation" component={ FormSelect } >
                        <MenuItem value={0} disabled={true} primaryText="Aggregation" />
                        <MenuItem value={'COUNT'} primaryText="Count" />
                        <MenuItem value={'SUM'} primaryText="Sum" />
                        <MenuItem value={'AVG'} primaryText="AVG" />
                        <MenuItem value={'MIN'} primaryText="Min" />
                        <MenuItem value={'MAX'} primaryText="Max" />
                    </Field>
                </div>
                <div className="col-xs-12 offset-bottom-4">
                    <Field name="distinctv" label="Distinct" component={ FormSelect } >
                        <MenuItem value={0} disabled={true} primaryText="Distinct" />
                        <MenuItem value={true} primaryText="Yes" />
                        <MenuItem value={false} primaryText="No" />
                    </Field>
                </div>
            </Paper>
        );
    }
    
    EntityType () {
      
        var { entitytype, event, events, crfList } = this.state;
        
        return (
            <Paper zDepth={2} className="clearfix">
                <h2 className="col-xs-12 top-indent-2" style={{fontSize: '24px', fontWeight: 'normal'}}> Choose </h2>
                <div className="col-xs-12 offset-bottom-4">
                    <Field
                        // disabled={true}
                        name="entitytype"
                        label="Choose an Entity type"
                        component={ FormSelect }
                        preChange={(event, index, value) => this.onEntityTypeChange( value ) } >
                        <MenuItem value={0} disabled={true} primaryText="Entity type" />
                        <MenuItem value={'study event'} primaryText="Study event" />
                        <MenuItem value={'alerts'} primaryText="Alert" />
                    </Field>
                </div>
                <div className="col-xs-12 offset-bottom-4">
                    <Field
                        disabled={ !entitytype||/alerts/i.test(entitytype) }
                        name="event"
                        label="Choose an Event"
                        component={ FormSelect }
                        preChange={(event, index, value) =>  this.onEventChange( value ) } >
                        <MenuItem value={0} disabled={true} primaryText="Events" />
                        {(events||[]).map( (evt, key) => ( <MenuItem key={key} value={evt} primaryText={evt} /> ))}  
                    </Field>
                </div>
                <div className="col-xs-12 offset-bottom-4">
                    <Field
                        disabled={!event}
                        name="crf"
                        label="Choose an CRF"
                        component={ FormSelect }
                        preChange={(event, index, value) =>  this.onCRFChange( value ) } >
                        <MenuItem value={0} disabled={true} primaryText="CRF" />
                        {(crfList||[]).map( (evt, key) => ( <MenuItem key={key} value={evt} primaryText={evt} /> ))} 
                    </Field>
                </div>
            </Paper>
        );
    }
    
    Study () {
        return (
            <Paper zDepth={2} className="clearfix">
                <div className="col-xs-12 top-indent-2">
                    <h2 style={{fontSize: '24px', fontWeight: 'normal'}}> Study of Measure </h2>
                </div>
                <div className="col-xs-12 offset-bottom-4">
                    <Field
                        name="studyId"
                        label="Studies"
                        component={ FormSelect }
                        preChange={(event, index, value) => this.onStudyChange( value ) } >
                        <MenuItem value={-1} disabled={true} primaryText="Studies" />
                        {(this.state.studies||[]).map( (study, key) => ( <MenuItem key={key} value={study.id} primaryText={study.officialTitle} /> ))}           
                    </Field>
                </div>
            </Paper>
        );
    }
    
    render() {
        
        var { invalid, pristine, handleSubmit } = this.props;
        var { expectAnswer } = this.state;
        
        // console.log('MEASURE EDIT render => ()'
        //     ,'\n state:', this.state
        //     ,'\n props:', this.props
        //     ,'\n fields:', fields
        //     ,'\n match:', this.props.match
        // );
        return (
            <div className="custom-content-container">
                <form name="measureEditForm" onSubmit={ handleSubmit( this.submit.bind(this) ) }>
                    <div className="row top-indent-8 offset-bottom-4">
                        <h1 className="col-xs-12 col-sm-4 offset-bottom-2" style={{fontSize: '45px', fontWeight: 300}}>
                            Measures <Preloader type="ICON" expectAnswer={expectAnswer} />
                        </h1>
                        <div className="col-xs-12 col-sm-8 top-indent-3 offset-bottom-4">
                            <ul className="list-unstyled list-inline pull-right">
                                <li>
                                    <RaisedButton
                                        type="button"
                                        label="PREVIEW"
                                        labelColor="#FFFFFF"
                                        backgroundColor="#039BE5"
                                        disabled={ pristine || invalid || expectAnswer }
                                        // containerElement={<Link to={MESURE_EDIT.LINK({id: 'NEW'})} />}
                                            />
                                </li>
                                <li>
                                    <RaisedButton
                                        type="submit"
                                        label="SAVE AS A NEW MEASURE"
                                        labelColor="#FFFFFF"
                                        backgroundColor="#039BE5"
                                        disabled={ pristine || invalid || expectAnswer }
                                        onClick={ ()=> this.setState({'asNew': true}) }
                                            />
                                </li>
                                <li>
                                    <RaisedButton
                                        label="SAVE"
                                        type="submit"
                                        labelColor="#FFFFFF"
                                        backgroundColor="#4CAF50"
                                        disabled={ pristine || invalid || expectAnswer }
                                        onClick={ ()=> this.setState({'asNew': false}) }
                                            />
                                </li>
                            </ul>
                        </div>
                    </div>
                    { this.Error() }
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4 offset-bottom-4">
                            { this.Study() }
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-8 offset-bottom-4">
                            <Paper zDepth={2} className="clearfix">
                                <div className="col-xs-12 top-indent-2 offset-bottom-1">
                                    <h2 style={{fontSize: '24px', fontWeight: 'normal'}}> Measure Info </h2>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field name="name" label="Name" component={ FormInput } />
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 offset-bottom-4">
                            { this.EntityType() }
                        </div>
                        <div className="col-xs-12 col-sm-6 offset-bottom-4">
                            { this.Variable() }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'measureEditForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    /**
     * @param { Object } values - nammed properties of input data
     * @param { Object } meta - information about form status
     * @returns { Object } - nammed errors
     * @function validate
     * @public
     */
    validate: ( values, meta ) => {
        var errors = {};
        var alerts = isAlert(values.entitytype);
        
        if ( !values.name ) {
            errors.name = 'Name is required.';
        } else if ( values.name.length < 2 ) {
            errors.name = 'Name should contain at least 2 symbols. ';
        }
        
        if ( !values.studyId ) {
            errors.studyId = 'Study is required.';
        }
        
        if ( !values.aggregatef ) {
            errors.aggregatef = 'Aggregation is required.';
        }
        
        if ( !is.boolean(values.distinctv) ) {
            errors.distinctv = 'Distinct is required.';
        }
        
        if ( !values.entitytype ) {
            errors.entitytype = 'Entity type is required.';
        }
        
        if ( !values.item ) {
            errors.item = 'Fields is required.';
        }
        
        if ( !alerts&&!values.event ) {
            errors.event = 'Event is required.';
        }
        
        if ( !alerts&&!values.crf ) {
            errors.crf = 'CRF is required.';
        }
        
        // console.log('MEASURE EDIT validate => ( values, meta )'
        //     ,'\n values:', values
        //     ,'\n meta:', meta
        //     ,'\n errors:', errors
        // );
        
        return errors;
    },
  // mapStateToProps
})( connect(state => ({ auth: state.auth }), null)(MeasureEdit) );
