/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class SuspendService {
    constructor() {
        this.scroll = false;
    }
}
SuspendService.decorators = [
    { type: Injectable },
];
