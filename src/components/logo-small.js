
// outsource dependencies
import React from 'react';

// local dependencies
import logo from '../images/logo.png';

export default function ( options ) {
    return (
        <div { ... options }>
            <div className="col-xs-10 col-xs-offset-12 indent-1">
                <img className="img-responsive" alt="Flask data" src={logo} />
            </div>
        </div>
    );
}