/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export const markAllAsTouched = (control) => {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        let controls = control.controls;
        for (let inner in controls) {
            if (controls.hasOwnProperty(inner)) {
                markAllAsTouched(controls[inner]);
            }
        }
    }
};
/**
 * @hidden
 */
export const insertNewItem = (newItem, originalData, treelist, parent) => {
    let insertAt = 0;
    if (!parent && treelist.skip) {
        let firstItem = treelist.view.find(item => item.type === 'data' && !item.isNew);
        let firstRootItem = firstItem;
        let firstOffset = 0;
        if (firstItem.level > 0) {
            while (firstItem.level > 0) {
                firstItem = firstItem.parent;
            }
            firstRootItem = firstItem;
            firstOffset = 1;
        }
        const firstIndex = originalData.indexOf(firstRootItem.data);
        if (firstIndex > 0) {
            insertAt = firstIndex + firstOffset;
        }
    }
    originalData.splice(insertAt, 0, newItem);
};
