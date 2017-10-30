
// outsource dependencies

// local dependencies
import { DATA_PAGE_CHANGE } from './types';

export function pageChange ( location ) {

    return {
        type: DATA_PAGE_CHANGE,
        location,
    }
}
