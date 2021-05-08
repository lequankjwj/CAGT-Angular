/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isPresent } from '../common/util';
var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
var ɵ0 = toClassList;
/**
 * @hidden
 */
export var isFocusable = function (element) {
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var skipTab = tabIndex === '-1';
        var focusable = tabIndex !== null && !skipTab;
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
export var hasClass = function (element, className) {
    return Boolean(toClassList(element.className).find(function (name) { return name === className; }));
};
var closestInScope = function (target, targetAttr, predicate, scope) {
    while (target && target !== scope && !predicate(target, targetAttr)) {
        target = target.parentNode;
    }
    if (target !== scope) {
        return target;
    }
};
var ɵ1 = closestInScope;
/**
 * @hidden
 */
export var itemIndex = function (item, indexAttr) { return +item.getAttribute(indexAttr); };
var hasItemIndex = function (item, indexAttr) { return isPresent(item.getAttribute(indexAttr)); };
var ɵ2 = hasItemIndex;
/**
 * @hidden
 */
export var closestItem = function (target, targetAttr, scope) { return closestInScope(target, targetAttr, hasItemIndex, scope); };
export { ɵ0, ɵ1, ɵ2 };
