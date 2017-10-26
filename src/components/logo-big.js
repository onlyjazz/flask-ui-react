
// outsource dependencies
import React from 'react';

// local dependencies
import logo from '../images/flask_data.png';

export default function ( options ) {
    return (
        <div { ... options }>
            <div className="col-xs-6 col-xs-offset-3 indent-1">
                <img className="img-responsive" alt="Flask data" src={logo} />
            </div>
        </div>
    );
}
