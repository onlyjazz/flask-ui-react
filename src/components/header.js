
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                Header
            </div>
        );
    }
}

export default connect(state => {
    console.log('Header mapSteteToProps', state);
    return ({})
} )(Header);