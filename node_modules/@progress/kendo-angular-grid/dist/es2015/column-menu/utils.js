/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export const hasFilter = (settings, column) => settings.filter !== false && column.field && column.filterable;
/**
 * @hidden
 */
export const hasSort = (settings, column) => settings.sort !== false && column.field && column.sortable;
/**
 * @hidden
 */
export const hasLock = (settings, column) => settings.lock && column.lockable && !(column.parent && !column.parent.isSpanColumn);
/**
 * @hidden
 */
export const hasColumnChooser = (settings) => settings.columnChooser !== false;
/**
 * @hidden
 */
export const hasItems = (settings, column) => hasColumnChooser(settings) || hasLock(settings, column) || hasSort(settings, column) || hasFilter(settings, column);
