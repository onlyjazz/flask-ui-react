
// outsource dependencies
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
// local dependencies

import { Preloader } from '../components';
// configuration

class Private extends Component {
    constructor ( props ) {
        super(props);
        this.state = { reload: true };
    }
    render () {
        var { auth } = this.props;
        // if ( !auth.ready ) {
        //     // console.log('Private render () =>'
        //     //     ,'\n\t auth:', this.props.auth
        //     // );
        //     setTimeout(()=> {
        //         // console.log('Private render reload () =>'
        //         //     ,'\n\t auth:', this.props.auth
        //         // );
        //         this.setState({reload: !this.state.reload})
        //     }, 0.5*1000);
        // }
        return (
            <Preloader expectAnswer={!auth.ready}> {
                auth.authenticated
                ? ( <div>{ this.props.children }</div> )
                : ( <Redirect to={{ pathname: this.props.redirect || '/', state: { from: this.props.location } }}/> )
            } </Preloader>
        );
        
    }
}

export default withRouter(connect(state =>  ({ auth: state.auth }), null)(Private));
