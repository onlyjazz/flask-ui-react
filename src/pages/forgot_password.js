
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
    
    showFormError () {
        return !this.state.errorMessage ? ('') : (
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <p className="alert alert-danger" onClick={ () => this.setState({errorMessage: ''}) }>
                        <strong> Error: </strong>
                        { this.state.errorMessage }
                    </p>
                </div>
            </div>
        );
    }
    
    componentDidUpdate () {
        var { auth, history } = this.props;
        if ( auth.authenticated ) {
            history.push('/app/studies');
        }
    }
    
    componentDidMount () {
        setTimeout(()=> { // Fucking react-redux does not update the state for any pre-render methods for initial rendering
            if ( this.props.auth.authenticated ) {
                this.props.history.push('/app/studies');
            }
        }, 10);
    }
    
    render () {
        
        var { invalid, handleSubmit } = this.props;
        
        return (
            <div className="container top-indent-10 offset-top-10">
                <div className="row">
                    <div style={ {width: '360px', margin: '0 auto'} }>
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
                                                    disabled={ this.state.expextAnswer }
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
                                                    disabled={ invalid || this.state.expextAnswer }
                                                        >
                                                    <span> Restore Password </span>
                                                    { this.state.expextAnswer&&(<i className="fa fa-spinner fa-spin fa-fw"></i>) }
                                                </Button>
                                            </div>
        								</div>
                                        { this.showFormError() }
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
})( connect(state => ({ auth: state.auth }), null)(ForgotPassword) );
