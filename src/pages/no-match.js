
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// local dependencies
import { SIGN_IN } from '../constants/routes';

class NoMatch extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3 className="col-xs-10 col-xs-offset-1 text-center top-indent-4">
                         No match for
                         <code> { this.props.location.pathname } </code>
                         <hr/>
                         <Link className="btn btn-primary" to={SIGN_IN.LINK()}> Sign In </Link>
                    </h3>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    console.log('NoMatch mapSteteToProps', state);
    return ({})
} )(NoMatch);
