/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { LocalEditService } from './local-edit.service';
import { guid } from '@progress/kendo-angular-common';
import { isPresent } from '../utils';
import { insertNewItem } from './utils';
/**
 * @hidden
 */
var FlatEditService = /** @class */ (function (_super) {
    tslib_1.__extends(FlatEditService, _super);
    function FlatEditService(bindingDirective, localDataChanges) {
        var _this = _super.call(this) || this;
        _this.bindingDirective = bindingDirective;
        _this.localDataChanges = localDataChanges;
        return _this;
    }
    FlatEditService.prototype.create = function (item, parent, id) {
        var _a = this.bindingDirective, idGetter = _a.idGetter, idSetter = _a.idSetter, parentIdSetter = _a.parentIdSetter, originalData = _a.originalData, treelist = _a.treelist;
        idSetter(item, isPresent(id) ? id : guid());
        if (parent) {
            parentIdSetter(item, idGetter(parent));
        }
        insertNewItem(item, originalData, treelist, parent);
        this.bindingDirective.rebind();
    };
    FlatEditService.prototype.update = function (_item) {
        this.bindingDirective.rebind();
    };
    FlatEditService.prototype.remove = function (item, _parent) {
        var _a = this.bindingDirective, idGetter = _a.idGetter, parentIdGetter = _a.parentIdGetter, originalData = _a.originalData;
        var toRemove = [item];
        while (toRemove.length) {
            var current = toRemove.shift();
            var id = idGetter(current);
            var itemIndex = -1;
            for (var idx = 0; idx < originalData.length; idx++) {
                var dataItem = originalData[idx];
                if (itemIndex === -1 && idGetter(dataItem) === id) {
                    itemIndex = idx;
                }
                if (parentIdGetter(dataItem) === id) {
                    toRemove.push(dataItem);
                }
            }
            if (itemIndex >= 0) {
                originalData.splice(itemIndex, 1);
                this.notifyRemove(current);
            }
        }
        this.bindingDirective.rebind();
    };
    FlatEditService.prototype.notifyRemove = function (item) {
        if (this.localDataChanges) {
            this.localDataChanges.changes.emit({ action: 'remove', item: item });
        }
    };
    return FlatEditService;
}(LocalEditService));
export { FlatEditService };
