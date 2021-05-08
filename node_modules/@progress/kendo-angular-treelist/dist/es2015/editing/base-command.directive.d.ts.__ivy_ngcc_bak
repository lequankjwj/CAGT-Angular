/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
/**
 * @hidden
 */
export declare abstract class BaseCommandDirective extends Button {
    protected editService: EditService;
    /**
     * @hidden
     */
    readonly visible: string;
    abstract cellContext: any;
    protected abstract readVisible: boolean;
    protected abstract onClick(): void;
    protected readonly isEdited: boolean;
    protected readonly dataItem: boolean;
    /**
     * @hidden
     */
    clickHandler(e: any): void;
    constructor(editService: EditService, element: ElementRef, renderer: Renderer2, localization: LocalizationService, ngZone: NgZone);
}
