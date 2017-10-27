
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';


// local dependencies
import Signin from './signin';
import Signup from './signup';
import NoMatch from './no-match';
import Forgot from './forgot_password';

import PrivateRoute from '../components/private-route';

import App from './private/index';

class Root extends Component {
    
    render () {
        console.log('Root render =>'
            ,'\n context:', this.context
            ,'\n state:', this.state
            ,'\n props:', this.props
            ,'\n refs:', this.refs
        );

        return (
            <Router>
                <div>
                    {/* HELPER FOR DEVELOPING */}
                    <p> help data CONTEXT: { JSON.stringify(this.context) } </p>
                    <p> help data STATE: { JSON.stringify(this.state) }  </p>
                    <p> help data PROPS: { JSON.stringify(this.props) }  </p>
                    <ul>
                        <li><Link to="/some"> Some </Link></li>
                        <li><Link to="/some-else"> Some else </Link></li>
                        <li><Link to="/"> Sign In </Link></li>
                        <li><Link to="/signup"> Sign Up </Link></li>
                        <li><Link to="/forgot"> Forgot Password </Link></li>
                        <li><Link to="/app"> privat App </Link></li>
                    </ul>
                    <Switch>
                        <Route exact={true} path="/" component={ Signin } />
                        <Route exact={true} path="/signup" component={ Signup } />
                        <Route exact={true} path="/forgot" component={ Forgot } />
                        <PrivateRoute path="/app" component={ App }>
                        </PrivateRoute>
                        <Route component={ NoMatch } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default connect(state => {
    console.log('Root mapSteteToProps', state);
    return ({ authenticated: false })
} )(Root);
