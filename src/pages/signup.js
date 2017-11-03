
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
import { Axios/*, signin*/ } from '../services';

class Signup extends Component {
    
    constructor ( props ) {
        super(props);
        
        this.state = {
            expextAnswer: false,
            errorMessage: null,
        };
    }
    
    handleFormSubmit ( values, dispatch, form ) {
        
        this.setState({expextAnswer: true});

        Axios.post('/signup', values)
            .then(success => {
                
                // signin(values)
                //     .then(success => {
                //         // clear form
                //         this.props.reset();
                //         // update component
                //         this.setState({expextAnswer: false});
                //         // toastr success message
                //         toastr.success('Hello !', 'We glad to see you =)');
                //         // update state
                //         dispatch({ type: AUTH_USER });
                //         // redirect to app
                //         this.props.history.push('/app');
                //     })
                //     .catch(error => {
                //         var message = 'Somethings went wrong...';
                //         this.setState({
                //             expextAnswer: false,
                //             errorMessage: message,
                //         });
                //         // toastr error message
                //         toastr.error('Error', message);
                //     });
                // clear form
                this.props.reset();
                // update component
                this.setState({expextAnswer: false});
                // toastr success message
                toastr.success('Hello !', 'You may confirm your email.');
                // update state
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
    
    
    render() {
        
        var { /*auth,*/ invalid, handleSubmit } = this.props;
        var { expextAnswer } = this.state;
        var bindedHandler = this.handleFormSubmit.bind(this);
        
        return (
            <div className="container top-indent-10 offset-top-10">
        		<div className="row">
        			<div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        				<div className="panel panel-default">
        					<div className="panel-heading">
        						<strong> Sign Up </strong>
                                <i className="fa fa-user-plus" aria-hidden="true"></i>
        					</div>
        					<div className="panel-body">
        						<form name="signUpForm" onSubmit={ handleSubmit( bindedHandler ) }>
                                    <fieldset>
                                        <LogoBig className="row offset-bottom-4" />
                                        <div className="row offset-bottom-2">
        									<div className="col-xs-10 col-xs-offset-1">
                                                <Field
                                                    required
                                                    type="text"
                                                    name="username"
                                                    placeholder="User Name"
                                                    component={ InputAddon }
                                                    className="form-control"
                                                    disabled={ expextAnswer }
                                                    label={ <i className="fa fa-user-circle-o" aria-hidden="true"></i> }
                                                        />
                                            </div>
                                        </div>
        								<div className="row offset-bottom-2">
        									<div className="col-xs-10 col-xs-offset-1">
                                                <Field
                                                    required
                                                    type="mail"
                                                    name="email"
                                                    placeholder="Email"
                                                    component={ InputAddon }
                                                    className="form-control"
                                                    disabled={ expextAnswer }
                                                    label={ <span> @ </span> }
                                                        />
                                            </div>
                                        </div>
                                        <div className="row offset-bottom-2">
                                            <div className="col-xs-10 col-xs-offset-1">
                                                <Field
                                                    required
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    component={ InputAddon }
                                                    className="form-control"
                                                    disabled={ expextAnswer }
                                                    label={ <i className="glyphicon glyphicon-lock"></i> }
                                                        />
                                            </div>
                                        </div>
                                        <div className="row offset-bottom-4">
                                            <div className="col-xs-10 col-xs-offset-1">
                                                <Field
                                                    required
                                                    name="confirm"
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    component={ InputAddon }
                                                    className="form-control"
                                                    disabled={ expextAnswer }
                                                    label={ <i className="fa fa-repeat" aria-hidden="true"></i> }
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
                                                    <span> Sign Up </span>
                                                    { expextAnswer&&(<i className="fa fa-spinner fa-spin fa-fw"></i>) }
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
    form: 'signUpForm',
    /**
     * @param { Object } values - nammed properties of input data
     * @param { Object } meta - information about form status
     * @returns { Object } - nammed errors
     * @function validate
     * @public
     */
    validate: ( values, meta ) => {

        var errors = {};
        // USERNAME
        if ( !values.username ) {
            errors.username = 'User Name is required';
        } else if (!/^[A-Z0-9._%+-]{2,}$/i.test(values.username)) {
            errors.username = 'Try something else';
        }
        // EMAIL
        if ( !values.email ) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        // PASSWORD
        if ( !values.password ) {
            errors.password = 'Password is required';
        } else if ( values.password.length < 8 ) {
            errors.password = 'Password must contain at least 8 symbol character';
        }
        // CONFIRM
        if ( !values.confirm ) {
            errors.confirm = 'Please confirm your Password';
        } else if ( values.password !== values.confirm ) {
            errors.confirm = 'Passwords do not match';
        }
        
        return errors;
    },
  // mapStateToProps
})( connect(state => ({ auth: state.auth }), null)(Signup) );
