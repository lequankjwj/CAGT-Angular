/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
function defaultTrackBy(index, item) {
    if (item.type === 'data' && item.isEditing) {
        return item.data;
    }
    return index;
}
exports.defaultTrackBy = defaultTrackBy;
