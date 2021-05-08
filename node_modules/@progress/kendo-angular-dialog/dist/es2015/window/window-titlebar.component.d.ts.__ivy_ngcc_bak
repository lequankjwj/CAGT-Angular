/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, OnInit, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { DragResizeService } from './drag-resize.service';
export declare class WindowTitleBarComponent implements OnInit, OnDestroy {
    el: ElementRef;
    private ngZone;
    /**
     * @hidden
     */
    template: TemplateRef<any>;
    /**
     * @hidden
     */
    service: DragResizeService;
    private dragDirective;
    private dragSubscription;
    private stateSubscription;
    constructor(el: ElementRef, service: DragResizeService, ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    subscribeDrag(): void;
    /**
     * @hidden
     */
    subscribeStateChange(): void;
    /**
     * @hidden
     */
    unsubscribeDrag(): void;
    /**
     * @hidden
     */
    unsubscribeState(): void;
    readonly className: true;
    readonly touchAction: string;
    /**
     * @hidden
     */
    handle(ev: MouseEvent): void;
    protected readonly isDraggable: boolean;
}
