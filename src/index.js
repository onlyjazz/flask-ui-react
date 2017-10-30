// eslint-disable import/first

// outsource dependencies
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

// STYLES inject ...
import './style';

// local dependencies
import reducers from './reducers';

// local dependencies
// pages publick
import Signin from './pages/signin.js';
import Signup from './pages/signup';
import NoMatch from './pages/no-match';
import Forgot from './pages/forgot_password';
// pages private
import Users from './pages/users';
import Measures from './pages/measures';
import Monitoring from './pages/monitoring';
import Sites from './pages/sites';
import Studies from './pages/studies';

// components
import Header from './components/header';
import SideMenu from './components/side-menu';
import PrivateRoute from './components/private-route';

// configuration
// NOTE: this API requires redux@>=3.1.0
var store = createStore(
  reducers,
  applyMiddleware(thunk)
);

/**
 * @description Root Component of application
 * @constructor Root
 * @public
 */
function Root ( props, state ) {
    
    // console.log('Root render =>'
    //     ,'\n props:', props
    //     ,'\n state:', state
    // );
    
    return (
        <Router>
            <div>
                {/* COMMON FOR PRIVATE */}
                <Route path="/app" component={ Header } />
                <Route path="/app" component={ SideMenu } />
                <Switch>
                    {/* PUBLICK */}
                    <Route exact={true} path="/" component={ Signin } />
                    <Route exact={true} path="/signup" component={ Signup } />
                    <Route exact={true} path="/forgot" component={ Forgot } />
                    {/* PRIVATE */}
                    <PrivateRoute path="/app" component={ Users } />
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

/**
 * @description insert Roo Component in ReactDOM
 * @public
 */
ReactDOM.render(
    <Provider store={store} >
        <Root />
    </Provider>
    ,
    document.getElementById('root')
);
