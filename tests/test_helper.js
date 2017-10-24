import jsdom from 'jsdom';
import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// fake DOM for console
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = jquery(window);

/**
 * 
 * @param { Classs } componentClass
 * @param { Object } prop
 * @param { Object } stete
 * @returns { Component }
 * @function renderComponent
 * @public
 */
function renderComponent ( ComponentClass, props = {}, state = {} ) {
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store = { createStore(reducers, state) }>
            <ComponentClass {...props} />
        </Provider>
    );

    return $(ReactDOM.findDOMNode(componentInstance));
}

// connect JQuery chai 
chaiJquery(chai, chai.util, $);

// simulate helper
$.fn.simulate = function ( eventName, value ) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
