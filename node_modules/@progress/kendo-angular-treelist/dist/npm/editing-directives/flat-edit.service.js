/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var local_edit_service_1 = require("./local-edit.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var utils_1 = require("../utils");
var utils_2 = require("./utils");
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
        idSetter(item, utils_1.isPresent(id) ? id : kendo_angular_common_1.guid());
        if (parent) {
            parentIdSetter(item, idGetter(parent));
        }
        utils_2.insertNewItem(item, originalData, treelist, parent);
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
}(local_edit_service_1.LocalEditService));
exports.FlatEditService = FlatEditService;
