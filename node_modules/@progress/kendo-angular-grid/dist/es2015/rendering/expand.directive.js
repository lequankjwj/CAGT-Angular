/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { GridComponent } from '../grid.component';
import { Subscription, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { getter } from '@progress/kendo-common';
import { isString } from '../utils';
/**
 * A directive which controls the expanded state of the master detail rows.
 */
export class ExpandDetailsDirective {
    constructor(grid) {
        this.grid = grid;
        /**
         * Fires when the expandedDetailKeys are changed.
         */
        this.expandedDetailKeysChange = new EventEmitter();
        /**
         * Defines the collection that will store the expanded keys.
         */
        this.expandedDetailKeys = [];
        /**
         * Specifies if the items should be initially expanded.
         * @default false
         */
        this.initiallyExpanded = false;
        this.subscriptions = new Subscription();
        this.grid.isDetailExpanded = this.isExpanded.bind(this);
        this.subscriptions.add(merge(this.grid.detailExpand.pipe(map(e => (Object.assign({ expand: true }, e)))), this.grid.detailCollapse.pipe(map(e => (Object.assign({ expand: false }, e))))).subscribe(this.toggleState.bind(this)));
    }
    /**
     * Defines the item key that will be stored in the `expandedDetailKeys` collection ([see example]({% slug master_detail_expanded_state_grid %}#toc-built-in-directive)).
     */
    get expandDetailsKey() {
        return this._expandBy;
    }
    set expandDetailsKey(key) {
        if (isString(key)) {
            this._expandBy = getter(key);
        }
        else {
            this._expandBy = key;
        }
    }
    /**
     *
     * @hidden
     * A deprecated alias for setting the `expandDetailsKey` property.
     */
    get expandDetailBy() {
        return this.expandDetailsKey;
    }
    set expandDetailBy(key) {
        this.expandDetailsKey = key;
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    get keyGetter() {
        return this._expandBy || getter(undefined);
    }
    /**
     * @hidden
     */
    isExpanded(args) {
        const key = this.keyGetter(args.dataItem);
        return this.expandedDetailKeys.indexOf(key) > -1 ? !this.initiallyExpanded : this.initiallyExpanded;
    }
    toggleState(args) {
        const key = this.keyGetter(args.dataItem);
        if (Boolean(this.initiallyExpanded) !== args.expand) {
            this.expandedDetailKeys.push(key);
        }
        else {
            const index = this.expandedDetailKeys.indexOf(key);
            this.expandedDetailKeys.splice(index, 1);
        }
        this.expandedDetailKeysChange.emit(this.expandedDetailKeys);
    }
}
ExpandDetailsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridExpandDetailsBy]',
                exportAs: 'kendoGridExpandDetailsBy'
            },] },
];
/** @nocollapse */
ExpandDetailsDirective.ctorParameters = () => [
    { type: GridComponent }
];
ExpandDetailsDirective.propDecorators = {
    expandedDetailKeysChange: [{ type: Output }],
    expandDetailsKey: [{ type: Input, args: ['kendoGridExpandDetailsBy',] }],
    expandDetailBy: [{ type: Input }],
    expandedDetailKeys: [{ type: Input }],
    initiallyExpanded: [{ type: Input }]
};
