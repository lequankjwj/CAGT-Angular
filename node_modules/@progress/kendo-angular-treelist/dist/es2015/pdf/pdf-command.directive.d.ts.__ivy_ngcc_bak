/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PDFService } from './pdf.service';
/**
 * Represents the `export-to-PDF` command of the TreeList.
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_treelist_commandcolumncomponent %}).
 * When the user clicks a button that is associated with the directive, the
 * [`pdfExport`]({% slug api_treelist_treelistcomponent %}#toc-pdfexport) event
 * fires ([see example]({% slug pdfexport_treelist %})).
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *      <ng-template kendoTreeListToolbarTemplate>
 *          <button kendoTreeListPDFCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-treelist-pdf fileName="TreeList.pdf">
 *      </kendo-treelist-pdf>
 * </kendo-treelist>
 * ```
 */
export declare class PDFCommandDirective extends Button {
    private pdfService;
    /**
     * @hidden
     */
    onClick(e: any): void;
    /**
     * @hidden
     */
    readonly pdfClass: boolean;
    constructor(pdfService: PDFService, element: ElementRef, renderer: Renderer, localization: LocalizationService, ngZone: NgZone);
}
