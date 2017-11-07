
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Studies extends Component {
    render() {
        return (
            <div className="row">
                <div className="panel panel-default no-radius">
                    <div className="panel-heading">
                        <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        <strong> Studies </strong>
                    </div>
                </div>
                <div className="col-xs-12">
                    Private content with study lists.
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Studies mapSteteToProps', state);
    return ({})
}, null )(Studies);

