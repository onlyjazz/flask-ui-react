
// outsource dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// local dependencies
import logo from './flask_data.png';

class Signin extends Component {
    
    handleFormSubmit () {
        
        console.log('handleFormSubmit', this);
    }
    
    
    render() {
        
        const { handleSubmit } = this.props;
        
        return (
            <div className="container">
        		<div className="row">
        			<div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        				<div className="panel panel-default">
        					<div className="panel-heading">
        						<strong> Sign In </strong>
                                <i class="fa fa-sign-in" aria-hidden="true"></i>
        					</div>
        					<div className="panel-body">
        						<form name="signInForm" onSubmit={ handleSubmit( this.handleFormSubmit.bind(this) ) }>
        							<fieldset>
        								<div className="row">
        									<div className="col-xs-6 col-xs-offset-3 indent-1 offset-bottom-2">
        										<img className="img-responsive" alt="Flask data" src={logo} />
        									</div>
        								</div>
        								<div className="row">
        									<div className="col-xs-10 col-xs-offset-1">
        										<div className="form-group">
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
        										<div className="form-group">
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
        										<div className="form-group indent-top-2">
        											<input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign in" />
        										</div>
        									</div>
        								</div>
        							</fieldset>
        						</form>
        					</div>
        					<div className="panel-footer text-right">
                                <Link to="/forgot"> Forgot password </Link>
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
    // fields: ['email', 'password'],       // depricated from reduxForm v6+
 // mapStateToProps
})( connect(state => {
    console.log('Signin mapSteteToProps', state);
    return ({ authenticated: false })
}, null)(Signin) );
