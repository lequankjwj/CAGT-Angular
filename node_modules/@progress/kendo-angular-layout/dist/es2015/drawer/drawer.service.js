/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { hasObservers } from '@progress/kendo-angular-common';
import { DrawerSelectEvent } from './events/select-event';
/**
 * @hidden
 */
export class DrawerService {
    constructor() {
        this.selectedIndices = [];
    }
    emit(event, args) {
        const drawer = this.owner;
        const eventArgs = new DrawerSelectEvent(Object.assign({}, args, { sender: drawer }));
        if (hasObservers(drawer[event])) {
            drawer[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    onSelect(selectedIdx) {
        this.selectedIndices = [selectedIdx];
        const drawer = this.owner;
        if (drawer.autoCollapse && !drawer.minimized) {
            drawer.toggle(false);
        }
    }
    initSelection() {
        const items = this.owner.items;
        this.selectedIndices = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].selected) {
                this.selectedIndices.push(i);
            }
        }
    }
}
DrawerService.decorators = [
    { type: Injectable },
];
