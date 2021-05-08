/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { LocalEditService } from './local-edit.service';
import { hasObservers } from '@progress/kendo-angular-common';
import { insertNewItem } from './utils';
/**
 * @hidden
 */
var HierarchyEditService = /** @class */ (function (_super) {
    tslib_1.__extends(HierarchyEditService, _super);
    function HierarchyEditService(bindingDirective, localDataChanges) {
        var _this = _super.call(this) || this;
        _this.bindingDirective = bindingDirective;
        _this.localDataChanges = localDataChanges;
        return _this;
    }
    HierarchyEditService.prototype.create = function (item, parent, _id) {
        var _a = this.bindingDirective, childrenGetter = _a.childrenGetter, childrenSetter = _a.childrenSetter, originalData = _a.originalData, treelist = _a.treelist;
        if (parent) {
            var children = childrenGetter(parent);
            if (children) {
                children.unshift(item);
            }
            else {
                childrenSetter(parent, [item]);
            }
        }
        else {
            insertNewItem(item, originalData, treelist);
        }
        this.bindingDirective.rebind();
    };
    HierarchyEditService.prototype.update = function (_item) {
        this.bindingDirective.rebind();
    };
    HierarchyEditService.prototype.remove = function (item, parent) {
        var idGetter = this.bindingDirective.treelist.idGetter; // refactor provide idGetter via context service
        var _a = this.bindingDirective, childrenGetter = _a.childrenGetter, originalData = _a.originalData;
        var children = parent ? childrenGetter(parent) : originalData;
        if (children && children.length) {
            var id_1 = idGetter(item);
            var index = children.findIndex(function (i) { return idGetter(i) === id_1; });
            if (index >= 0) {
                children.splice(index, 1);
                this.bindingDirective.rebind();
                this.notifyRemove(item);
            }
        }
    };
    HierarchyEditService.prototype.notifyRemove = function (item) {
        if (this.localDataChanges && hasObservers(this.localDataChanges.changes)) {
            var childrenGetter = this.bindingDirective.childrenGetter;
            var toNotify = [item];
            while (toNotify.length) {
                var current = toNotify.shift();
                this.localDataChanges.changes.emit({ action: 'remove', item: current });
                var children = childrenGetter(current);
                if (children && children.length) {
                    toNotify.push.apply(toNotify, children);
                }
            }
        }
    };
    return HierarchyEditService;
}(LocalEditService));
export { HierarchyEditService };
