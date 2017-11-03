/* eslint no-useless-escape: "off" */

// local storage API
var localStorage = window.localStorage;

// emulation of local storage on cookies
var cookieStorage = { // polifil from MDN https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
    length: (document.cookie.match(/\=/g)||localStorage).length,
    getItem: function (sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) {
        return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
        this.length = document.cookie.match(/\=/g).length;
    },
    removeItem: function (sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        this.length--;
    },
    hasOwnProperty: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
};

// on private browsing Safari does not allow local storage to be used at all
var ok = true;
try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
} catch ( e ) { ok = false; }

export const storage = {
    isEmulation: !ok,
    localStorage: localStorage,
    cookieStorage: cookieStorage,
    /**
     * @description synchronize data between localStorage and cookies storage
     * @example almStorage.sync(['auth', 'language', 'stateBack']);
     * @param { Array } list of fild names
     * @function almStorage.sync
     * @public
     */
    sync: function syncItemList ( list ) {
        for ( var key = 0, fieldName, data; ok&&list&&(key < list.length); key++ ) {
            fieldName = list[key];
            data = cookieStorage.getItem(fieldName);
            if ( data ) {
                localStorage.setItem(fieldName, data);
            } else {
                data = localStorage.getItem(fieldName);
                data&&cookieStorage.setItem(fieldName, data);
            }
        }
    },

    /**
     * @description before get item convert it from JSON format
     * @param { String } name - name of item
     * @returns { Any }
     * @function almStorage.get
     * @public
     */
    get: function getItem ( name ) {
        var data = (ok ? localStorage : cookieStorage).getItem( name );
        try { return JSON.parse( data );
        } catch ( e ) { return null; }
    },
    /**
     * @description clear value by name
     * @param { String } name - name of item
     * @function almStorage.set
     * @public
     */
    remove: function removeItem ( name ) {
        ok&&localStorage.removeItem(name);
        cookieStorage.removeItem(name);
    },

    /**
     * @description before set item convert it to JSON
     * @param { String } name - name of item
     * @param { Any } data - data by rules convertion to json format
     * @function almStorage.set
     * @public
     */
    set: function setItem ( name, data ) {
        data = JSON.stringify(data);
        this.remove(name);
        ok&&localStorage.setItem( name, data );
        cookieStorage.setItem( name, data );
    }
};
