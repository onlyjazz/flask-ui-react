
// outsource dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';

// local dependencies
import { authUser } from '../actions';
import { LogoBig } from '../components';
import { InputAddon } from '../components';
import { Axios, storage } from '../services';
import { SIGN_UP, FORGOT_PASSWORD } from '../constants/routes';

class Signin extends Component {
    
    constructor ( props ) {
        super(props);

        this.state = {
            expextAnswer: false,
            errorMessage: null,
        };
    }
    
    handleFormSubmit ( {password, email}, dispatch ) {
        
        this.setState({expextAnswer: true});
        // sign in
        Axios
            .post('/users/signin', { password, email })
            .then(success => {
                // store tokens
                storage.set('auth', success.data);
                // set default auth heder
                Axios.defaults.headers.common['Authorization'] = success.data.jwtToken;
                // get self
                Axios
                    .get('/users/self')
                    .then(success => {
                        // clear form
                        this.props.reset();
                        // update component
                        this.setState({expextAnswer: false});
                        // toastr success message
                        toastr.success('Hello !', 'We glad to see you =)');
                        // update state
                        dispatch( authUser(success.data) );
                        // redirect to app
                        this.props.history.push('/app/studies'); // does not work if action async
                    })
                    .catch(error => {
                        // clear tokens
                        storage.remove('auth');
                        // remove auth heder
                        delete Axios.defaults.headers.common['Authorization'];
                        // show error message
                        var message = 'Somethings went wrong...';
                        this.setState({
                            expextAnswer: false,
                            errorMessage: message,
                        });
                        // toastr error message
                        toastr.error('Error', message);
                    });
            })
            .catch(error => {
                var message = 'Wrong email or password.';
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
        						<strong> Sign In </strong>
                                <i className="fa fa-sign-in" aria-hidden="true"></i>
        					</div>
        					<div className="panel-body">
        						<form name="signInForm" onSubmit={ handleSubmit( this.handleFormSubmit.bind(this) ) }>
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
                                                    disabled={ this.state.expextAnswer }
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
                                                    disabled={ this.state.expextAnswer }
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
                                                    disabled={ invalid || this.state.expextAnswer }
                                                        >
                                                    <span> Sign In </span>
                                                    { this.state.expextAnswer&&(<i className="fa fa-spinner fa-spin fa-fw"></i>) }
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
                                        <Link to={SIGN_UP.LINK()}> Create an Account </Link>
                                    </div>
                                    <div className="col-xs-6 text-right">
                                        <Link to={FORGOT_PASSWORD.LINK()}> Forgot password </Link>
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
})( connect(state => ({ auth: state.auth }), null)(Signin) );
