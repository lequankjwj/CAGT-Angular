/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class WindowContainerService {
    set container(container) {
        WindowContainerService.container = container;
    }
    get container() {
        return WindowContainerService.container;
    }
}
WindowContainerService.container = null;
WindowContainerService.decorators = [
    { type: Injectable },
];
