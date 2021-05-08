/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var grid_component_1 = require("../grid.component");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_common_1 = require("@progress/kendo-common");
var utils_1 = require("../utils");
/**
 * A directive which controls the expanded state of the master detail rows.
 */
var ExpandDetailsDirective = /** @class */ (function () {
    function ExpandDetailsDirective(grid) {
        this.grid = grid;
        /**
         * Fires when the expandedDetailKeys are changed.
         */
        this.expandedDetailKeysChange = new core_1.EventEmitter();
        /**
         * Defines the collection that will store the expanded keys.
         */
        this.expandedDetailKeys = [];
        /**
         * Specifies if the items should be initially expanded.
         * @default false
         */
        this.initiallyExpanded = false;
        this.subscriptions = new rxjs_1.Subscription();
        this.grid.isDetailExpanded = this.isExpanded.bind(this);
        this.subscriptions.add(rxjs_1.merge(this.grid.detailExpand.pipe(operators_1.map(function (e) { return (tslib_1.__assign({ expand: true }, e)); })), this.grid.detailCollapse.pipe(operators_1.map(function (e) { return (tslib_1.__assign({ expand: false }, e)); }))).subscribe(this.toggleState.bind(this)));
    }
    Object.defineProperty(ExpandDetailsDirective.prototype, "expandDetailsKey", {
        /**
         * Defines the item key that will be stored in the `expandedDetailKeys` collection ([see example]({% slug master_detail_expanded_state_grid %}#toc-built-in-directive)).
         */
        get: function () {
            return this._expandBy;
        },
        set: function (key) {
            if (utils_1.isString(key)) {
                this._expandBy = kendo_common_1.getter(key);
            }
            else {
                this._expandBy = key;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandDetailsDirective.prototype, "expandDetailBy", {
        /**
         *
         * @hidden
         * A deprecated alias for setting the `expandDetailsKey` property.
         */
        get: function () {
            return this.expandDetailsKey;
        },
        set: function (key) {
            this.expandDetailsKey = key;
        },
        enumerable: true,
        configurable: true
    });
    ExpandDetailsDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    Object.defineProperty(ExpandDetailsDirective.prototype, "keyGetter", {
        get: function () {
            return this._expandBy || kendo_common_1.getter(undefined);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ExpandDetailsDirective.prototype.isExpanded = function (args) {
        var key = this.keyGetter(args.dataItem);
        return this.expandedDetailKeys.indexOf(key) > -1 ? !this.initiallyExpanded : this.initiallyExpanded;
    };
    ExpandDetailsDirective.prototype.toggleState = function (args) {
        var key = this.keyGetter(args.dataItem);
        if (Boolean(this.initiallyExpanded) !== args.expand) {
            this.expandedDetailKeys.push(key);
        }
        else {
            var index = this.expandedDetailKeys.indexOf(key);
            this.expandedDetailKeys.splice(index, 1);
        }
        this.expandedDetailKeysChange.emit(this.expandedDetailKeys);
    };
    ExpandDetailsDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridExpandDetailsBy]',
                    exportAs: 'kendoGridExpandDetailsBy'
                },] },
    ];
    /** @nocollapse */
    ExpandDetailsDirective.ctorParameters = function () { return [
        { type: grid_component_1.GridComponent }
    ]; };
    ExpandDetailsDirective.propDecorators = {
        expandedDetailKeysChange: [{ type: core_1.Output }],
        expandDetailsKey: [{ type: core_1.Input, args: ['kendoGridExpandDetailsBy',] }],
        expandDetailBy: [{ type: core_1.Input }],
        expandedDetailKeys: [{ type: core_1.Input }],
        initiallyExpanded: [{ type: core_1.Input }]
    };
    return ExpandDetailsDirective;
}());
exports.ExpandDetailsDirective = ExpandDetailsDirective;
