
// outsource dependencies

// local dependencies
import { NAV_MINIFY, NAV_MAXIMIZE, NAV_CHANGE_MENU } from './types';
import { mainMenu } from '../constants';
import { subMenu } from '../constants';
import { statisticMenu } from '../constants';

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

export function navShowMainMenu () {
    return navChangeMenu(0, mainMenu);
}

export function navShowSubMenu () {
    return navChangeMenu(1, subMenu);
}

export function navShowStatistic () {
    return navChangeMenu(2, statisticMenu);
}

export function navChangeMenu ( tabIndex, menu ) {
    return {
        type: NAV_CHANGE_MENU,
        tabIndex,
        menu,
    }
}
