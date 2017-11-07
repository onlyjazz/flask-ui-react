
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Sites extends Component {
    render() {
        return (
            <div className="row">
                <div className="panel panel-default no-radius">
                    <div className="panel-heading">
                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                        <strong> Sites </strong>
                    </div>
                </div>
                <div className="col-xs-12">
                    Private content with sites lists.
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Sites mapSteteToProps', state);
    return ({})
}, null )(Sites);

