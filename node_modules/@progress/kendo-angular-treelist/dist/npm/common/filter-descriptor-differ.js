/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var areDifferent = function (a, b) {
    return a.field !== b.field || a.operator !== b.operator || a.value !== b.value;
};
var ɵ0 = areDifferent;
exports.ɵ0 = ɵ0;
var isChanged = function (a, b) {
    if (a.length !== b.length) {
        return true;
    }
    for (var idx = 0, len = a.length; idx < len; idx++) {
        var prev = a[idx];
        var curr = b[idx];
        if (kendo_data_query_1.isCompositeFilterDescriptor(prev)) {
            // tslint:disable-next-line:no-use-before-declare
            if (exports.diffFilters(prev, curr[idx])) {
                return true;
            }
        }
        else if (areDifferent(prev, curr)) {
            return true;
        }
    }
    return false;
};
var ɵ1 = isChanged;
exports.ɵ1 = ɵ1;
var copyObject = function (obj) {
    var result = {};
    Object.assign(result, obj);
    if (obj.constructor !== Object) {
        var proto_1 = obj.constructor.prototype;
        Object.getOwnPropertyNames(proto_1).forEach(function (property) {
            if (property !== 'constructor' && proto_1.hasOwnProperty(property)) {
                result[property] = obj[property];
            }
        });
    }
    return result;
};
var ɵ2 = copyObject;
exports.ɵ2 = ɵ2;
var cloneFilter = function (filter) { return copyObject(filter); };
var ɵ3 = cloneFilter;
exports.ɵ3 = ɵ3;
/**
 * @hidden
 */
exports.cloneFilters = function (filter) {
    if (!filter) {
        return;
    }
    if (kendo_data_query_1.isCompositeFilterDescriptor(filter)) {
        return {
            filters: exports.cloneFilters(filter.filters),
            logic: filter.logic
        };
    }
    else if (Array.isArray(filter)) {
        return filter.map(exports.cloneFilters);
    }
    return cloneFilter(filter);
};
/**
 * @hidden
 */
exports.diffFilters = function (a, b) {
    if (utils_1.isPresent(a) && !utils_1.isPresent(b)) {
        return true;
    }
    if (!utils_1.isPresent(a) && utils_1.isPresent(b)) {
        return true;
    }
    return utils_1.isPresent(a) && utils_1.isPresent(b) && isChanged(a.filters, b.filters);
};
