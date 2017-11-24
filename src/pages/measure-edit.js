
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// local dependencies
import { GraphQl, StudyService, is, MeasureService } from '../services';
import { Preloader, FormSelect, FormInput } from '../components';

// const fields = [
//     { name: 'Cohort', value: 'COHORT' },
//     { name: 'CRF', value: 'CRF' },
//     { name: 'Event', value: 'EVENT' },
//     { name: 'Event date', value: 'DATE' },
//     { name: 'Site', value: 'SITE' },
//     { name: 'Subject', value: 'SUBJECT' },
// ];
// 
const aggTypes = [
    { name: 'Count', value: 'COUNT' },
    { name: 'Sum', value: 'SUM' },
    { name: 'Avg', value: 'AVG' },
    { name: 'Min', value: 'MIN' },
    { name: 'Max', value: 'MAX' },
];
// 
const entityTypes = [
    { name: 'Study event', value: 'study event'/*'STUDY_EVENT'*/ },
    { name: 'Alert', value: 'alerts'/*'ALERT'*/ },
];

const emptyMeasure = {
    name: '',
    studyId: 0,
    aggregatef: '',
    distinctv: '',
    item: '',
    entitytype: '',
};

class MeasureEdit extends Component {
    
    constructor ( props ) {
        super(props);
        
        this.state = {
            // selects
            studies: [],
            studyId: 0,
            // fields: []/*fields*/,
            alerts: [],
            items: [],
            events: [],
            aggTypes: aggTypes,
            entityTypes: entityTypes,
            // flags
            asNew: false,
            errorMessage: '',
            expectAnswer: true,
        };
        
        var { auth, match, initialize } = props;
        
        var requests = [ StudyService.getStudyList( auth.user.customer_id ) ];
        if ( is.countable(match.params.id) ) {
            requests.push( MeasureService.getMeasure( match.params.id ));
        }
        
        Promise.all( requests )
            .then(all => {
                var studies = all[0];
                var measure = { ...emptyMeasure, ...all[1]};
                // update state
                this.setState({
                    studies: studies,
                    type: measure.entitytype, 
                });
                // get lists ...
                this.updateLists( measure.studyId );
                // console.log('initialize ( measure )'
                //     ,'\n measure:', measure
                // );
                // init values on the form
                initialize( measure );
            }).catch(error => {
                var message = 'Something went wrong ...';
                this.setState({
                    expectAnswer: false,
                    errorMessage: message,
                });
            });
    }
    
    updateLists ( studyId ) {
        
        var { auth } = this.props;
        
        // console.log('MEASURE EDIT updateLists => ()'
        //     ,'\n props:', this.props
        //     ,'\n state:', this.state
        //     ,'\n studyId:', studyId
        // );
        
        Promise.all([
            GraphQl(`mutation{fListOfTableColumns(input:{tn:"alerts"}) {strings}}`),
            GraphQl(`mutation{fListOfStudyEvents(input:{customerId:${auth.user.customer_id},studyId:${studyId}}) {strings}}`),
            GraphQl(`mutation{fListOfStudyItems(input:{customerId:${auth.user.customer_id},studyId:${studyId}, event: "", crf: ""}) {strings}}`),
        ])
        .then(all => {
            var alerts = all[0].data.data.fListOfTableColumns.strings;
            var events = all[1].data.data.fListOfStudyEvents.strings;
            var items = all[2].data.data.fListOfStudyItems.strings;

            // update state
            this.setState({
                alerts: alerts,
                items: items,
                events: events,
                expectAnswer: false,
            });

        }).catch(error => {
            var message = error.message||'Something went wrong ...';
            this.setState({
                expectAnswer: false,
                errorMessage: message,
            });
        });
    }
    
    submit ( values, dispatch, form ) {
        var query = `mutation {
            fInsertMeasure( input: {
                id:null,
                statusId:1,
                customerId:54,
                studyId:2904,
                dataFilter:"[{}]",
                distinctv:true,
                aggregatef:"COUNT",
                name:"Adverse Events",
            })
            {integer}
        }`
        // variable:"{\"entitytype\":\"study event\",\"item\":\"cohort\"}"
        console.log('MEASURE EDIT submit => ()'
            ,'\n props:', this.props
            ,'\n state:', this.state
            ,'\n auth:', this.props.auth
            ,'\n values:', values
            ,'\n asNew:', this.state.asNew
            ,'\n query:', query
        );
        this.setState({ expectAnswer: true });
        GraphQl(query)
            .then(success => {
                // update state
                this.setState({ expectAnswer: false });
                toastr.success('SAVE', 'Measure was updated.');
                
            }).catch(error => {
                var message = error.message||'Something went wrong ...';
                this.setState({
                    expectAnswer: false,
                    errorMessage: message,
                });
            });
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
    
    render() {
        
        var { invalid, pristine, handleSubmit } = this.props;
        var { expectAnswer, items, alerts, type } = this.state;
        
        var fields = [];
        if ( type == 'alerts' ) {
            fields = alerts;
        } else if ( type == 'study event' ) {
            fields = items;
        }
        
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
                            <Paper zDepth={2} className="clearfix">
                                <div className="col-xs-12 top-indent-2">
                                    <h2 style={{fontSize: '24px', fontWeight: 'normal'}}> Study of Measure </h2>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="studyId"
                                        label="Studies"
                                        component={ FormSelect }
                                        preChange={(event, index, value) =>  this.updateLists( value ) } >
                                        <MenuItem value={-1} disabled={true} primaryText="Studies" />
                                        {(this.state.studies||[]).map( (study, key) => ( <MenuItem key={key} value={study.id} primaryText={study.officialTitle} /> ))}           
                                    </Field>
                                </div>
                            </Paper>
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
                            <Paper zDepth={2} className="clearfix">
                                <h2 className="col-xs-12 top-indent-2" style={{fontSize: '24px', fontWeight: 'normal'}}> Choose </h2>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="entitytype"
                                        label="Entity type"
                                        component={ FormSelect }
                                        preChange={(event, index, value) => this.setState({ type: value }) } >
                                        <MenuItem value={0} disabled={true} primaryText="Entity type" />
                                        {(this.state.entityTypes||[]).map( (type, key) => ( <MenuItem key={key} value={type.value} primaryText={type.name} /> ))}            
                                    </Field>
                                </div>
                            </Paper>
                        </div>
                        <div className="col-xs-12 col-sm-6 offset-bottom-4">
                            <Paper zDepth={2} className="clearfix">
                                <h2 className="col-xs-12 top-indent-2" style={{fontSize: '24px', fontWeight: 'normal'}}>
                                    Variable
                                </h2>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="item"
                                        label="Fields"
                                        component={ FormSelect }>
                                        <MenuItem value={0} disabled={true} primaryText="Fields" />
                                        {(fields).map( (field, key) => ( <MenuItem key={key} value={field} primaryText={field} /> ))}
                                    </Field>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field name="aggregatef" label="Aggregation" component={ FormSelect } >
                                        <MenuItem value={0} disabled={true} primaryText="Aggregation" />
                                        {(this.state.aggTypes||[]).map( (type, key) => ( <MenuItem key={key} value={type.value} primaryText={type.name} /> ))}
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
        
        console.log('MEASURE EDIT validate => ( values, meta )'
            ,'\n values:', values
            ,'\n meta:', meta
            ,'\n errors:', errors
        );
        
        return errors;
    },
  // mapStateToProps
})( connect(state => ({ auth: state.auth }), null)(MeasureEdit) );
