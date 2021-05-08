/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgZone, ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
/**
 * @hidden
 * move to kendo-common
 */
export declare class BrowserSupportService implements OnDestroy {
    private zone;
    private changeDetector;
    changes: EventEmitter<any>;
    private subscriptions;
    constructor(zone: NgZone, changeDetector: ChangeDetectorRef);
    ngOnDestroy(): void;
    readonly scrollbarWidth: number;
    readonly rtlScrollLeft: number;
}
