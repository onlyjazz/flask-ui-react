
// outsource dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// local dependencies
import logo from '../images/logo.png';

export default function ( options ) {
    return (
        <Link className="small-logo" { ... options }>
            <img className="img-responsive" alt="Flask data" src={logo} />
        </Link>
    );
}