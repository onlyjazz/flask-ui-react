
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

// local dependencies
import { LogoSmall } from '../components';
import { signout } from '../actions';

class Header extends Component {
    render() {
        return (
            <header id="header" className="container-fluid">
                <div className="row header-inner">
                    <div className="col-xs-2 col-sm-1 text-center hidden-xs">
                        <LogoSmall className="header-logo top-indent-2" to="/app" />
                    </div>
                    
                    <div className="col-xs-2 col-sm-1 visible-xs navbar-inverse">
                        <button type="button" className="navbar-toggle">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    
                    <div className="col-xs-10 col-sm-11">
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

export default connect(state => ({}), { signout })(Header);