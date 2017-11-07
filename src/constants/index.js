
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
};

export const config = configDev;

export { default as mainMenu } from './nav-main-menu';
export { default as subMenu } from './nav-sub-menu';
export { default as statisticMenu } from './nav-statistic-menu';
