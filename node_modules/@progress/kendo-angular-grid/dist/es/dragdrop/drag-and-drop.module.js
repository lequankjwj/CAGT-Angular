/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { DraggableColumnDirective } from './draggable-column.directive';
import { DropTargetDirective } from './drop-target.directive';
var exported = [
    DraggableColumnDirective,
    DropTargetDirective
];
/**
 * @hidden
 */
var DragAndDropModule = /** @class */ (function () {
    function DragAndDropModule() {
    }
    DragAndDropModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exported],
                    exports: [exported]
                },] },
    ];
    return DragAndDropModule;
}());
export { DragAndDropModule };
