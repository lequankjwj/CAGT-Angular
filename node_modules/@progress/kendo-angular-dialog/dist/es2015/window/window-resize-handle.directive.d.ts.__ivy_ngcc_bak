/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { DragResizeService } from './drag-resize.service';
/**
 * @hidden
 */
export declare class ResizeHandleDirective implements OnInit, OnDestroy {
    draggable: DraggableDirective;
    private el;
    private renderer;
    private service;
    direction: string;
    readonly hostClass: boolean;
    private subscriptions;
    constructor(draggable: DraggableDirective, el: ElementRef, renderer: Renderer2, service: DragResizeService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setDisplay;
}
