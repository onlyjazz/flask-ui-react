
// outsource dependencies
import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
// import IconMenu from 'material-ui/IconMenu';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
// import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
// local dependencies
import { GraphQl, is } from '../services';
import { Preloader, FormSelect, FormInput } from '../components';

const fields = [
    { name: 'Cohort', value: 'COHORT' },
    { name: 'CRF', value: 'CRF' },
    { name: 'Event', value: 'EVENT' },
    { name: 'Event date', value: 'DATE' },
    { name: 'Site', value: 'SITE' },
    { name: 'Subject', value: 'SUBJECT' },
];

const aggTypes = [
    { name: 'Count', value: 'COUNT' },
    { name: 'Sum', value: 'SUM' },
    { name: 'Avg', value: 'AVG' },
    { name: 'Min', value: 'MIN' },
    { name: 'Max', value: 'MAX' },
];

const entityTypes = [
    { name: 'Study event', value: 'STUDY_EVENT' },
    { name: 'Alert', value: 'ALERT' },
];

const emptyMeasure = {
    name: '',
    studyId: '',
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
            fields: fields,
            aggTypes: aggTypes,
            entityTypes: entityTypes,
            // flags
            errorMessage: '',
            expectAnswer: true,
        };
        
        var { auth, match, initialize } = props;
        
        // console.log('MEASURE EDIT constructor => ( props )'
        //     ,'\n props:', props
        //     ,'\n auth:', auth
        //     ,'\n match:', match
        // );
        var requests = [ GraphQl.getStudies( auth.user.customer_id ) ];
        if ( is.countable(match.params.id) ) {
            requests.push(GraphQl.getMeasure( match.params.id ));
        }
        
        Promise.all( requests )
            .then(all => {
                var studies = all[0];
                var measure = all[1];
                // update state
                this.setState({
                    expectAnswer: false,
                    studies: studies,
                });
                // init values on the form
                initialize({ ...emptyMeasure, ...measure});
            }).catch(error => {
                var message = 'Something went wrong ...';
                this.setState({
                    expectAnswer: false,
                    errorMessage: message,
                });
            });
    }
    
    submit ( values, dispatch, form ) {
        console.log('MEASURE EDIT submit => ()'
            ,'\n props:', this.props
            ,'\n auth:', this.props.auth
            ,'\n values:', values
            ,'\n dispatch:', values
            ,'\n form:', values
        );
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
        
        // console.log('MEASURE EDIT render => ()'
        //     ,'\n state:', this.state
        //     ,'\n props:', this.props
        //     ,'\n match:', this.props.match
        // );
        var { invalid, pristine, handleSubmit } = this.props;
        var { expectAnswer } = this.state;
        
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
                                        style={{float: 'right'}}
                                        backgroundColor="#039BE5"
                                        disabled={ pristine || invalid || expectAnswer }
                                        // containerElement={<Link to={MESURE_EDIT.LINK({id: 'NEW'})} />}
                                            />
                                </li>
                                <li>
                                    <RaisedButton
                                        type="button"
                                        label="SAVE AS A NEW MEASURE"
                                        labelColor="#FFFFFF"
                                        style={{float: 'right'}}
                                        backgroundColor="#039BE5"
                                        disabled={ pristine || invalid || expectAnswer }
                                        // containerElement={<Link to={MESURE_EDIT.LINK({id: 'NEW'})} />}
                                            />
                                </li>
                                <li>
                                    <RaisedButton
                                        label="SAVE"
                                        type="submit"
                                        labelColor="#ffffff"
                                        style={{float: 'right'}}
                                        backgroundColor="#4CAF50"
                                        disabled={ pristine || invalid || expectAnswer }
                                        // containerElement={<Link to={MESURE_EDIT.LINK({id: 'NEW'})} />}
                                            />
                                </li>
                            </ul>
                        </div>
                    </div>
                    { this.Error() }
                    <div className="row offset-bottom-4">
                        <div className="col-xs-4">
                            <Paper zDepth={2} className="clearfix">
                                <div className="col-xs-12 top-indent-2">
                                    <h2 style={{fontSize: '24px', fontWeight: 'normal'}}> Study of Measure </h2>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="studyId"
                                        label="Studies"
                                        component={ FormSelect }
                                        // onChange={value => {
                                        //     this.setState({study: _.find(studies, {id: value})||{id: 0}});
                                        //     return value;
                                        // }}
                                            >
                                        <MenuItem value={0} disabled={true} primaryText="Studies" />
                                        {(this.state.studies||[]).map( (study, key) => ( <MenuItem key={key} value={study.id} primaryText={study.officialTitle} /> ))}           
                                    </Field>
                                </div>
                            </Paper>
                        </div>
                        <div className="col-xs-8">
                            <Paper zDepth={2} className="clearfix">
                                <div className="col-xs-12 top-indent-2 offset-bottom-1">
                                    <h2 style={{fontSize: '24px', fontWeight: 'normal'}}> Measure Info </h2>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="name"
                                        label="Name"
                                        component={ FormInput }
                                            />
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <div className="row offset-bottom-4">
                        <div className="col-xs-6">
                            <Paper zDepth={2} className="clearfix">
                                <h2 className="col-xs-12 top-indent-2" style={{fontSize: '24px', fontWeight: 'normal'}}> Choose </h2>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="entitytype"
                                        label="Entity type"
                                        component={ FormSelect }>
                                        <MenuItem value={0} disabled={true} primaryText="Entity type" />
                                        {(this.state.entityTypes||[]).map( (type, key) => ( <MenuItem key={key} value={type.value} primaryText={type.name} /> ))}            
                                    </Field>
                                </div>
                            </Paper>
                        </div>
                        <div className="col-xs-6">
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
                                        {(this.state.fields||[]).map( (field, key) => ( <MenuItem key={key} value={field.value} primaryText={field.name} /> ))}
                                    </Field>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="aggregatef"
                                        label="Aggregation"
                                        component={ FormSelect }>
                                        <MenuItem value={0} disabled={true} primaryText="Aggregation" />
                                        {(this.state.aggTypes||[]).map( (type, key) => ( <MenuItem key={key} value={type.value} primaryText={type.name} /> ))}
                                    </Field>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="distinctv"
                                        label="Distinct"
                                        component={ FormSelect }>
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
    /**
     * @param { Object } values - nammed properties of input data
     * @param { Object } meta - information about form status
     * @returns { Object } - nammed errors
     * @function validate
     * @public
     */
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
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
        
        if ( !values.distinctv ) {
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
