// eslint-disable import/first

// outsource dependencies
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


// STYLES inject ...
import './style';

// local dependencies
import Root from './pages/index';
import reducers from './reducers';

// configuration
// NOTE: this API requires redux@>=3.1.0
var store = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store} >
        <Root />
    </Provider>
    ,
    document.getElementById('root')
);
