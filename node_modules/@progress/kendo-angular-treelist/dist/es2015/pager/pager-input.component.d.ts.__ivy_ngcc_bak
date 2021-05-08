/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NumericTextBoxComponent } from '@progress/kendo-angular-inputs';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { PagerContextService, PagerContextChanges } from "./pager-context.service";
/**
 * Displays an input element which allows the typing and rendering of page numbers.
 */
export declare class PagerInputComponent extends PagerElementComponent {
    protected pagerContext: PagerContextService;
    private zone;
    numericInput: NumericTextBoxComponent;
    constructor(localization: LocalizationService, pagerContext: PagerContextService, zone: NgZone, cd: ChangeDetectorRef);
    /**
     * @hidden
     *
     * @param {string} value
     *
     * @memberOf PagerInputComponent
     */
    handleKeyDown: (event: KeyboardEvent) => void;
    /**
     * @hidden
     *
     * @param {string} value
     *
     * @memberOf PagerInputComponent
     */
    handleBlur: () => void;
    /**
     * @hidden
     */
    readonly current: number;
    readonly hasPages: boolean;
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
}
