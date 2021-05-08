/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var expand_state_service_1 = require("../common/expand-state.service");
var utils_1 = require("../utils");
var removeLast = function (groupIndex) { return groupIndex.lastIndexOf("_") > -1
    ? groupIndex.slice(0, groupIndex.lastIndexOf("_"))
    : ""; };
var ɵ0 = removeLast;
exports.ɵ0 = ɵ0;
var isChildIndex = function (targetIndex, parentIndex) { return parentIndex !== targetIndex && targetIndex.startsWith(parentIndex); };
var ɵ1 = isChildIndex;
exports.ɵ1 = ɵ1;
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
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    GroupsService.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [utils_1.Skip,] }] }
    ]; };
    return GroupsService;
}(expand_state_service_1.ExpandStateService));
exports.GroupsService = GroupsService;
