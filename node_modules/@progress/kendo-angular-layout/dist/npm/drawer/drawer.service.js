/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var select_event_1 = require("./events/select-event");
/**
 * @hidden
 */
var DrawerService = /** @class */ (function () {
    function DrawerService() {
        this.selectedIndices = [];
    }
    DrawerService.prototype.emit = function (event, args) {
        var drawer = this.owner;
        var eventArgs = new select_event_1.DrawerSelectEvent(tslib_1.__assign({}, args, { sender: drawer }));
        if (kendo_angular_common_1.hasObservers(drawer[event])) {
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
        { type: core_1.Injectable },
    ];
    return DrawerService;
}());
exports.DrawerService = DrawerService;
