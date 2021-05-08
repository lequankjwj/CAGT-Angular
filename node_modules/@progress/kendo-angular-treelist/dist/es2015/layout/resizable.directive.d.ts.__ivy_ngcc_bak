/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { TreeListComponent } from '../treelist.component';
import { ResizeService } from "./resize.service";
/**
 * @hidden
 */
export declare class ResizableContainerDirective implements OnDestroy {
    private el;
    private renderer;
    private resizeService;
    private treelist?;
    private _lockedWidth;
    lockedWidth: number;
    kendoTreeListResizableContainer: boolean;
    private enabled;
    private resizeSubscription;
    constructor(el: ElementRef, renderer: Renderer2, resizeService: ResizeService, treelist?: TreeListComponent);
    ngOnDestroy(): void;
    private attachResize;
    private resize;
}
