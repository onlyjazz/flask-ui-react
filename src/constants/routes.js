
// outsource dependencies

// local dependencies
import { is } from '../services';

/*-------------------------------------------------
        PUBLICK
---------------------------------------------------*/
export const SIGN_IN = {
    LINK: linkTo.bind({url: ()=> (`/`)}),
    ROUTE: '/',
};

export const SIGN_UP = {
    LINK: linkTo.bind({url: ()=> (`/signup`)}),
    ROUTE: '/signup',
};

export const FORGOT_PASSWORD = {
    LINK: linkTo.bind({url: ()=> (`/forgot`)}),
    ROUTE: '/forgot',
};

/*-------------------------------------------------
        PRIVATE
---------------------------------------------------*/
export const USERS = {
    LINK: linkTo.bind({url: ()=> (`/app/users`)}),
    ROUTE: '/app/users',
};

export const STUDIES = {
    LINK: linkTo.bind({url: ()=> (`/app/studies`)}),
    ROUTE: '/app/studies',
};

export const SITES = {
    LINK: linkTo.bind({url: ()=> (`/app/sites`)}),
    ROUTE: '/app/sites',
};

export const MEASURES = {
    LINK: linkTo.bind({url: ()=> (`/app/measures`)}),
    ROUTE: '/app/measures',
};

export const MESURE_EDIT = {
    LINK: linkTo.bind({url: ({id})=> (`/app/measure/${id}`)}),
    ROUTE: '/app/measure/:id',
};


export const MONITORING = {
    LINK: linkTo.bind({ url: () => (`/app/monitoring`)}),
    ROUTE: '/app/monitoring',
};


/**
 * @description prepare link (helper for dinamic link)
 * @example MESURE_EDIT.LINK({id: 4})
 * @param { Object } options -
 * @returns { String } 
 * @function linkTo
 * @private
 */
function linkTo ( options ) {
    var def = this;
    // console.log('linkTo => ( path, optiopns )'
    //     ,'\n def:', def
    //     ,'\n option:', optiopns
    // )
    var opt = {}; // prepare options to setting in url
    for ( var key in options ) if ( is.string(options[key]) || is._number(options[key]) ) {
        opt[key] = encodeURIComponent(options[key]);
    }
    
    return def.url(opt);
}

