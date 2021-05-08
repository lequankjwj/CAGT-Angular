/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { hasObservers } from '@progress/kendo-angular-common';
import { DrawerSelectEvent } from './events/select-event';
/**
 * @hidden
 */
var DrawerService = /** @class */ (function () {
    function DrawerService() {
        this.selectedIndices = [];
    }
    DrawerService.prototype.emit = function (event, args) {
        var drawer = this.owner;
        var eventArgs = new DrawerSelectEvent(tslib_1.__assign({}, args, { sender: drawer }));
        if (hasObservers(drawer[event])) {
            drawer[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    DrawerService.prototype.onSelect = function (selectedIdx) {
        this.selectedIndices = [selectedIdx];
        var drawer = this.owner;
        if (drawer.autoCollapse && !drawer.minimized) {
            drawer.toggle(false);
        }
    };
    DrawerService.prototype.initSelection = function () {
        var items = this.owner.items;
        this.selectedIndices = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].selected) {
                this.selectedIndices.push(i);
            }
        }
    };
    DrawerService.decorators = [
        { type: Injectable },
    ];
    return DrawerService;
}());
export { DrawerService };
