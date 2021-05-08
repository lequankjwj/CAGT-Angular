/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PreventableEvent } from '../common/preventable-event';
/**
 * Represents the [Kendo UI DialogTitleBar component for Angular]({% slug api_dialog_dialogtitlebarcomponent %}).
 *
 * It is used as part of the Dialog content when the component is created dynamically by using an [Angular service]({% slug service_dialog %}).
 */
export declare class DialogTitleBarComponent {
    private hostElement;
    private localizationService;
    /**
     * Fires when the close button of the title-bar is clicked.
     */
    close: EventEmitter<PreventableEvent>;
    /**
     * @hidden
     */
    id: string;
    /**
     * @hidden
     */
    closeTitle: string;
    readonly className: true;
    constructor(hostElement: ElementRef, localizationService: LocalizationService);
    readonly closeButtonTitle: string;
    ngAfterViewChecked(): void;
    /**
     * @hidden
     */
    onCloseClick(e: Event): void;
}
