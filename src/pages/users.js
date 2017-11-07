
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Users extends Component {
    render() {
        return (
            <div className="row">
                <div className="panel panel-default no-radius">
                    <div className="panel-heading">
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <strong> Users </strong>
                    </div>
                </div>
                <div className="col-xs-12">
                    Private content with user lists.
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Users mapSteteToProps', state);
    return ({})
}, null )(Users);
