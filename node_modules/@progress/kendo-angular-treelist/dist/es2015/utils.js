/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { InjectionToken } from '@angular/core';
import { merge, of } from 'rxjs';
export { isChanged, anyChanged, hasObservers } from '@progress/kendo-angular-common';
const EMPTY_REGEX = /^\s*$/;
/**
 * @hidden
 */
export const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
export const isBlank = (value) => value === null || value === undefined;
/**
 * @hidden
 */
export const isArray = (value) => Array.isArray(value);
/**
 * @hidden
 */
export const isTruthy = (value) => !!value;
/**
 * @hidden
 */
export const isNullOrEmptyString = (value) => isBlank(value) || EMPTY_REGEX.test(value);
/**
 * @hidden
 */
export const observe = (list) => merge(of(list), list.changes);
/**
 * @hidden
 */
export const isUniversal = () => typeof document === 'undefined';
/**
 * @hidden
 */
export const isString = (value) => typeof value === 'string';
/**
 * @hidden
 */
export const isNumber = (value) => typeof value === "number" && !isNaN(value);
/**
 * @hidden
 */
export const extractFormat = (format) => {
    if (isString(format) && !isNullOrEmptyString(format) && format.startsWith('{0:')) {
        return format.slice(3, format.length - 1);
    }
    return format;
};
/**
 * @hidden
 */
export const not = (fn) => (...args) => !fn.apply(null, args);
/**
 * @hidden
 */
export const or = (...conditions) => (value) => conditions.reduce((acc, x) => acc || x(value), false);
/**
 * @hidden
 */
export const and = (...conditions) => (value) => conditions.reduce((acc, x) => acc && x(value), true);
/**
 * @hidden
 */
export const Skip = new InjectionToken("Skip"); // tslint:disable-line:variable-name
/**
 * @hidden
 */
export const createPromise = () => {
    let resolveFn, rejectFn;
    const promise = new Promise((resolve, reject) => {
        resolveFn = (data) => {
            resolve(data);
            return promise;
        };
        rejectFn = (data) => {
            reject(data);
            return promise;
        };
    });
    promise.resolve = resolveFn;
    promise.reject = rejectFn;
    return promise;
};
/** @hidden */
export const iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    const keys = Object.getOwnPropertyNames(Map.prototype);
    const proto = Map.prototype;
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
const FRAME_DURATION = 1000 / 60;
const wnd = typeof window !== 'undefined' ? window : {};
/** @hidden */
export const requestAnimationFrame = wnd.requestAnimationFrame || wnd.msRequestAnimationFrame || (callback => setTimeout(callback, FRAME_DURATION));
/** @hidden */
export const cancelAnimationFrame = wnd.cancelAnimationFrame || wnd.msCancelRequestAnimationFrame || clearTimeout;
/** @hidden */
export const isColumnEditable = (column, formGroup) => column.isEditable !== false &&
    (column.editTemplate || (formGroup && column.field && formGroup.get(column.field)));
