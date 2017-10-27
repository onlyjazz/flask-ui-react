
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Monitoring extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <strong> Monitoring </strong>
                        </div>
                        <div className="panel-body">
                            Private content of monitoring. 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Monitoring mapSteteToProps', state);
    return ({})
}, null )(Monitoring);

