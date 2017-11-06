
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


var links = [{
        name: 'Sites',
        icon: 'fa-list-alt',
        pathname: '/app/sites',
    }, {
        name: 'Users',
        icon: 'fa-users',
        pathname: '/app/users',
    }, {
        name: 'Studies',
        icon: 'fa-graduation-cap',
        pathname: '/app/studies',
    }, {
        name: 'Measures',
        icon: 'fa-line-chart',
        pathname: '/app/measures',
    }, {
        name: 'Monitoring',
        icon: 'fa-eye',
        pathname: '/app/monitoring',
    },
];


function MenuItem ( props, state ) {
    // console.log('MenuItem render => ()'
    //     ,'\n props:', props
    //     ,'\n state:', state
    // );
    return (
        <Link className={(props.active?'active ':'')+'list-group-item'} to={props.pathname} disabled={props.disabled}>
            <i className={props.icon+' fa'} aria-hidden="true"></i> {props.name}
            <span className="badge"> 12 </span>
        </Link>
    );
}



class SideMenu extends Component {
    
    constructor ( props ) {
        super(props);
        
        this.state = {
            short: false,
        };
    }
    
    render() {
        
        var current = new RegExp(this.props.history.location.pathname, 'gi');
        
        console.log('SideMenu render => ()'
            ,'\n props:', this.props
            ,'\n state:', this.state
            ,'\n current:', current
        );
        
        return (
            <div className={(this.state.short ? 'short-menu ':'')+'container-fluid'}>
                <div className="row">
                    <div id="navSideMenu">
                        <div className="nav-side-menu-inner">
                            <div className="list-group nav-menu">
                                <ul className="nav nav-tabs menu-head">
                                    <li className="tab"> 1 </li>
                                    <li className="tab"> 2 </li>
                                </ul>
                                <div className="divider"> main menu </div>
                                { links.map( (link, index) => (<MenuItem { ...link } key={index} active={ current.test(link.pathname) } disabled={false} />) ) }
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

export default withRouter(connect(state => {
    console.log('SideMenu mapSteteToProps', state);
    return ({})
} )(SideMenu));

