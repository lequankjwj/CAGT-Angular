/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.DRAWER_LINK_SELECTOR = '.k-drawer-link';
/**
 * @hidden
 */
exports.ACTIVE_NESTED_LINK_SELECTOR = ':focus:not(.k-state-disabled) .k-drawer-link';
/**
 * @hidden
 */
exports.nestedLink = function (element, selector) { return element.querySelector(selector); };
