/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isPresent } from '../common/util';
const focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
const toClassList = (classNames) => String(classNames).trim().split(' ');
const ɵ0 = toClassList;
/**
 * @hidden
 */
export const isFocusable = (element) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const skipTab = tabIndex === '-1';
        let focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable;
    }
    return false;
};
/**
 * @hidden
 */
export const hasClass = (element, className) => Boolean(toClassList(element.className).find((name) => name === className));
const closestInScope = (target, targetAttr, predicate, scope) => {
    while (target && target !== scope && !predicate(target, targetAttr)) {
        target = target.parentNode;
    }
    if (target !== scope) {
        return target;
    }
};
const ɵ1 = closestInScope;
/**
 * @hidden
 */
export const itemIndex = (item, indexAttr) => +item.getAttribute(indexAttr);
const hasItemIndex = (item, indexAttr) => isPresent(item.getAttribute(indexAttr));
const ɵ2 = hasItemIndex;
/**
 * @hidden
 */
export const closestItem = (target, targetAttr, scope) => closestInScope(target, targetAttr, hasItemIndex, scope);
export { ɵ0, ɵ1, ɵ2 };
