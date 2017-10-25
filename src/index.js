
// outsource dependencies
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// local dependencies
import './style/all.css';
import reducers from './reducers';

// configuration
// Note: this API requires redux@>=3.1.0
// var store = createStore(
//   reducers,
//   applyMiddleware(thunk)
// );

var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
console.log('root', document.getElementById('root'));
ReactDOM.render(
    <p> Its will be Flask admin application </p>
    // <Provider store={ createStoreWithMiddleware(reducers) }>
    // <Provider store={ createStore(reducers, applyMiddleware(thunk) ) }>
    //     <Router history={ browserHistory }>
    //         <Route path="/" component={ App }>
    //             <Route path="/signin" component={ SignIn }></Route>
    //             <Route path="/signup"></Route>
    //             <Route path="/feature"></Route>
    //         </Route>
    //     </Router>
    // </Provider>
    ,
    document.getElementById('root')
);