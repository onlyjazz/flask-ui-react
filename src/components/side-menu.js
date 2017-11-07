
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// local dependencies
import { navChangeMenu } from '../actions';
import { mainMenu } from '../constants';
import { subMenu } from '../constants';
import { statisticMenu } from '../constants';

class SideMenu extends Component {
    
    menuTabs () {
        
        var { nav, navChangeMenu } = this.props;
        
        return (
            <div className="btn-group menu-head">
                <button
                    type="button"
                    onClick={()=> nav.tabIndex!==0&&navChangeMenu(0, mainMenu) }
                    className={'btn tab'+(nav.tabIndex===0 ? ' active' : '')}
                        >
                    <i className="fa fa-th-list" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    onClick={()=> nav.tabIndex!==1&&navChangeMenu(1, subMenu) }
                    className={'btn tab'+(nav.tabIndex===1 ? ' active' : '')}
                        >
                    <i className="fa fa-columns" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    onClick={()=> nav.tabIndex!==2&&navChangeMenu(2, statisticMenu) }
                    className={'btn tab'+(nav.tabIndex===2 ? ' active' : '')}>
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                </button>
            </div>
        );
    }
    
    menuList ( list ) {
        var current = this.props.history.location.pathname,
            menu = [],
            key = 0;
        
        for ( ; key < list.length; key ++ ) {
            var { divider, link, name, pathname, icon, matcher, disabled } = list[key];
            if ( divider ) {
                menu.push( <div key={key} className="divider"> { name } </div> );
            }
            
            if ( link ) {
                var linkClassName = '';
                if ( matcher && (new RegExp(matcher, 'gi')).test(current) ) {
                    linkClassName+=' active';
                }
                disabled&&(linkClassName+=' disabled');
                menu.push(
                    <Link key={key} className={'list-group-item'+linkClassName} to={disabled?current:pathname} >
                        <i className={icon+' fa'} aria-hidden="true"></i> {name}
                        <span className="badge"> 12 </span>
                    </Link>
                );
            }
        }
        return menu;
    }
    
    render() {
        
        return (
            <div className={(this.props.nav.minify ? 'short-menu ':'')+'container-fluid'}>
                <div className="row">
                    <div id="navSideMenu">
                        <div className="nav-side-menu-inner">
                            <div className="list-group nav-menu">
                                { this.menuTabs() }
                                { this.menuList( this.props.nav.menu ) }
                            </div>
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

export default withRouter(connect(
    state => ({nav: state.nav }),
    {navChangeMenu}
)(SideMenu));

