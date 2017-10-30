
// outsource dependencies

// local dependencies
import { DATA_PAGE_CHANGE } from './types';

export function pageChange ( url ) {

    return {
        type: DATA_PAGE_CHANGE,
        url,
    }
}
