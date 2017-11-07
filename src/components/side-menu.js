
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


var links = [{
        name: 'Sites',
        icon: 'fa-list-alt',
        pathname: '/app/sites',
        isActive: /sites/gi,
    }, {
        name: 'Users',
        icon: 'fa-users',
        pathname: '/app/users',
        isActive: /users/gi,
    }, {
        name: 'Studies',
        icon: 'fa-graduation-cap',
        pathname: '/app/studies',
        isActive: /studies/gi,
    }, {
        name: 'Measures',
        icon: 'fa-line-chart',
        pathname: '/app/measures',
        isActive: /measures/gi,
    }, {
        name: 'Monitoring',
        icon: 'fa-eye',
        pathname: '/app/monitoring',
        isActive: /monitoring/gi,
    },
];


function MenuItem ( props, state ) {
    // console.log('MenuItem render => ()'
    //     ,'\n props:', props
    //     ,'\n state:', state
    // );
    var to = props.name;
    var linkClassName = 'list-group-item';
    if ( props.isActive.test(props.current) ) {
        linkClassName+=' active';
    }
    if ( props.disabled ) {
        linkClassName+=' disabled';
        to = props.current;
    }
    
    return (
        <Link className={linkClassName} to={to} >
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
        
        // console.log('SideMenu render => ()'
        //     ,'\n props:', this.props
        //     ,'\n state:', this.state
        //     ,'\n current:', current
        // );
        
        return (
            <div className={(this.state.short ? 'short-menu ':'')+'container-fluid'}>
                <div className="row">
                    <div id="navSideMenu">
                        <div className="nav-side-menu-inner">
                            <div className="list-group nav-menu">
                                <div className="btn-group menu-head">
                                    <button type="button" className="btn tab" disabled>
                                        <i className="fa fa-th-list" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className="btn tab active">
                                        <i className="fa fa-columns" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" className="btn tab">
                                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className="divider"> main menu </div>
                                {links.map( (link, index) => (<MenuItem key={index} {...link} disabled={index == 2} current={this.props.history.location.pathname} />) )}
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

