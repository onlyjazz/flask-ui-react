
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SideMenu extends Component {
    
    constructor ( props ) {
        super(props);
        
        this.state = {
            short: false,
        };
    }
    
    render() {
        return (
            <div className={(this.state.short ? 'short-menu ':'')+'container-fluid'}>
                <div className="row">
                    <div id="navSideMenu">
                        <div className="nav-side-menu-inner">
                            <ul>
                                {/* <li onClick={ ()=> this.setState({'short': !this.state.short}) }>
                                    SHORT: { String(this.state.short) }
                                </li> */}
                                <li><Link to="/app/sites"> Sites </Link></li>
                                <li><Link to="/app/users"> Users </Link></li>
                                <li><Link to="/app/studies"> Studies </Link></li>
                                <li><Link to="/app/measures"> Measures </Link></li>
                                <li><Link to="/app/monitoring"> Monitoring </Link></li>
                                <li><Link to="/"> login </Link></li>
                            </ul>
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

