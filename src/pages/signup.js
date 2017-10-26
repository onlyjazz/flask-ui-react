
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Signup extends Component {
    render() {
        return (
            <div>
                Sign UP
            </div>
        );
    }
}

export default connect(state => {
    console.log('Signup mapSteteToProps', state);
    return ({ authenticated: false })
} )(Signup);
