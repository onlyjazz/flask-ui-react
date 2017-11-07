
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

// local dependencies
import { LogoSmall } from '../components';
import { signout, navMinify, navMaximize } from '../actions';

class Header extends Component {
    render() {
        
        var { nav, navMinify, navMaximize } = this.props;
        
        // console.log('Header reducer => ()'
        //     ,'\n props:', this.props
        //     ,'\n state:', this.state
        //     ,'\n nav:', nav
        // );
        
        return (
            <header id="header" className="container-fluid">
                <div className="row header-inner">
                    
                    <div className="col-xs-5">
                        <LogoSmall className="header-logo" to="/app/users" />
                        <button
                            type="button"
                            className={'header-toggle'+(nav.minify?' active':'')}
                            onClick={()=> nav.minify?navMaximize():navMinify() }
                                >
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </button>
                    </div>
                    
                    <div className="col-xs-7">
                        <ul className="list-inline pull-right top-indent-1">
                            <li className="notify-bell">
                                <i className="fa fa-bell fa-lg" aria-hidden="true"></i>
                            </li>
                            <li className="user-menu">
                                <DropdownButton
                                    id="userMenu"
                                    noCaret={true}
                                    bsStyle="primary"
                                    title={(<i className="fa fa-bars" aria-hidden="true"></i>)}
                                        >
                                    <MenuItem>Action</MenuItem>
                                    <MenuItem>Another action</MenuItem>
                                    <MenuItem>Active Item</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem onClick={this.props.signout}> Log Out </MenuItem>
                                </DropdownButton>
                            </li>
                        </ul>
                    </div>
                </div>
			</header>
        );
    }
}

export default connect(state => ({nav: state.nav}), { signout, navMinify, navMaximize })(Header);