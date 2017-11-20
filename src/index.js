// eslint-disable import/first

// outsource dependencies
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// STYLES inject ...
import './style';

// local dependencies
import reducers from './reducers';
import * as PATH from './constants/routes';
import { AUTH_RUN } from './actions/types';
import { payloads, errors, authRun } from './middlewares';
import { Header, SideMenu, Private } from './components';
import { Signin, Signup, NoMatch, ForgotPassword, Users, Measures, Monitoring, Sites, Studies } from './pages';

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
                <Route exact={true} path={PATH.SIGN_IN.ROUTE} component={ Signin } />
                <Route exact={true} path={PATH.SIGN_UP.ROUTE} component={ Signup } />
                <Route exact={true} path={PATH.FORGOT_PASSWORD.ROUTE} component={ ForgotPassword } />
                {/* PRIVATE */}
                <Private redirect={PATH.SIGN_IN.ROUTE}>
                    <Header />
                    <SideMenu>
                        <Route exact={true} path={PATH.USERS.ROUTE} component={ Users } />
                        <Route exact={true} path={PATH.SITES.ROUTE} component={ Sites } />
                        <Route exact={true} path={PATH.STUDIES.ROUTE} component={ Studies } />
                        <Route exact={true} path={PATH.MEASURES.ROUTE} component={ Measures } />
                        <Route exact={true} path={PATH.MONITORING.ROUTE} component={ Monitoring } />
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
        <MuiThemeProvider>
            <Root />
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root')
);
