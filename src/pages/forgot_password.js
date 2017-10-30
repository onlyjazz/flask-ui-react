
// outsource dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';

// local dependencies
import { forgotPassword, pageChange } from '../actions';
import LogoBig from '../components/logo-big';
import InputAddon from '../components/input-addon';

/**
 * @description page
 * @constructor ForgotPassword
 * @public
 */
class ForgotPassword extends Component {
    
    componentWillMount () { // pre - render of component
        // set location of current page
        this.props.pageChange( this.props.location );
    }
    
    handleFormSubmit ( values, dispatch, form ) {
        
        // console.log('Forgot handleFormSubmit => ()'
        //     ,'\n values:', values
        //     ,'\n dispatch:', dispatch
        //     ,'\n form:', form
        //     // ,'\n this:', this
        //     ,'\n this.props:', this.props
        // );
        
        // clear old error message
        this.props.pageData.errorMessage = null;
        // send request
        this.props.forgotPassword( values );
    }
    
    showFormError ( text ) {
        return (
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <div className="input-group text-center has-error">
                        <strong className="help-block offset-bottom-4"> { text } </strong>
                    </div>
                </div>
            </div>
        );
    }
    
    render () {
        
        var { handleSubmit, pageData } = this.props;
        
        // console.log('Forgot render => ()'
        //     ,'\n this.props:', this.props
        //     ,'\n test:', pageData
        // );
        
        return (
            <div className="container top-indent-10 offset-top-10">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <strong> Restore password </strong>
                                <i className="fa fa-life-ring" aria-hidden="true"></i>
                            </div>
                            <div className="panel-body">
                                <form name="forgotPasswordForm" onSubmit={ handleSubmit( this.handleFormSubmit.bind(this) ) }>
                                    <fieldset>
                                        <LogoBig className="row offset-bottom-4" />
        								<div className="row offset-bottom-2">
        									<div className="col-xs-10 col-xs-offset-1">
                                                <Field
                                                    required
                                                    type="mail"
                                                    name="email"
                                                    placeholder="Email"
                                                    component={ InputAddon }
                                                    className="form-control"
                                                    label={ <span> @ </span> }
                                                    disabled={ pageData.expextAnswer }
                                                        />
                                            </div>
                                        </div>
                                        <div className="row offset-bottom-4">
                                            <div className="col-xs-10 col-xs-offset-1">
                                                <Button
                                                    block
                                                    type="submit"
                                                    bsSize="large"
                                                    bsStyle="primary"
                                                    // onClick={reset}
                                                    disabled={ this.props.invalid || pageData.expextAnswer }
                                                        >
                                                    <span> Restore Password </span>
                                                    { pageData.expextAnswer&&(<i className="fa fa-spinner fa-spin fa-fw"></i>) }
                                                </Button>
                                            </div>
        								</div>
                                        { pageData.errorMessage&&this.showFormError(pageData.errorMessage) }
                                    </fieldset>
                                </form>
                            </div>
                            <div className="panel-footer text-right">
                                <Link to="/"> Back to Login </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'forgotPasswordForm',
    /**
    * @param { Object } values - nammed properties of input data
    * @param { Object } meta - information about form status
    * @returns { Object } - nammed errors
    * @function validate
    * @public
    */
    validate: ( values, meta ) => {
        // console.log('Signin VALIDATE => (values, meta)'
        //     ,'\n values:', values
        //     ,'\n meta:', meta
        // );
        var errors = {};
        // EMAIL
        if ( !values.email ) {
            errors.email = 'Email is required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        
        return errors;
    },
})( connect(state => { // mapStateToProps
    // console.log('Forgot mapSteteToProps', state);
    return ({ pageData: state.pageData });
// actions to props
}, {forgotPassword, pageChange} )(ForgotPassword) );
