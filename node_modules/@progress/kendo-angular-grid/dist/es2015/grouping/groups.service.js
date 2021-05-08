/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, Optional, Inject } from '@angular/core';
import { ExpandStateService } from '../common/expand-state.service';
import { Skip } from "../utils";
const removeLast = groupIndex => groupIndex.lastIndexOf("_") > -1
    ? groupIndex.slice(0, groupIndex.lastIndexOf("_"))
    : "";
const ɵ0 = removeLast;
const isChildIndex = (targetIndex, parentIndex) => parentIndex !== targetIndex && targetIndex.startsWith(parentIndex);
const ɵ1 = isChildIndex;
/**
 * @hidden
 */
export class GroupsService extends ExpandStateService {
    constructor(isCollapsed = false) {
        super(isCollapsed);
    }
    isInExpandedGroup(groupIndex, skipSelf = true) {
        if (skipSelf) {
            groupIndex = removeLast(groupIndex);
        }
        let expanded = true;
        while (groupIndex && expanded) {
            expanded = this.isExpanded(groupIndex);
            groupIndex = removeLast(groupIndex);
        }
        return expanded;
    }
    expandChildren(parentIndex) {
        this.rowState.forEach(index => isChildIndex(index, parentIndex) && this.rowState.delete(index));
    }
}
GroupsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupsService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [Skip,] }] }
];
export { ɵ0, ɵ1 };
