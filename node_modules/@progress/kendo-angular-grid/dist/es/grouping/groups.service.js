/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Injectable, Optional, Inject } from '@angular/core';
import { ExpandStateService } from '../common/expand-state.service';
import { Skip } from "../utils";
var removeLast = function (groupIndex) { return groupIndex.lastIndexOf("_") > -1
    ? groupIndex.slice(0, groupIndex.lastIndexOf("_"))
    : ""; };
var ɵ0 = removeLast;
var isChildIndex = function (targetIndex, parentIndex) { return parentIndex !== targetIndex && targetIndex.startsWith(parentIndex); };
var ɵ1 = isChildIndex;
/**
 * @hidden
 */
var GroupsService = /** @class */ (function (_super) {
    tslib_1.__extends(GroupsService, _super);
    function GroupsService(isCollapsed) {
        if (isCollapsed === void 0) { isCollapsed = false; }
        return _super.call(this, isCollapsed) || this;
    }
    GroupsService.prototype.isInExpandedGroup = function (groupIndex, skipSelf) {
        if (skipSelf === void 0) { skipSelf = true; }
        if (skipSelf) {
            groupIndex = removeLast(groupIndex);
        }
        var expanded = true;
        while (groupIndex && expanded) {
            expanded = this.isExpanded(groupIndex);
            groupIndex = removeLast(groupIndex);
        }
        return expanded;
    };
    GroupsService.prototype.expandChildren = function (parentIndex) {
        var _this = this;
        this.rowState.forEach(function (index) { return isChildIndex(index, parentIndex) && _this.rowState.delete(index); });
    };
    GroupsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GroupsService.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [Skip,] }] }
    ]; };
    return GroupsService;
}(ExpandStateService));
export { GroupsService };
export { ɵ0, ɵ1 };
