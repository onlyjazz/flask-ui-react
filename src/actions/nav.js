
// outsource dependencies

// local dependencies
import { NAV_MINIFY, NAV_MAXIMIZE } from './types';

export function navMinify () {
    return {
        type: NAV_MINIFY,
    }
}

export function navMaximize () {
    return {
        type: NAV_MAXIMIZE,
    }
}
