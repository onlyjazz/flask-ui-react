
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideMenu extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <strong> SideMenu </strong>
                        </div>
                        <div className="panel-body">
                            <ul>
                                <li><Link to="/app/sites"> Sites </Link></li>
                                <li><Link to="/app/users"> Users </Link></li>
                                <li><Link to="/app/studies"> Studies </Link></li>
                                <li><Link to="/app/measures"> Measures </Link></li>
                                <li><Link to="/app/monitoring"> Monitoring </Link></li>
                                <li><Link to="/"> login </Link></li>
                            </ul>
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