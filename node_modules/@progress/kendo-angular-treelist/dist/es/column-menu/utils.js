/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export var hasFilter = function (settings, column) { return settings.filter !== false && column.field && column.filterable; };
/**
 * @hidden
 */
export var hasSort = function (settings, column) { return settings.sort !== false && column.field && column.sortable; };
/**
 * @hidden
 */
export var hasLock = function (settings, column) {
    return settings.lock && column.lockable && !(column.parent && !column.parent.isSpanColumn);
};
/**
 * @hidden
 */
export var hasColumnChooser = function (settings) { return settings.columnChooser !== false; };
/**
 * @hidden
 */
export var hasItems = function (settings, column) {
    return hasColumnChooser(settings) || hasLock(settings, column) || hasSort(settings, column) || hasFilter(settings, column);
};
