
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// local dependencies
// configuration

class Private extends Component {
    
    // componentWillMount () {
    //     if ( !this.props.authenticated ) {
    // 
    //     }
    // }
    // 
    // componentWillUpdate ( nextProps ) {
    //     if ( !nextProps.authenticated ) {
    // 
    //     }
    // }
    
    render () {
        return this.props.auth.authenticated
            ? ( <div>{ this.props.children }</div> )
            : ( <Redirect to={{ pathname: this.props.redirect || '/', state: { from: this.props.location } }}/> );
    }
}

export default connect(state =>  ({ auth: state.auth }), null)(Private);
