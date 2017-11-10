
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
// local dependencies

// configuration

class Private extends Component {
    
    render () {
        
        var { auth } = this.props;
        
        return !auth.ready ? (<div> PRELOADER </div>)
            : auth.authenticated
                ? ( <div>{ this.props.children }</div> )
                : ( <Redirect to={{ pathname: this.props.redirect || '/', state: { from: this.props.location } }}/> );
    }
}

export default withRouter(connect(state =>  ({ auth: state.auth }), null)(Private));
