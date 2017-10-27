
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
    
    // componentWillMount () { // pre - render of component
    //     console.log('PrivateRoute componentWillMount => ()'
    //         ,'\n contenxt:', this.contenxt
    //         ,'\n state:', this.state
    //         ,'\n props:', this.props
    //         ,'\n refs:', this.refs
    //         ,'\n this:', this
    //     );
    // }
    
    render () {
        console.log('PrivateRoute render => ()'
            ,'\n contenxt:', this.contenxt
            ,'\n state:', this.state
            ,'\n props:', this.props
            ,'\n refs:', this.refs
        );
        
        // allow flag to pass to the private routes
        var allow = this.props.authenticated;
        // render component
        return allow ? ( <Route { ... this.props } ></Route> )
            : ( <Redirect to={{ pathname: '/', state: { from: this.props.location } }}/> );
    }
}

// export default connect( ( state ) => ({authenticated: state.authenticated}) )(PrivateRoute);
export default connect(state => {
    console.log('PrivateRoute mapSteteToProps', state);
    // return ({ authenticated: !!state.authenticated })
    return ({ authenticated: !!state.authenticated })
}, null)(PrivateRoute)
