/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export var markAllAsTouched = function (control) {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        var controls = control.controls;
        for (var inner in controls) {
            if (controls.hasOwnProperty(inner)) {
                markAllAsTouched(controls[inner]);
            }
        }
    }
};
/**
 * @hidden
 */
export var insertNewItem = function (newItem, originalData, treelist, parent) {
    var insertAt = 0;
    if (!parent && treelist.skip) {
        var firstItem = treelist.view.find(function (item) { return item.type === 'data' && !item.isNew; });
        var firstRootItem = firstItem;
        var firstOffset = 0;
        if (firstItem.level > 0) {
            while (firstItem.level > 0) {
                firstItem = firstItem.parent;
            }
            firstRootItem = firstItem;
            firstOffset = 1;
        }
        var firstIndex = originalData.indexOf(firstRootItem.data);
        if (firstIndex > 0) {
            insertAt = firstIndex + firstOffset;
        }
    }
    originalData.splice(insertAt, 0, newItem);
};
