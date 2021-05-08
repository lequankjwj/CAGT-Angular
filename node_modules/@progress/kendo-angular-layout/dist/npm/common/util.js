/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextId = 0;
var parsePanelBarItems = function (data) {
    return data.map(function (item) {
        if (!item.id) {
            item.id = "default-" + nextId++;
        }
        if (item.children) {
            item.children = parsePanelBarItems(item.children);
        }
        return item;
    });
};
var ɵ0 = parsePanelBarItems;
exports.ɵ0 = ɵ0;
exports.default = {
    parsePanelBarItems: parsePanelBarItems
};
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
