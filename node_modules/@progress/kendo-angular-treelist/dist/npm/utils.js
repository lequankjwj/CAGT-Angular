/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
exports.isChanged = kendo_angular_common_1.isChanged;
exports.anyChanged = kendo_angular_common_1.anyChanged;
exports.hasObservers = kendo_angular_common_1.hasObservers;
var EMPTY_REGEX = /^\s*$/;
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
exports.isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 */
exports.isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 */
exports.isTruthy = function (value) { return !!value; };
/**
 * @hidden
 */
exports.isNullOrEmptyString = function (value) { return exports.isBlank(value) || EMPTY_REGEX.test(value); };
/**
 * @hidden
 */
exports.observe = function (list) {
    return rxjs_1.merge(rxjs_1.of(list), list.changes);
};
/**
 * @hidden
 */
exports.isUniversal = function () { return typeof document === 'undefined'; };
/**
 * @hidden
 */
exports.isString = function (value) {
    return typeof value === 'string';
};
/**
 * @hidden
 */
exports.isNumber = function (value) { return typeof value === "number" && !isNaN(value); };
/**
 * @hidden
 */
exports.extractFormat = function (format) {
    if (exports.isString(format) && !exports.isNullOrEmptyString(format) && format.startsWith('{0:')) {
        return format.slice(3, format.length - 1);
    }
    return format;
};
/**
 * @hidden
 */
exports.not = function (fn) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return !fn.apply(null, args);
}; };
/**
 * @hidden
 */
exports.or = function () {
    var conditions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        conditions[_i] = arguments[_i];
    }
    return function (value) { return conditions.reduce(function (acc, x) { return acc || x(value); }, false); };
};
/**
 * @hidden
 */
exports.and = function () {
    var conditions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        conditions[_i] = arguments[_i];
    }
    return function (value) { return conditions.reduce(function (acc, x) { return acc && x(value); }, true); };
};
/**
 * @hidden
 */
exports.Skip = new core_1.InjectionToken("Skip"); // tslint:disable-line:variable-name
/**
 * @hidden
 */
exports.createPromise = function () {
    var resolveFn, rejectFn;
    var promise = new Promise(function (resolve, reject) {
        resolveFn = function (data) {
            resolve(data);
            return promise;
        };
        rejectFn = function (data) {
            reject(data);
            return promise;
        };
    });
    promise.resolve = resolveFn;
    promise.reject = rejectFn;
    return promise;
};
/** @hidden */
exports.iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    var keys = Object.getOwnPropertyNames(Map.prototype);
    var proto = Map.prototype;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
var FRAME_DURATION = 1000 / 60;
var wnd = typeof window !== 'undefined' ? window : {};
/** @hidden */
exports.requestAnimationFrame = wnd.requestAnimationFrame || wnd.msRequestAnimationFrame || (function (callback) { return setTimeout(callback, FRAME_DURATION); });
/** @hidden */
exports.cancelAnimationFrame = wnd.cancelAnimationFrame || wnd.msCancelRequestAnimationFrame || clearTimeout;
/** @hidden */
exports.isColumnEditable = function (column, formGroup) { return column.isEditable !== false &&
    (column.editTemplate || (formGroup && column.field && formGroup.get(column.field))); };
