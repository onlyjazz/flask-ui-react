
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

class MeasureEdit extends Component {
    
    constructor ( props ) {
        super( props );
        
        this.state = {
            errorMessage: '',
            expectAnswer: false,
            studies: [],
            study: { id: 0 },
            name: null,
            entitytype: null,
            fields: null,
            distinctv: null,
            aggregatef: null,
        };
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
    
    getMeasure ( id ) {
        GraphQl
            .getMeasure( id )
            .then(success => {
                // console.log('MEASURE EDIT getMeasure => ()'
                //     ,'\n state:', this.state
                //     ,'\n props:', this.props
                // );
                var study = _.find(this.state.studies, { id: success.studyId })[0]||{id:0};
                this.setState({
                    expectAnswer: false,
                    study: study,
                    name: success.name,
                    fields: success.fields,
                    entitytype: success.entitytype,
                    distinctv: success.distinctv,
                    aggregatef: success.aggregatef,
                });
            })
            .catch(error => {
                this.setState({
                    expectAnswer: false,
                    errorMessage: JSON.stringify(error.data),
                });
            });
    }
    
    componentWillMount () {
        // console.log('MEASURE EDIT componentWillMount => ()'
        //     ,'\n state:', this.state
        //     ,'\n props:', this.props
        //     ,'\n match:', this.props.match
        // );
        setTimeout(()=> {
            GraphQl
                .getStudies( this.props.auth.user.customer_id )
                .then(success => {
                    var measureId = this.props.match.params.id;
                    if ( is.number( measureId ) ) {
                        this.setState({studies: success});
                        this.getMeasure( measureId );
                    } else {
                        this.setState({
                            studies: success,
                            expectAnswer: false,
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        expectAnswer: false,
                        errorMessage: JSON.stringify(error.data),
                    });
                });
        }, 10);
    }
    
    render() {
        
        // console.log('MEASURE EDIT render => ()'
        //     ,'\n state:', this.state
        //     ,'\n props:', this.props
        //     ,'\n match:', this.props.match
        // );
        var { studies, expectAnswer } = this.state;
        var { invalid, handleSubmit } = this.props;
        
        return (
            <div className="custom-content-container">
                <form name="measureEditForm" onSubmit={ handleSubmit( ()=> console.log('Form submit') ) }>
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
                                        disabled={ invalid || expectAnswer }
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
                                        disabled={ invalid || expectAnswer }
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
                                        disabled={ invalid || expectAnswer }
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
                                        name="study"
                                        label="Studies"
                                        component={ FormSelect }>
                                        {studies.map( (study, key) => ( <MenuItem key={key} value={study.id} primaryText={study.officialTitle} /> ))}           
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
                                        {entityTypes.map( (type, key) => ( <MenuItem key={key} value={type.value} primaryText={type.name} /> ))}            
                                    </Field>
                                </div>
                            </Paper>
                        </div>
                        <div className="col-xs-6">
                            <Paper zDepth={2} className="clearfix">
                                <h2 className="col-xs-12 top-indent-2" style={{fontSize: '24px', fontWeight: 'normal'}}>
                                    Variable
                                </h2>
                                {/* <div className="col-xs-12 offset-bottom-4">
                                    <SelectField
                                        fullWidth={true}
                                        value={study.id}
                                        floatingLabelText="Studies"
                                        // errorStyle={{color: 'orange'}}
                                        errorText={'Should not be Night (Custom error style)'}
                                        onChange={(event, index, value)=> this.setState({study: _.find(studies, {id: value})||{id: 0}}) }
                                            >
                                        <MenuItem disabled={true} value={0} style={{ whiteSpace: 'normal', textOverflow: 'unset'}} primaryText="Select Study" />
                                        {studies.map( (study, key) => ( <MenuItem key={key} value={study.id} primaryText={study.officialTitle} /> ))}
                                    </SelectField>
                                </div> */}
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="fields"
                                        label="Fields"
                                        component={ FormSelect }>
                                        {fields.map( (field, key) => ( <MenuItem key={key} value={field.value} primaryText={field.name} /> ))}
                                    </Field>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="aggregatef"
                                        label="Aggregation"
                                        component={ FormSelect }>
                                        {aggTypes.map( (type, key) => ( <MenuItem key={key} value={type.value} primaryText={type.name} /> ))}
                                    </Field>
                                </div>
                                <div className="col-xs-12 offset-bottom-4">
                                    <Field
                                        name="distinctv"
                                        label="Distinct"
                                        component={ FormSelect }>
                                        <MenuItem value={true} primaryText="Yes" />
                                        <MenuItem value={false} primaryText="No" />
                                    </Field>
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-12">
                                Private content for editing Measure.
                                { JSON.stringify(this.props.match) }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                { JSON.stringify(this.state.measure) }
                            </div>
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
    validate: ( values, meta ) => {

        var errors = {};
        // EMAIL
        // if ( !values.email ) {
        //     errors.email = 'Email is required'
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid email address'
        // }
        
        console.log('MEASURE EDIT validate => ( values, meta )'
            ,'\n values:', values
            ,'\n meta:', meta
        );
        
        return errors;
    },
  // mapStateToProps
})( connect(state => ({ auth: state.auth }), null)(MeasureEdit) );
