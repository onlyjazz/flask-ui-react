
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Monitoring extends Component {
    render() {
        return (
            <div className="row">
                <div className="panel panel-default no-radius">
                    <div className="panel-heading">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <strong> Monitoring </strong>
                    </div>
                </div>
                <div className="col-xs-12">
                    Private content with monitoring.
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Monitoring mapSteteToProps', state);
    return ({})
}, null )(Monitoring);

