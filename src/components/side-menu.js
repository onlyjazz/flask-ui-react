
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { blueGrey900 } from 'material-ui/styles/colors';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';

// local dependencies

// configuration

class SideMenu extends Component {
    
    isActive ( pathname ) {
        return this.props.history.location.pathname === pathname ? 'active' : '';
    }
    
    
    FONTS !!!!!!!!!!!!!!!!!!!!
    
    
    
    menuList () {
        return (
            <ul className="list-unstyled">
                <li className="menu-item"> 
                    <Link className={this.isActive('/app/studies')} to="/app/studies">
                        <i className="material-icons" style={{paddingRight: '7px'}}>dashboard</i>  Studies
                    </Link>
                    <hr/>
                </li>
                <li className="menu-item">
                    <Link className={this.isActive('/app/sites')} to="/app/sites">
                        <ActionDashboard /> Sites
                    </Link>
                    <hr/>
                </li>
            </ul>
        );
    }
        
    render() {
        
        return (
            <div className={(this.props.nav.minify ? 'short-menu ':'')+'container-fluid'}>
                <div className="row">
                    <div id="navSideMenu">
                        <div className="nav-side-menu-inner" style={{backgroundColor: blueGrey900}}>
                            { this.menuList() }
                            {/* <Paper style={{width: '144px', background: 'transparent'}}>
                                <Menu style={{width: '144px', background: 'transparent'}}>
                                    <MenuItem style={itemStyle}>
                                        <ActionInfo />
                                        <Link style={this.isActive('/app/studies')} to="/app/studies"> Studies </Link>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem style={itemStyle}>
                                        <ActionInfo />
                                        <Link style={this.isActive('/app/sites')} to="/app/sites"> Sites </Link>
                                    </MenuItem>
                                    <MenuItem style={itemStyle}>
                                        <ActionInfo />
                                        <Link style={this.isActive('/app/users')} to="/app/users"> Users </Link>
                                    </MenuItem>
                                    <MenuItem style={itemStyle}>
                                        <ActionInfo />
                                        <Link style={this.isActive('/app/measures')} to="/app/measures"> Measures </Link>
                                    </MenuItem>
                                    <MenuItem style={itemStyle}>
                                        <ActionInfo />
                                        <Link style={this.isActive('/app/monitoring')} to="/app/monitoring"> Monitoring </Link>
                                    </MenuItem>
                                    <Divider></Divider>
                                    <MenuItem primaryText="All mail" leftIcon={<ActionInfo />} rightIcon={<ActionInfo />} />
                                </Menu>
                            </Paper> */}
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

export default withRouter(connect( state => ({nav: state.nav }), null)(SideMenu));
