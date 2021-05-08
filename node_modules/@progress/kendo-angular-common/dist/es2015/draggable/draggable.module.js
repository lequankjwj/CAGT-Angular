/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { CommonModule } from '@angular/common';
/**
 * @hidden
 */
export class DraggableModule {
}
DraggableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DraggableDirective],
                exports: [DraggableDirective],
                imports: [CommonModule]
            },] },
];
