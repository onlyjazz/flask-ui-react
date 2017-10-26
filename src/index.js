// eslint-disable import/first

// outsource dependencies
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// STYLES inject ...
import './style';

// local dependencies
import reducers from './reducers';
// import actions from './actions';
// import components from './components';
// import constants from './constants';

// configuration
// Note: this API requires redux@>=3.1.0
var store = createStore(
  reducers,
  applyMiddleware(thunk)
);

// process.env.SOME

var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
console.log('root', document.getElementById('root'));
ReactDOM.render(
    <div>
            <p> Its will be Flask admin application </p>
            {/* <Provider store={ store }>
                    <Router history={ browserHistory }>
                        <Route path="/" component={ App }>
                            <Route path="/signin" component={ SignIn }></Route>
                            <Route path="/signup"></Route>
                            <Route path="/feature"></Route>
                        </Route>
                    </Router>
                </Provider> */}
    </div>
    ,
    document.getElementById('root')
);