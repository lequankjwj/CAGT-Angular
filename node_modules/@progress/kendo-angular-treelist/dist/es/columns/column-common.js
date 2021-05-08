/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isSpanColumnComponent } from "./span-column.component";
import { isNullOrEmptyString, isTruthy } from "../utils";
import { orderBy } from '@progress/kendo-data-query';
/**
 * @hidden
 */
export var expandColumns = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(isSpanColumnComponent(column) ? column.childrenArray : [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
export var expandColumnsWithSpan = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(isSpanColumnComponent(column) ?
    [column].concat(column.childrenArray) :
    [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
export var columnsToRender = function (columns) { return (expandColumns(columns).filter(function (x) { return x.isVisible; })); };
var sumProp = function (prop) { return function (array) {
    return (array || []).reduce(function (prev, curr) { return prev + (curr[prop] || 0); }, 0);
}; };
var ɵ0 = sumProp;
/**
 * @hidden
 */
export var sumColumnWidths = sumProp('width');
/**
 * @hidden
 */
export var columnsSpan = sumProp('colspan');
// tslint:disable-next-line:max-line-length
var validField = new RegExp("^[$A-Z_a-z][$A-Z_a-z0-9\\.]*$");
/**
 * @hidden
 */
export var isValidFieldName = function (fieldName) {
    return !isNullOrEmptyString(fieldName) && validField.test(fieldName) &&
        fieldName[0] !== "." && fieldName[fieldName.length - 1] !== ".";
};
/**
 * @hidden
 */
export var children = function (column) { return column.children.filter(function (child) { return child !== column; }); };
/**
 * @hidden
 */
export var leafColumns = function (columns) {
    return columns.reduce(function (acc, column) {
        if (column.isColumnGroup) {
            acc = acc.concat(leafColumns(children(column)));
        }
        else if (column.isSpanColumn) {
            acc = acc.concat(column.childrenArray);
        }
        else {
            acc.push(column);
        }
        return acc;
    }, []).filter(function (x) { return x.isVisible; }); // tslint:disable-line:align
};
/**
 * @hidden
 */
export var someLeafColumn = function (callback) {
    var columns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        columns[_i - 1] = arguments[_i];
    }
    return leafColumns(columns).some(callback);
};
/**
 * @hidden
 */
export var resizableColumns = function (columns) { return columns.filter(function (column) { return isTruthy(column.resizable) && column.isVisible; }); };
/**
 * @hidden
 */
export var sortColumns = function (columns) {
    return orderBy(columns, [{ field: 'orderIndex', dir: 'asc' }]);
};
/**
 * @hidden
 */
export var isInSpanColumn = function (column) {
    return isTruthy(column.parent) && isSpanColumnComponent(column.parent);
};
export { ɵ0 };
