/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var utils_1 = require("../utils");
var BaseBindingDirective = /** @class */ (function () {
    function BaseBindingDirective(treelist) {
        this.treelist = treelist;
        this.state = {};
        this.cache = new Map();
        this.originalData = [];
        this.subscriptions = new rxjs_1.Subscription();
        this.treelist.fetchChildren = this.fetchChildren.bind(this);
        this.treelist.hasChildren = this.hasChildren.bind(this);
    }
    Object.defineProperty(BaseBindingDirective.prototype, "sort", {
        /**
         * Defines the descriptors by which the data will be sorted.
         */
        set: function (value) {
            this.treelist.sort = this.state.sort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseBindingDirective.prototype, "filter", {
        /**
         * Defines the descriptor by which the data will be filtered.
         */
        set: function (value) {
            this.treelist.filter = this.state.filter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseBindingDirective.prototype, "aggregate", {
        /**
         * Defines the descriptor by which the data will be filtered.
         */
        set: function (value) {
            this._aggregate = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    BaseBindingDirective.prototype.ngOnInit = function () {
        this.applyState(this.state);
        this.subscriptions.add(this.treelist.dataStateChange
            .subscribe(this.onStateChange.bind(this)));
    };
    /**
     * @hidden
     */
    BaseBindingDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    BaseBindingDirective.prototype.ngDoCheck = function () {
        if (this.dataChanged) {
            this.dataChanged = false;
            this.rebind();
        }
    };
    /**
     * @hidden
     */
    BaseBindingDirective.prototype.ngOnChanges = function (changes) {
        if (utils_1.anyChanged(['sort', 'filter', 'aggregate'], changes)) {
            this.rebind();
        }
    };
    /**
     * @hidden
     */
    BaseBindingDirective.prototype.onStateChange = function (state) {
        this.applyState(state);
        this.rebind();
    };
    /**
     * @hidden
     */
    BaseBindingDirective.prototype.rebind = function () {
        this.cache.clear();
        this.treelist.data = this.fetchChildren();
    };
    BaseBindingDirective.prototype.applyState = function (_a) {
        var sort = _a.sort, filter = _a.filter;
        this.sort = sort;
        this.filter = filter;
    };
    BaseBindingDirective.prototype.fetchChildren = function (item) {
        var key = this.itemKey(item);
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        var children = this.getChildren(item);
        var items = this.filterItems(children);
        var aggregates;
        if (items.length) {
            if (this.state.sort) {
                items = kendo_data_query_1.process(items, { sort: this.state.sort }).data;
            }
            if (this._aggregate) {
                aggregates = this.calculateAggregates(items);
            }
        }
        var result = {
            data: items,
            aggregates: aggregates
        };
        this.cache.set(key, result);
        return result;
    };
    BaseBindingDirective.prototype.hasChildren = function (item) {
        var items = this.fetchChildren(item).data;
        return items && items.length > 0;
    };
    BaseBindingDirective.prototype.filterItems = function (items) {
        var _this = this;
        if (this.state.filter) {
            var filter = {
                logic: 'or',
                filters: [this.state.filter, {
                        operator: function (item) {
                            var children = _this.fetchChildren(item);
                            return Boolean(children.data && children.data.length);
                        }
                    }]
            };
            return kendo_data_query_1.process(items, {
                filter: filter
            }).data;
        }
        return items;
    };
    BaseBindingDirective.prototype.calculateAggregates = function (items) {
        var list = [];
        var toAdd = items.slice(0);
        while (toAdd.length) {
            var current = toAdd.shift();
            list.push(current);
            if (this.hasChildren(current)) {
                toAdd.push.apply(toAdd, this.fetchChildren(current).data);
            }
        }
        // can accumulate from children aggregates except for average
        // for average we need the children count that have numeric value
        // maybe move the aggregates implementation here ???
        return kendo_data_query_1.aggregateBy(list, this._aggregate);
    };
    BaseBindingDirective.propDecorators = {
        sort: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        aggregate: [{ type: core_1.Input }]
    };
    return BaseBindingDirective;
}());
exports.BaseBindingDirective = BaseBindingDirective;
