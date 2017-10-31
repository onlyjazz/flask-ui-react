
// aliases for export all services
export { storage } from './storage';
export {
    signin,
    signout,
    refreshSession,
    Axios,
    Axios as axiosInstance
} from './authentification';

// HELPERS
var ts = Object.prototype.toString;
export function isPromise ( data ) {
    return ts.call(data) === '[object Promise]'||(!!data && typeof data['then'] === 'function' );
}
