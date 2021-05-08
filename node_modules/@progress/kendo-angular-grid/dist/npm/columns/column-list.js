/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_common_1 = require("./column-common");
var forEachColumn = function (list, callback) {
    list.forEach(function (column) {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachColumn(column.childrenArray, callback);
        }
    });
};
var ɵ0 = forEachColumn;
exports.ɵ0 = ɵ0;
var forEachLevel = function (list, callback) {
    column_common_1.sortColumns(list)
        .forEach(function (column) {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachLevel(column.childrenArray, callback);
        }
    });
};
var ɵ1 = forEachLevel;
exports.ɵ1 = ɵ1;
var filterHierarchy = function (list, predicate) {
    var result = [];
    column_common_1.sortColumns(list)
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
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
var ColumnList = /** @class */ (function () {
    function ColumnList(columns) {
        this.columns = columns;
    }
    ColumnList.empty = function () {
        return new ColumnList(new core_1.QueryList());
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
exports.ColumnList = ColumnList;
