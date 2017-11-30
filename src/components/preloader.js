
// outsource dependencies
import React, { Component } from 'react';

// local dependencies

// configuration

class Preloader extends Component {
    render () {
        
        var { type, expectAnswer, children } = this.props;
        
        switch ( type ) {
            default: return expectAnswer ? (<div className="def-preloader">
                <div id="SPW">
                	<div id="SP_1" className="sp"></div> <div id="SP_2" className="sp"></div> <div id="SP_3" className="sp"></div> <div id="SP_4" className="sp"></div>
                    <div id="SP_5" className="sp"></div> <div id="SP_6" className="sp"></div> <div id="SP_7" className="sp"></div> <div id="SP_8" className="sp"></div>
                </div>
            </div>) : ( <div>{ children }</div> );
            
            case 'ICON': return expectAnswer ? (<strong>
                <i className="fa fa-spinner fa-spin fa-fw"></i>
                <span className="sr-only"> Loading... </span>
            </strong>) : (<span>{ children }</span>);
                
        }
    }
}

export default Preloader;
