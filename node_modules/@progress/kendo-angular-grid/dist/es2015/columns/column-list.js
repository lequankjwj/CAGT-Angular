/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList } from '@angular/core';
import { sortColumns } from './column-common';
const forEachColumn = (list, callback) => {
    list.forEach((column) => {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachColumn(column.childrenArray, callback);
        }
    });
};
const ɵ0 = forEachColumn;
const forEachLevel = (list, callback) => {
    sortColumns(list)
        .forEach((column) => {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachLevel(column.childrenArray, callback);
        }
    });
};
const ɵ1 = forEachLevel;
const filterHierarchy = (list, predicate) => {
    const result = [];
    sortColumns(list)
        .forEach((column) => {
        if (predicate(column)) {
            if (column.isColumnGroup) {
                const children = filterHierarchy(column.childrenArray, predicate);
                if (children.length) {
                    result.push(column, ...children);
                }
            }
            else if (!column.isSpanColumn || filterHierarchy(column.childrenArray, predicate).length) {
                result.push(column);
            }
        }
    });
    return result;
};
const ɵ2 = filterHierarchy;
/**
 * @hidden
 */
export class ColumnList {
    constructor(columns) {
        this.columns = columns;
    }
    static empty() {
        return new ColumnList(new QueryList());
    }
    forEach(callback) {
        forEachColumn(this.columns, callback);
    }
    filter(callback) {
        const result = [];
        forEachColumn(this.columns, (column) => {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    }
    filterHierarchy(predicate) {
        return filterHierarchy(this.columns.toArray(), predicate);
    }
    filterSort(callback) {
        const result = [];
        forEachLevel(this.columns.toArray(), (column) => {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    }
    toArray() {
        const result = [];
        forEachColumn(this.columns, (column) => {
            result.push(column);
        });
        return result;
    }
    rootColumns() {
        return this.columns.toArray();
    }
}
export { ɵ0, ɵ1, ɵ2 };
