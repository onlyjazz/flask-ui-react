
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Measures extends Component {
    render() {
        return (
            <div className="row">
                <div className="panel panel-default no-radius">
                    <div className="panel-heading">
                        <i className="fa fa-line-chart" aria-hidden="true"></i>
                        <strong> Measures </strong>
                    </div>
                </div>
                <div className="col-xs-12">
                    Private content with measures lists.
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Measures mapSteteToProps', state);
    return ({})
}, null )(Measures);

