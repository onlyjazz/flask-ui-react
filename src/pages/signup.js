
// outsource dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// local dependencies
import LogoBig from '../components/logo-big';

class Signup extends Component {
    
    handleFormSubmit () {
        
        console.log('Signup handleFormSubmit', this);
    }
    
    
    render() {
        
        var { handleSubmit } = this.props;
        
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
        						<form name="signUpForm" onSubmit={ handleSubmit( this.handleFormSubmit.bind(this) ) }>
        							<fieldset>
        								<LogoBig className="row offset-bottom-4" />
        								<div className="row">
        									<div className="col-xs-10 col-xs-offset-1">
                                                <div className="form-group offset-bottom-2">
        											<div className="input-group">
        												<label htmlFor="username" className="input-group-addon">
                                                            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                                        </label> 
                                                        <Field
                                                            id="username"
                                                            type="text"
                                                            name="username"
                                                            component="input"
                                                            placeholder="User Name"
                                                            className="form-control"
                                                                />
        											</div>
        										</div>
                                                
        										<div className="form-group offset-bottom-2">
        											<div className="input-group">
        												<label htmlFor="email" className="input-group-addon"> @ </label> 
                                                        <Field
                                                            id="email"
                                                            type="mail"
                                                            name="email"
                                                            component="input"
                                                            placeholder="Email"
                                                            className="form-control"
                                                                />
        											</div>
        										</div>
        										<div className="form-group offset-bottom-2">
        											<div className="input-group">
        												<label htmlFor="password" className="input-group-addon">
        													<i className="glyphicon glyphicon-lock"></i>
        												</label>
                                                        <Field
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            component="input"
                                                            placeholder="Password"
                                                            className="form-control"
                                                                />
        											</div>
        										</div>
                                                <div className="form-group offset-bottom-4">
        											<div className="input-group">
        												<label htmlFor="confirm" className="input-group-addon">
        													<i class="fa fa-repeat" aria-hidden="true"></i>
        												</label>
                                                        <Field
                                                            id="confirm"
                                                            name="confirm"
                                                            type="password"
                                                            component="input"
                                                            placeholder="Confirm Password"
                                                            className="form-control"
                                                                />
        											</div>
        										</div>
        										<div className="form-group">
        											<input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign Up" />
        										</div>
        									</div>
        								</div>
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
 // mapStateToProps
})( connect(state => {
    console.log('Signup mapSteteToProps', state);
    return ({ authenticated: false })
}, null)(Signup) );
