/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Orientation } from '../common/orientation';
/**
 * Represents the [Kendo UI Card component for Angular]({% slug overview_card %})
 */
export declare class CardComponent implements OnDestroy {
    private localizationService;
    hostClass: boolean;
    readonly widthStyle: string;
    readonly vertical: boolean;
    readonly horizontal: boolean;
    /**
     * @hidden
     */
    direction: string;
    /**
     * Specifies the layout of the Card content.
     *
     * The possible values are:
     * * (Default) `vertical`
     * * `horizontal`
     *
     */
    orientation: Orientation;
    /**
     * Defines the width of the Card.
     * Defaults to `285px`.
     */
    width: string;
    private dynamicRTLSubscription;
    private rtl;
    constructor(localizationService: LocalizationService);
    ngOnDestroy(): void;
}
