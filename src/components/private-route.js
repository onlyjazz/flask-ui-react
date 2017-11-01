
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

// local dependencies


// override to understandable view of code
class PrivateRoute extends Component {
    
    // componentWillUnmount () { // pre - destroy of component
    //     console.log('PrivateRoute componentWillMount => ()'
    //         ,'\n contenxt:', this.contenxt
    //         ,'\n state:', this.state
    //         ,'\n props:', this.props
    //         ,'\n refs:', this.refs
    //         ,'\n this:', this
    //     );
    // }
    
    componentWillMount () { // pre - render of component
        var { auth } = this.props;
        this.allow = auth.authenticated;
    }
    
    render () {
        
        // allow flag to pass to the private routes
        var { auth } = this.props;
        
        console.log('PrivateRoute componentWillMount => ()'
            ,'\n contenxt:', this.contenxt
            ,'\n state:', this.state
            ,'\n props:', this.props
            ,'\n refs:', this.refs
            ,'\n auth:', auth
        );
        // render component
        // return auth.authenticated
        return true
            ? ( <Route { ... this.props } ></Route> )
            : ( <Redirect to={{ pathname: '/', state: { from: this.props.location } }}/> );
    }
}

// export default connect( ( state ) => ({authenticated: state.authenticated}) )(PrivateRoute);
export default connect(state =>  ({ auth: state.auth }), null)(PrivateRoute)
