/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from "@angular/core";
/**
 * @hidden
 */
export class OptionChangesService {
    constructor() {
        this.columns = new EventEmitter();
        this.options = new EventEmitter();
    }
    optionChanged() {
        this.options.emit();
    }
    columnChanged() {
        this.columns.emit();
    }
}
OptionChangesService.decorators = [
    { type: Injectable },
];
