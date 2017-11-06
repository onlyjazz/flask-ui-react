
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideMenu extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div id="navSideMenu">
                        <div className="nav-side-menu-inner">
                            nav-side-menu-inner
                        </div>
                    </div>
                    <div id="navContent">
                        <div className="nav-content-inner">
                            <div className="container-fluid"> { this.props.children } </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('SideMenu mapSteteToProps', state);
    return ({})
} )(SideMenu);