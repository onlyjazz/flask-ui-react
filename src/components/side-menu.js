
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { blueGrey900 } from 'material-ui/styles/colors';

// local dependencies
import { USERS, STUDIES, SITES, MEASURES, MONITORING } from '../constants/routes';

// configuration

class SideMenu extends Component {
    
    isActive ( pathname ) {
        return this.props.history.location.pathname === pathname ? 'active' : '';
    }
    
    menuList () {
        return (
            <ul className="list-unstyled list-menu">
                <li className="menu-item"> 
                    <Link className={this.isActive( USERS.LINK() )} to={USERS.LINK()}>
                        <i className="material-icons" style={{paddingRight: '7px',fontSize: '22px', paddingBottom: '2px'}}>dashboard</i>  Studies
                    </Link>
                    <hr/>
                </li>
                <li className="menu-item"> 
                    <Link className={this.isActive( SITES.LINK() )} to={SITES.LINK()}>
                        <i className="material-icons" style={{paddingRight: '7px',fontSize: '22px', paddingBottom: '2px'}}>assignment</i>  Sites
                    </Link>
                    <hr/>
                </li>
                <li className="menu-item"> 
                    <Link className={this.isActive( STUDIES.LINK() )} to={STUDIES.LINK()}>
                        <i className="material-icons" style={{paddingRight: '7px',fontSize: '22px', paddingBottom: '2px'}}>people</i>  Users
                    </Link>
                    <hr/>
                </li>
                <li className="menu-item"> 
                    <Link className={this.isActive( MEASURES.LINK() )} to={MEASURES.LINK()}>
                        <i className="material-icons" style={{paddingRight: '7px',fontSize: '22px', paddingBottom: '2px'}}>trending_up</i>  Measures
                    </Link>
                    <hr/>
                </li>
                <li className="menu-item"> 
                    <Link className={this.isActive( MONITORING.LINK() )} to={MONITORING.LINK()}>
                        <i className="material-icons" style={{paddingRight: '7px',fontSize: '22px', paddingBottom: '2px'}}>swap_calls</i>  Monitoring
                    </Link>
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
