/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.isFilterable = function (settings) { return settings !== false; };
/**
 * @hidden
 */
exports.hasFilterMenu = function (settings) {
    return typeof settings === 'string' && settings.indexOf('menu') > -1;
};
/**
 * @hidden
 */
exports.hasFilterRow = function (settings) {
    return settings === true || (typeof settings === 'string' && settings.indexOf('row') > -1);
};
