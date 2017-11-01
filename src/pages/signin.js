
// outsource dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';

// local dependencies
import * as actions from '../actions';
import LogoBig from '../components/logo-big';
import InputAddon from '../components/input-addon';
import { signin } from '../services';

class Signin extends Component {
    
    constructor ( props ) {
        super(props);
        
        this.state = {
            expextAnswer: false,
            errorMessage: null,
        };
    }
    
    componentWillMount () { // pre - render of component
        // if ( this.props.auth.authenticated ) {
        //     // redirect to app
        //     this.props.history.push('/app');
        // }
    }
    
    handleFormSubmit ( values, dispatch, form ) {
        
        this.setState({expextAnswer: true});

        signin(values)
            .then(success => {
                // clear form
                this.props.reset();
                // update component
                this.setState({expextAnswer: false});
                // toastr success message
                toastr.success('Hello !', 'We glad to see you =)');
                // update state
                // dispatch( authStart() );
                // redirect to app
                // this.props.history.push('/app');
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
    
    render () {
        
        var { auth, invalid, handleSubmit } = this.props;
        var { expextAnswer } = this.state;
        var bindedHandler = this.handleFormSubmit.bind(this);
        // console.log('Signin render => ()'
        //     // ,'\n contenxt:', this.contenxt
        // //     ,'\n state:', this.state
        //     // ,'\n props:', this.props
        // //     ,'\n refs:', this.refs
        //     // ,'\n this.props.history:', this.props.history
        // );
        
        return (
            <div className="container top-indent-10 offset-top-10">
        		<div className="row">
        			<div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        				<div className="panel panel-default">
        					<div className="panel-heading">
        						<strong> Sign In </strong>
                                <i className="fa fa-sign-in" aria-hidden="true"></i>
        					</div>
        					<div className="panel-body">
        						<form name="signInForm" onSubmit={ handleSubmit( bindedHandler ) }>
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
                                                    disabled={ expextAnswer }
                                                    label={ <span> @ </span> }
                                                        />
                                            </div>
                                        </div>
                                        <div className="row offset-bottom-4">
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
                                                <Button
                                                    block
                                                    type="submit"
                                                    bsSize="large"
                                                    bsStyle="primary"
                                                    disabled={ invalid || expextAnswer }
                                                        >
                                                    <span> Sign In </span>
                                                    { expextAnswer&&(<i className="fa fa-spinner fa-spin fa-fw"></i>) }
                                                </Button>
                                            </div>
        								</div>
                                        { this.showFormError() }
                                    </fieldset>
        						</form>
        					</div>
        					<div className="panel-footer">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <Link to="/signup"> Create an Account </Link>
                                    </div>
                                    <div className="col-xs-6 text-right">
                                        <Link to="/forgot"> Forgot password </Link>
                                    </div>
                                </div>
        					</div>
                        </div>
        			</div>
        		</div>
        	</div>
        );
    }
}

export default reduxForm({
    form: 'signInForm',
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
        // PASSWORD
        if ( !values.password ) {
            errors.password = 'Password is required'
        } else if ( values.password.length < 8 ) {
            errors.password = 'Password must contain at least 8 symbol character'
        }
        return errors;
    },
  // mapStateToProps
})( connect(state => ({ auth: state.auth }), actions)(Signin) );
