/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DetailCollapseEvent } from './detail-collapse-event';
import { DetailExpandEvent } from './detail-expand-event';
/**
 * @hidden
 */
export class DetailsService {
    constructor() {
        this.changes = new Subject();
        this.rowState = new Set();
    }
    ngOnDestroy() {
        this.rowState.clear();
    }
    isExpanded(index, dataItem) {
        if (this.userCallback) {
            return this.userCallback({ index, dataItem });
        }
        return this.rowState.has(index);
    }
    toggleRow(index, dataItem) {
        if (this.isExpanded(index, dataItem)) {
            this.collapseRow(index, dataItem);
        }
        else {
            this.expandRow(index, dataItem);
        }
    }
    expandRow(index, dataItem) {
        const prevented = this.emitEvent({ dataItem, index, expand: true });
        if (!prevented && !this.userCallback) {
            this.rowState.add(index);
        }
    }
    collapseRow(index, dataItem) {
        const prevented = this.emitEvent({ dataItem, index, expand: false });
        if (!prevented && !this.userCallback) {
            this.rowState.delete(index);
        }
    }
    emitEvent(args) {
        const eventArg = new (args.expand ? DetailExpandEvent : DetailCollapseEvent)(args);
        this.changes.next(eventArg);
        return eventArg.isDefaultPrevented();
    }
}
DetailsService.decorators = [
    { type: Injectable },
];
