
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
                App
            </div>
        );
    }
}

export default connect(state => {
    console.log('App mapSteteToProps', state);
    return ({ authenticated: false })
} )(App);
