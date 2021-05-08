/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, HostListener, HostBinding, ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
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
var PDFCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PDFCommandDirective, _super);
    function PDFCommandDirective(pdfService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.pdfService = pdfService;
        _this.ngZone = ngZone;
        return _this;
    }
    /**
     * @hidden
     */
    PDFCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    };
    Object.defineProperty(PDFCommandDirective.prototype, "pdfClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    PDFCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListPDFCommand]'
                },] },
    ];
    /** @nocollapse */
    PDFCommandDirective.ctorParameters = function () { return [
        { type: PDFService },
        { type: ElementRef },
        { type: Renderer },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    PDFCommandDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        pdfClass: [{ type: HostBinding, args: ['class.k-grid-pdf',] }]
    };
    return PDFCommandDirective;
}(Button));
export { PDFCommandDirective };
