
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';


// local dependencies
// pages publick
import Signin from './signin';
import Signup from './signup';
import NoMatch from './no-match';
import Forgot from './forgot_password';
// pages private
import Users from './users';
import Measures from './measures';
import Monitoring from './monitoring';
import Sites from './sites';
import Studies from './studies';

// components
import Header from '../components/header';
import SideMenu from '../components/side-menu';
import PrivateRoute from '../components/private-route';


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
                    <Route path="/app" component={ Header } />
                    <Route path="/app" component={ SideMenu } />
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
                        <li><Link to="/app/users"> privat Users </Link></li>
                    </ul>
                    <Switch>
                        {/* PUBLICK */}
                        <Route exact={true} path="/" component={ Signin } />
                        <Route exact={true} path="/signup" component={ Signup } />
                        <Route exact={true} path="/forgot" component={ Forgot } />
                        {/* PRIVATE */}
                        <PrivateRoute path="/app/sites" component={ Sites } />
                        <PrivateRoute path="/app/users" component={ Users } />
                        <PrivateRoute path="/app/studies" component={ Studies } />
                        <PrivateRoute path="/app/measures" component={ Measures } />
                        <PrivateRoute path="/app/monitoring" component={ Monitoring } />
                        {/* OTHERWISE */}
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
