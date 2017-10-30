
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
    
    constructor ( props ) {
        
        super(props);
    
    }
    
    handleFormSubmit () {
        
        console.log('Signin handleFormSubmit => ()'
            ,'\n contenxt:', this.contenxt
            ,'\n state:', this.state
            ,'\n props:', this.props
            ,'\n refs:', this.refs
            ,'\n this:', this
        );
        
        // this.props.signin();
    }
    
    
    render () {
        
        var { handleSubmit } = this.props;
        
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
        								<div className="row">
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
                                        <div className="row offset-bottom-2">
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
                                        <div className="row offset-bottom-2">
                                            <div className="col-xs-10 col-xs-offset-1">
                                                <Button
                                                    block
                                                    type="submit"
                                                    bsSize="large"
                                                    bsStyle="primary"
                                                    disabled={ !this.props.invalid }
                                                        >
                                                    Sign In
                                                </Button>
                                                <p> props.invalid = { JSON.stringify(this.props.invalid) } </p>
                                                <p> props.valid = { JSON.stringify(this.props.valid) } </p>
                                                {/* <p> props: { JSON.stringify(this.props) } </p> */}
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
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
 // mapStateToProps
})( connect(state => {
    console.log('Signin mapSteteToProps', state);
    return ({ authenticated: false })
}, actions)(Signin) );

function validate ( values ) {
    console.log('Signin validate => ()'
        ,'\n values:', values
        // ,'\n state:', this.state
        // ,'\n props:', this.props
        // ,'\n refs:', this.refs
        ,'\n this:', this
    );
}

function warn ( values ) {
    console.log('Signin validate => ()'
        ,'\n values:', values
        // ,'\n state:', this.state
        // ,'\n props:', this.props
        // ,'\n refs:', this.refs
        ,'\n this:', this
    );
}

