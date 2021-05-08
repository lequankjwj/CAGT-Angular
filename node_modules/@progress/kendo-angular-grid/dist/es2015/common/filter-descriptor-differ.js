/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isPresent } from "../utils";
import { isCompositeFilterDescriptor } from "@progress/kendo-data-query";
const areDifferent = (a, b) => a.field !== b.field || a.operator !== b.operator || a.value !== b.value;
const ɵ0 = areDifferent;
const isChanged = (a, b) => {
    if (a.length !== b.length) {
        return true;
    }
    for (let idx = 0, len = a.length; idx < len; idx++) {
        const prev = a[idx];
        const curr = b[idx];
        if (isCompositeFilterDescriptor(prev)) {
            // tslint:disable-next-line:no-use-before-declare
            if (diffFilters(prev, curr[idx])) {
                return true;
            }
        }
        else if (areDifferent(prev, curr)) {
            return true;
        }
    }
    return false;
};
const ɵ1 = isChanged;
const copyObject = (obj) => {
    const result = {};
    Object.assign(result, obj);
    if (obj.constructor !== Object) {
        const proto = obj.constructor.prototype;
        Object.getOwnPropertyNames(proto).forEach((property) => {
            if (property !== 'constructor' && proto.hasOwnProperty(property)) {
                result[property] = obj[property];
            }
        });
    }
    return result;
};
const ɵ2 = copyObject;
const cloneFilter = (filter) => copyObject(filter);
const ɵ3 = cloneFilter;
/**
 * @hidden
 */
export const cloneFilters = (filter) => {
    if (!filter) {
        return;
    }
    if (isCompositeFilterDescriptor(filter)) {
        return {
            filters: cloneFilters(filter.filters),
            logic: filter.logic
        };
    }
    else if (Array.isArray(filter)) {
        return filter.map(cloneFilters);
    }
    return cloneFilter(filter);
};
/**
 * @hidden
 */
export const diffFilters = (a, b) => {
    if (isPresent(a) && !isPresent(b)) {
        return true;
    }
    if (!isPresent(a) && isPresent(b)) {
        return true;
    }
    return isPresent(a) && isPresent(b) && isChanged(a.filters, b.filters);
};
export { ɵ0, ɵ1, ɵ2, ɵ3 };
