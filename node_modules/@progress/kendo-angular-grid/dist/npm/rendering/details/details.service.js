/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var detail_collapse_event_1 = require("./detail-collapse-event");
var detail_expand_event_1 = require("./detail-expand-event");
/**
 * @hidden
 */
var DetailsService = /** @class */ (function () {
    function DetailsService() {
        this.changes = new rxjs_1.Subject();
        this.rowState = new Set();
    }
    DetailsService.prototype.ngOnDestroy = function () {
        this.rowState.clear();
    };
    DetailsService.prototype.isExpanded = function (index, dataItem) {
        if (this.userCallback) {
            return this.userCallback({ index: index, dataItem: dataItem });
        }
        return this.rowState.has(index);
    };
    DetailsService.prototype.toggleRow = function (index, dataItem) {
        if (this.isExpanded(index, dataItem)) {
            this.collapseRow(index, dataItem);
        }
        else {
            this.expandRow(index, dataItem);
        }
    };
    DetailsService.prototype.expandRow = function (index, dataItem) {
        var prevented = this.emitEvent({ dataItem: dataItem, index: index, expand: true });
        if (!prevented && !this.userCallback) {
            this.rowState.add(index);
        }
    };
    DetailsService.prototype.collapseRow = function (index, dataItem) {
        var prevented = this.emitEvent({ dataItem: dataItem, index: index, expand: false });
        if (!prevented && !this.userCallback) {
            this.rowState.delete(index);
        }
    };
    DetailsService.prototype.emitEvent = function (args) {
        var eventArg = new (args.expand ? detail_expand_event_1.DetailExpandEvent : detail_collapse_event_1.DetailCollapseEvent)(args);
        this.changes.next(eventArg);
        return eventArg.isDefaultPrevented();
    };
    DetailsService.decorators = [
        { type: core_1.Injectable },
    ];
    return DetailsService;
}());
exports.DetailsService = DetailsService;
