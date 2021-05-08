/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone, Renderer2, EventEmitter, OnInit, OnDestroy } from '@angular/core';
/**
 * @hidden
 */
export declare class ColumnListComponent implements OnInit, OnDestroy {
    private element;
    private ngZone;
    private renderer;
    readonly className: boolean;
    reset: EventEmitter<any>;
    apply: EventEmitter<any>;
    columnChange: EventEmitter<any>;
    columns: any[];
    autoSync: boolean;
    allowHideAll: boolean;
    applyText: string;
    resetText: string;
    actionsClass: string;
    private hasLocked;
    private hasVisibleLocked;
    private unlockedCount;
    private hasUnlockedFiltered;
    private hasFiltered;
    private _columns;
    private allColumns;
    private domSubscriptions;
    constructor(element: ElementRef, ngZone: NgZone, renderer: Renderer2);
    isDisabled(column: any): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    cancelChanges(): void;
    applyChanges(): void;
    private forEachCheckBox;
    private updateDisabled;
    private updateColumnState;
}
