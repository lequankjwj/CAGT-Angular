/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { DropTargetDirective } from './drop-target.directive';
import { DraggableColumnDirective } from './draggable-column.directive';
/**
 * @hidden
 */
export declare class DragAndDropService {
    changes: EventEmitter<any>;
    private register;
    private lastTarget;
    add(target: DropTargetDirective): void;
    remove(target: DropTargetDirective): void;
    notifyDrag(draggable: DraggableColumnDirective, element: any, mouseEvent: any): void;
    notifyDrop(draggable: DraggableColumnDirective, mouseEvent: any): void;
    private targetFor;
}
