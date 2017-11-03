
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// local dependencies

// configuration

class Private extends Component {
    
    render () {
        
        var { auth } = this.props;
        
        if ( auth.ready ) {
            return auth.authenticated
                ? ( <div>{ this.props.children }</div> )
                : ( <Redirect to={{ pathname: this.props.redirect || '/', state: { from: this.props.location } }}/> );
        } else return (
            <div> PRELOADER </div>
        );
    }
}

export default connect(state =>  ({ auth: state.auth }), null)(Private);
