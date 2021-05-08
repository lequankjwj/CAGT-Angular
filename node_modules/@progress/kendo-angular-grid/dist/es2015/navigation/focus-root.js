/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class FocusRoot {
    constructor() {
        this.groups = new Set();
    }
    registerGroup(group) {
        if (this.alive) {
            this.groups.add(group);
        }
    }
    unregisterGroup(group) {
        if (this.alive) {
            this.groups.delete(group);
        }
    }
    activate() {
        if (this.alive) {
            this.groups.forEach(f => f.activate());
        }
    }
    deactivate() {
        if (this.alive) {
            this.groups.forEach(f => f.deactivate());
        }
    }
}
FocusRoot.decorators = [
    { type: Injectable },
];
