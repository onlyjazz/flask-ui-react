
// outsource dependencies

// local dependencies
import { is } from '../services';

/*-------------------------------------------------
        PUBLICK
---------------------------------------------------*/
export const SIGN_IN = {
    LINK: linkTo.bind({optional: false}, '/'),
    ROUTE: '/',
};

export const SIGN_UP = {
    LINK: linkTo.bind({optional: false}, '/signup'),
    ROUTE: '/signup',
};

export const FORGOT_PASSWORD = {
    LINK: linkTo.bind({optional: false}, '/signup'),
    ROUTE: '/forgot',
};

/*-------------------------------------------------
        PRIVATE
---------------------------------------------------*/
export const USERS = {
    LINK: linkTo.bind({optional: false}, '/app/users'),
    ROUTE: '/app/users',
};

export const STUDIES = {
    LINK: linkTo.bind({optional: false}, '/app/studies'),
    ROUTE: '/app/studies',
};

export const SITES = {
    LINK: linkTo.bind({optional: false}, '/app/sites'),
    ROUTE: '/app/sites',
};

export const MEASURES = {
    LINK: linkTo.bind({optional: false}, '/app/measures'),
    ROUTE: '/app/measures',
};

export const MONITORING = {
    LINK: linkTo.bind({optional: false}, '/app/monitoring'),
    ROUTE: '/app/monitoring',
};


/**
 * @description prepare link (helper for dinamic link)
 * @example linkTo( LINK_SIGN_IN, {urlOptions} )
 * @param { String } path -
 * @returns { Object | String } options - 
 * @function linkTo
 * @private
 */
function linkTo ( path, optiopns ) {
    var defOpt = this;
    // console.log('linkTo => ( path, optiopns )'
    //     ,'\n path:', path
    //     ,'\n option:', option
    //     ,'\n defOpt:', defOpt
    //     ,'\n res:', null
    // );
    if ( defOpt.optional ) {
        switch ( is.typeof( optiopns ) ) {
            // if options is object
            case 'object':
            
            // if options is string
            break;case 'string':

            break;default: console.warn('linkTo expect OPTIONS to make url for ', path, '\n\t default option is:', defOpt);
        }
    }
    
    return path;
}

