/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.hasFilter = function (settings, column) { return settings.filter !== false && column.field && column.filterable; };
/**
 * @hidden
 */
exports.hasSort = function (settings, column) { return settings.sort !== false && column.field && column.sortable; };
/**
 * @hidden
 */
exports.hasLock = function (settings, column) {
    return settings.lock && column.lockable && !(column.parent && !column.parent.isSpanColumn);
};
/**
 * @hidden
 */
exports.hasColumnChooser = function (settings) { return settings.columnChooser !== false; };
/**
 * @hidden
 */
exports.hasItems = function (settings, column) {
    return exports.hasColumnChooser(settings) || exports.hasLock(settings, column) || exports.hasSort(settings, column) || exports.hasFilter(settings, column);
};
