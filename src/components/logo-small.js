
// outsource dependencies
import React from 'react';

// local dependencies
import logo from '../images/logo.png';

export default function ( options ) {
    return (
        <div { ... options }>
            <img className="img-responsive" alt="Flask data" src={logo} />
        </div>
    );
}