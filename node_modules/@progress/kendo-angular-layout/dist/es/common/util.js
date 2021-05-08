/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
export default {
    parsePanelBarItems: parsePanelBarItems
};
/**
 * @hidden
 */
export var isPresent = function (value) { return value !== null && value !== undefined; };
export { ɵ0 };
