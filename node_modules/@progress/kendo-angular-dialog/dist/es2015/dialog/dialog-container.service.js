/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class DialogContainerService {
    set container(container) {
        DialogContainerService.container = container;
    }
    get container() {
        return DialogContainerService.container;
    }
}
DialogContainerService.container = null;
DialogContainerService.decorators = [
    { type: Injectable },
];
