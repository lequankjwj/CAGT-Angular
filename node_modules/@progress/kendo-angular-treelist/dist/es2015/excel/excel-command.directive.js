/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, HostBinding, ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ExcelService } from './excel.service';
/**
 * Represents the `export-to-Excel` command of the TreeList. You can apply this
 * directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_treelist_commandcolumncomponent %}).
 * When the user clicks a button associated with the directive, the
 * [`excelExport`]({% slug api_treelist_treelistcomponent %}#toc-excelexport) event
 * fires ([see example]({% slug excelexport_treelist %})).
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *      <ng-template kendoTreeListToolbarTemplate>
 *          <button kendoTreeListExcelCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-treelist-excel fileName="TreeList.xlsx">
 *      </kendo-treelist-excel>
 * </kendo-treelist>
 * ```
 */
export class ExcelCommandDirective extends Button {
    constructor(excelService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.excelService = excelService;
        this.ngZone = ngZone;
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.excelService.exportClick.emit();
    }
    /**
     * @hidden
     */
    get excelClass() {
        return true;
    }
}
ExcelCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListExcelCommand]'
            },] },
];
/** @nocollapse */
ExcelCommandDirective.ctorParameters = () => [
    { type: ExcelService },
    { type: ElementRef },
    { type: Renderer },
    { type: LocalizationService },
    { type: NgZone }
];
ExcelCommandDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    excelClass: [{ type: HostBinding, args: ['class.k-grid-excel',] }]
};
