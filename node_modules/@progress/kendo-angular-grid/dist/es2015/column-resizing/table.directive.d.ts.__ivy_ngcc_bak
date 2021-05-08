/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ColumnResizingService } from './column-resizing.service';
/**
 * @hidden
 */
export declare class TableDirective implements OnInit, OnDestroy {
    private element;
    private renderer;
    private service;
    private zone;
    private cdr;
    locked: boolean;
    virtualColumns: boolean;
    readonly minWidth: number | null;
    private originalWidth;
    private firstResize;
    private subscription;
    private autoFitSubscription;
    constructor(element: ElementRef, renderer: Renderer2, service: ColumnResizingService, zone: NgZone, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private initState;
    private resize;
    private autoFitObservable;
    private measureColumn;
}
