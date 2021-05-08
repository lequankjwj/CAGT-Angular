/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export var isFilterable = function (settings) { return settings !== false; };
/**
 * @hidden
 */
export var hasFilterMenu = function (settings) {
    return typeof settings === 'string' && settings.indexOf('menu') > -1;
};
/**
 * @hidden
 */
export var hasFilterRow = function (settings) {
    return settings === true || (typeof settings === 'string' && settings.indexOf('row') > -1);
};
