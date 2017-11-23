
// configuration parameters for all application
// const configLocal = {
//     DEBUG: true,
//     production: false,
//     apiPath: 'http://localhost:8000',
// };

const configDev = {
    DEBUG: true,
    production: false,
    apiPath: 'http://flask.clearclinica.dev.dfusiontech.com:19080',
    graphQlPath: 'http://flask.clearclinica.dev.dfusiontech.com:5004',
    
};

export const config = configDev;

