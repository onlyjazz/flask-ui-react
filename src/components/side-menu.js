
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

class SideMenu extends Component {
    render() {
        return (
            <div>
                SideMenu
            </div>
        );
    }
}

export default connect(state => {
    console.log('SideMenu mapSteteToProps', state);
    return ({})
} )(SideMenu);
