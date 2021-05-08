/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
var ExpandStateService = /** @class */ (function () {
    function ExpandStateService(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = new Set();
    }
    ExpandStateService.prototype.toggleRow = function (index, dataItem) {
        var found = this.rowState.has(index);
        var expand = !this.isInitiallyCollapsed ? found : !found;
        var prevented = this.emitEvent({ dataItem: dataItem, expand: expand, index: index });
        if (prevented) {
            return;
        }
        if (found) {
            this.rowState.delete(index);
        }
        else {
            this.rowState.add(index);
        }
    };
    ExpandStateService.prototype.isExpanded = function (index) {
        var found = this.rowState.has(index);
        return this.isInitiallyCollapsed ? found : !found;
    };
    ExpandStateService.prototype.reset = function () {
        this.rowState.clear();
    };
    ExpandStateService.prototype.emitEvent = function (args) {
        this.changes.next(args);
        return false;
    };
    return ExpandStateService;
}());
export { ExpandStateService };
