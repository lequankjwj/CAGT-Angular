/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList } from '@angular/core';
import { sortColumns } from './column-common';
var forEachColumn = function (list, callback) {
    list.forEach(function (column) {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachColumn(column.childrenArray, callback);
        }
    });
};
var ɵ0 = forEachColumn;
var forEachLevel = function (list, callback) {
    sortColumns(list)
        .forEach(function (column) {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachLevel(column.childrenArray, callback);
        }
    });
};
var ɵ1 = forEachLevel;
var filterHierarchy = function (list, predicate) {
    var result = [];
    sortColumns(list)
        .forEach(function (column) {
        if (predicate(column)) {
            if (column.isColumnGroup) {
                var children = filterHierarchy(column.childrenArray, predicate);
                if (children.length) {
                    result.push.apply(result, [column].concat(children));
                }
            }
            else if (!column.isSpanColumn || filterHierarchy(column.childrenArray, predicate).length) {
                result.push(column);
            }
        }
    });
    return result;
};
var ɵ2 = filterHierarchy;
/**
 * @hidden
 */
var ColumnList = /** @class */ (function () {
    function ColumnList(columns) {
        this.columns = columns;
    }
    ColumnList.empty = function () {
        return new ColumnList(new QueryList());
    };
    ColumnList.prototype.forEach = function (callback) {
        forEachColumn(this.columns, callback);
    };
    ColumnList.prototype.filter = function (callback) {
        var result = [];
        forEachColumn(this.columns, function (column) {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    };
    ColumnList.prototype.filterHierarchy = function (predicate) {
        return filterHierarchy(this.columns.toArray(), predicate);
    };
    ColumnList.prototype.filterSort = function (callback) {
        var result = [];
        forEachLevel(this.columns.toArray(), function (column) {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    };
    ColumnList.prototype.toArray = function () {
        var result = [];
        forEachColumn(this.columns, function (column) {
            result.push(column);
        });
        return result;
    };
    ColumnList.prototype.rootColumns = function () {
        return this.columns.toArray();
    };
    return ColumnList;
}());
export { ColumnList };
export { ɵ0, ɵ1, ɵ2 };
