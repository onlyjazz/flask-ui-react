
// outsource dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';

// local dependencies
import LogoBig from '../components/logo-big';
import InputAddon from '../components/input-addon';
import { Axios } from '../services';

/**
 * @description page forgot password
 * @constructor ForgotPassword
 * @public
 */
class ForgotPassword extends Component {
    
    constructor ( props ) {
        super(props);
        
        this.state = {
            expextAnswer: false,
            errorMessage: null,
        };
    }
    
    handleFormSubmit ( values, dispatch, form ) {
        
        this.setState({expextAnswer: true});

        Axios
            .get('/forgotPassword')
            .then(success => {
                // clear form
                this.props.reset();
                // update component
                this.setState({expextAnswer: false});
                // toastr success message
                toastr.success('Hello !', 'We glad to see you =)');
            })
            .catch(error => {
                var message = 'Somethings went wrong...';
                this.setState({
                    expextAnswer: false,
                    errorMessage: message,
                });
                // toastr error message
                toastr.error('Error', message);
            });
    }
    
    showFormError ( text ) {
        return !text ? ('') : (
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
        
        var { invalid, handleSubmit } = this.props;
        var { expextAnswer, errorMessage } = this.state;
        var { showFormError, handleFormSubmit } = this;
        // 
        var bindedHandler = handleFormSubmit.bind(this);
        
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
                                <form name="forgotPasswordForm" onSubmit={ handleSubmit( bindedHandler ) }>
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
                                                    disabled={ expextAnswer }
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
                                                    disabled={ invalid || expextAnswer }
                                                        >
                                                    <span> Restore Password </span>
                                                    { expextAnswer&&(<i className="fa fa-spinner fa-spin fa-fw"></i>) }
                                                </Button>
                                            </div>
        								</div>
                                        { showFormError(errorMessage) }
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
        var errors = {};
        // EMAIL
        if ( !values.email ) {
            errors.email = 'Email is required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        return errors;
    },
// mapStateToProps
})( connect(state => ({}), null)(ForgotPassword) );
