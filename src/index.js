// eslint-disable import/first

// outsource dependencies
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import { createStore, applyMiddleware } from 'redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

// STYLES inject ...
import './style';

// local dependencies
import reducers from './reducers';
import { AUTH_RUN } from './actions/types';
import { payloads, errors, authRun } from './middlewares';
import { Header, SideMenu, Private } from './components';
import { Signin, Signup, NoMatch, ForgotPassword, Users, Measures, Monitoring, Sites, Studies } from './pages';

// configuration

/**
 * @description Root Component of application
 * @constructor Root
 * @public
 */
function Root ( props, state ) {
    return (
        <Router><div>
            <Switch>
                {/* PUBLICK */}
                <Route exact={true} path="/" component={ Signin } />
                <Route exact={true} path="/signup" component={ Signup } />
                <Route exact={true} path="/forgot" component={ ForgotPassword } />
                {/* PRIVATE */}
                <Private redirect="/">
                    <Header />
                    <SideMenu>
                        <Route exact={true} path="/app/users" component={ Users } />
                        <Route exact={true} path="/app/sites" component={ Sites } />
                        <Route exact={true} path="/app/studies" component={ Studies } />
                        <Route exact={true} path="/app/measures" component={ Measures } />
                        <Route exact={true} path="/app/monitoring" component={ Monitoring } />
                    </SideMenu>
                </Private>
                {/* OTHERWISE */}
                <Route component={ NoMatch } />
            </Switch>
            <ReduxToastr
                timeOut={4000}
                progressBar={true}
                newestOnTop={false}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                preventDuplicates={true}
                    >
            </ReduxToastr>
        </div></Router>
    );
}

// NOTE: this API requires redux@>=3.1.0
var store = createStore(
  reducers,
  applyMiddleware( authRun, thunk, payloads, errors )
);

// NOTE: actions which will be executed before application was rendered
store.dispatch({type: AUTH_RUN});

/**
 * @description insert Roo Component in ReactDOM
 * @public
 */
ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
    ,
    document.getElementById('root')
);
