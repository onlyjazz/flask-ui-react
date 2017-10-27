
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';

// local dependencies

class Users extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <strong> Users </strong>
                        </div>
                        <div className="panel-body">
                            Private content with user lists. 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('Users mapSteteToProps', state);
    return ({})
}, null )(Users);
