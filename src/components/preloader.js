
// outsource dependencies
import React, { Component } from 'react';

// local dependencies

// configuration

class Preloader extends Component {
    render () {
        
        var { type, expectAnswer, children } = this.props;
        
        switch ( type ) {
            default: return expectAnswer ? ( <div> Preloader </div> ) : ( <div>{ children }</div> );
            
            case 'ICON': return expectAnswer ? (<strong>
                <i className="fa fa-spinner fa-spin fa-fw"></i>
                <span className="sr-only"> Loading... </span>
            </strong>) : (<span>{ children }</span>);
                
        }
    }
}

export default Preloader;
