/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { DragAndDropContext } from './context-types';
/**
 * @hidden
 */
export declare class DropTargetDirective implements OnInit, OnDestroy {
    element: ElementRef;
    private service;
    context: DragAndDropContext;
    enter: EventEmitter<any>;
    leave: EventEmitter<any>;
    drop: EventEmitter<any>;
    private subscriptions;
    constructor(element: ElementRef, service: DragAndDropService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private eventArgs;
}
