
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

// local dependencies
import defaultAvatar from '../images/default-avatar.png';
import { LogoSmall } from '../components';
import { signout, navMinify, navMaximize } from '../actions';

function loggedUser ( user ) {
    return (
        <ul className="list-unstyled list-inline profile-toggle">
            <li className="avatar">
                <img alt={user.name} src={user.avatar||defaultAvatar} />
            </li>
            <li className="user">
                <div className="name"> {user.name} </div>
                <div className="status"> Admin </div>
            </li>
            <li> <i className="fa fa-caret-down" aria-hidden="true"></i> </li>
        </ul>
    );
}

class Header extends Component {
    render() {
        
        var { nav, auth, navMinify, navMaximize } = this.props;
        
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
                        <ul className="list-inline pull-right">
                            {/* <li className="">
                                <i className="fa fa-bell fa-lg top-indent-2" aria-hidden="true"></i>
                            </li> */}
                            <li className="user-menu">
                                <DropdownButton
                                    id="userMenu"
                                    noCaret={true}
                                    title={loggedUser(auth.user)}
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

export default connect(state => ({nav: state.nav, auth: state.auth}), { signout, navMinify, navMaximize })(Header);
