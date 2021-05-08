/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone, OnDestroy, OnInit, Renderer2, TemplateRef, ChangeDetectorRef } from "@angular/core";
import { DrawerService } from './drawer.service';
/**
 * @hidden
 */
export declare class DrawerListComponent implements OnInit, OnDestroy {
    private drawerService;
    private renderer;
    private ngZone;
    private changeDetector;
    element: ElementRef;
    items: any[];
    itemTemplate: TemplateRef<any>;
    mini: boolean;
    expanded: boolean;
    private subscriptions;
    constructor(drawerService: DrawerService, renderer: Renderer2, ngZone: NgZone, changeDetector: ChangeDetectorRef, element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private initialSelection;
    private initDomEvents;
    private clickHandler;
    private keyDownHandler;
    private getDrawerItemIndex;
}
