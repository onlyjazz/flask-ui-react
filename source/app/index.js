
// outsource dependencies
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// local dependencies

// configuration
// Note: this API requires redux@>=3.1.0
// var store = createStore(
//   reducers,
//   applyMiddleware(thunk)
// );

var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    // <Provider store={ createStoreWithMiddleware(reducers) }>
    <Provider store={ createStore(reducers, applyMiddleware(thunk) ) }>
        ha ha
        {/* <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <Route path="/signin" component={ SignIn }></Route>
                <Route path="/signup"></Route>
                <Route path="/feature"></Route>
            </Route>
        </Router> */}
    </Provider>
    ,document.querySelector('.container')
);