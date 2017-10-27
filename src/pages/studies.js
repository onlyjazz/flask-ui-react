
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Studies extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <strong> Studies </strong>
                        </div>
                        <div className="panel-body">
                            Private content. 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Studies mapSteteToProps', state);
    return ({})
}, null )(Studies);

