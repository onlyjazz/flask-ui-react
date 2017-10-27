
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <strong> Header </strong>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Header mapSteteToProps', state);
    return ({})
} )(Header);