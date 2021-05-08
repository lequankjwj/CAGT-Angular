/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare const toJSON: (xs: FilterOperatorBase[]) => {
    text: string;
    value: string;
}[];
/**
 * @hidden
 */
export declare class FilterOperatorBase {
    protected operator: string;
    protected localization: LocalizationService;
    /**
     * The text that will be displayed in the drop-down list.
     * @readonly
     * @type {string}
     * @memberOf FilterOperatorBase
     */
    /**
    *
    */
    text: string;
    private messages;
    private _text;
    constructor(operator: string, localization: LocalizationService);
    /**
     * @hidden
     */
    toJSON(): {
        text: string;
        value: string;
    };
    protected refreshText(): void;
}
