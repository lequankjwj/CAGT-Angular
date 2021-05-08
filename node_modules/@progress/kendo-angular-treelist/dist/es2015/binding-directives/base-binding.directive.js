/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { process, aggregateBy } from '@progress/kendo-data-query';
import { anyChanged } from '../utils';
export class BaseBindingDirective {
    constructor(treelist) {
        this.treelist = treelist;
        this.state = {};
        this.cache = new Map();
        this.originalData = [];
        this.subscriptions = new Subscription();
        this.treelist.fetchChildren = this.fetchChildren.bind(this);
        this.treelist.hasChildren = this.hasChildren.bind(this);
    }
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    set sort(value) {
        this.treelist.sort = this.state.sort = value;
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set filter(value) {
        this.treelist.filter = this.state.filter = value;
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set aggregate(value) {
        this._aggregate = value;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.applyState(this.state);
        this.subscriptions.add(this.treelist.dataStateChange
            .subscribe(this.onStateChange.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    ngDoCheck() {
        if (this.dataChanged) {
            this.dataChanged = false;
            this.rebind();
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (anyChanged(['sort', 'filter', 'aggregate'], changes)) {
            this.rebind();
        }
    }
    /**
     * @hidden
     */
    onStateChange(state) {
        this.applyState(state);
        this.rebind();
    }
    /**
     * @hidden
     */
    rebind() {
        this.cache.clear();
        this.treelist.data = this.fetchChildren();
    }
    applyState({ sort, filter }) {
        this.sort = sort;
        this.filter = filter;
    }
    fetchChildren(item) {
        const key = this.itemKey(item);
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        const children = this.getChildren(item);
        let items = this.filterItems(children);
        let aggregates;
        if (items.length) {
            if (this.state.sort) {
                items = process(items, { sort: this.state.sort }).data;
            }
            if (this._aggregate) {
                aggregates = this.calculateAggregates(items);
            }
        }
        const result = {
            data: items,
            aggregates: aggregates
        };
        this.cache.set(key, result);
        return result;
    }
    hasChildren(item) {
        const items = this.fetchChildren(item).data;
        return items && items.length > 0;
    }
    filterItems(items) {
        if (this.state.filter) {
            const filter = {
                logic: 'or',
                filters: [this.state.filter, {
                        operator: (item) => {
                            const children = this.fetchChildren(item);
                            return Boolean(children.data && children.data.length);
                        }
                    }]
            };
            return process(items, {
                filter: filter
            }).data;
        }
        return items;
    }
    calculateAggregates(items) {
        const list = [];
        const toAdd = items.slice(0);
        while (toAdd.length) {
            const current = toAdd.shift();
            list.push(current);
            if (this.hasChildren(current)) {
                toAdd.push.apply(toAdd, this.fetchChildren(current).data);
            }
        }
        // can accumulate from children aggregates except for average
        // for average we need the children count that have numeric value
        // maybe move the aggregates implementation here ???
        return aggregateBy(list, this._aggregate);
    }
}
BaseBindingDirective.propDecorators = {
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    aggregate: [{ type: Input }]
};
