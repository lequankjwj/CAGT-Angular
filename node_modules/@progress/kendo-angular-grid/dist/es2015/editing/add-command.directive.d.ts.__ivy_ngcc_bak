/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
/**
 * Represents the command for adding a new item to the Grid. You can apply this directive to any
 * `button` element inside a [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`add`]({% slug api_grid_gridcomponent %}#toc-add) event is triggered
 * ([see example]({% slug editing_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *    <ng-template kendoGridToolbarTemplate>
 *       <button kendoGridAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-grid>
 * ```
 */
export declare class AddCommandDirective extends Button {
    private editService;
    /**
     * @hidden
     */
    onClick(e: any): void;
    /**
     * @hidden
     */
    readonly commandClass: boolean;
    constructor(editService: EditService, element: ElementRef, renderer: Renderer, localization: LocalizationService, ngZone: NgZone);
}
