/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
let nextId = 0;
const parsePanelBarItems = (data) => {
    return data.map((item) => {
        if (!item.id) {
            item.id = `default-${nextId++}`;
        }
        if (item.children) {
            item.children = parsePanelBarItems(item.children);
        }
        return item;
    });
};
const ɵ0 = parsePanelBarItems;
export default {
    parsePanelBarItems
};
/**
 * @hidden
 */
export const isPresent = (value) => value !== null && value !== undefined;
export { ɵ0 };
