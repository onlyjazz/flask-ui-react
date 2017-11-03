
// outsource dependencies
import React, { Component } from 'react';

// local dependencies

// configuration

class Preloader extends Component {
    render () {
        return !this.props.show
            ? ( <div>{ this.props.children }</div> )
            : ( <div> Preloader </div> );
    }
}

export default Preloader;
