
// outsource dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';

// local dependencies
import * as actions from '../actions';
import LogoBig from '../components/logo-big';
import InputAddon from '../components/input-addon';

class Signin extends Component {
    
    // constructor ( props ) {
    //     super(props);
    // }
    
    handleFormSubmit ( values, dispatch, form ) {
        
        console.log('Signin handleFormSubmit => ()'
            ,'\n values:', values
            ,'\n dispatch:', dispatch
            ,'\n form:', form
            // ,'\n this:', this
            ,'\n this.props:', this.props
        );
        // dispatch('TEST', values);
        // this.props.test( values );
        // this.props.signin( values );
    }
    
    
    render () {
        
        var { handleSubmit/*, reset*/  } = this.props;
        
        // console.log('Signin render => ()'
        //     ,'\n contenxt:', this.contenxt
        //     ,'\n state:', this.state
        //     ,'\n props:', this.props
        //     ,'\n refs:', this.refs
        //     ,'\n this:', this
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
                                                    // onClick={reset}
                                                    disabled={ this.props.invalid }
                                                        >
                                                    Sign In
                                                </Button>
                                            </div>
        								</div>
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
    validate,           // <--- validation function given to redux-form
    warn,               // <--- warning function given to redux-form
})( connect(state => {  // mapStateToProps
    console.log('Signin mapSteteToProps', state);
    return ({ authenticated: false })
}, actions)(Signin) );

/**
 * @param { Object } values - nammed properties of input data
 * @param { Object } meta - information about form status
 * @returns { Object } - nammed errors
 * @function validate
 * @public
 */
function validate ( values, meta ) {
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
    // PASSWORD
    if ( !values.password ) {
        errors.password = 'Password is required'
    } else if ( values.password.length < 8 ) {
        errors.password = 'Password must contain at least 8 symbol character'
    }
    
    return errors;
}

/**
 * @param { Object } values - nammed properties of input data
 * @param { Object } meta - information about form status
 * @returns { Object } - nammed warnings
 * @function warn
 * @public
 */
function warn ( values, meta ) {
    // console.log('Signin WARN => (values, meta)'
    //     ,'\n values:', values
    //     ,'\n meta:', meta
    // );
}

