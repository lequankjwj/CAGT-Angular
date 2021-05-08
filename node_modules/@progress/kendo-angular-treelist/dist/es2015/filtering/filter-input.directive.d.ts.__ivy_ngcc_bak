/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, AfterViewInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * @hidden
 */
export declare class FilterInputDirective implements AfterViewInit, OnDestroy, OnChanges {
    change: EventEmitter<string>;
    composing: boolean;
    filterDelay: number;
    value: string;
    disabled: boolean;
    private accessor;
    private changeRequests;
    private changeRequestsSubscription;
    private unsubscribeEvents;
    constructor(valueAccessors: ControlValueAccessor[], ngZone: NgZone, element: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    private subscribeChanges;
    private unsubscribeChanges;
}
