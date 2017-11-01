
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

// local dependencies


// override to understandable view of code
class PrivateRoute extends Component {
        
    render () {
        
        // allow flag to pass to the private routes
        var { auth } = this.props;

        // render component
        return auth.authenticated
        // return true
            ? ( <Route { ... this.props } ></Route> )
            : ( <Redirect to={{ pathname: '/', state: { from: this.props.location } }}/> );
    }
}

// export default connect( ( state ) => ({authenticated: state.authenticated}) )(PrivateRoute);
export default connect(state =>  ({ auth: state.auth }), null)(PrivateRoute)
