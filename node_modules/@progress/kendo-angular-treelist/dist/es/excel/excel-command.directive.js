/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
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
var ExcelCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ExcelCommandDirective, _super);
    function ExcelCommandDirective(excelService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.excelService = excelService;
        _this.ngZone = ngZone;
        return _this;
    }
    /**
     * @hidden
     */
    ExcelCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.excelService.exportClick.emit();
    };
    Object.defineProperty(ExcelCommandDirective.prototype, "excelClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    ExcelCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListExcelCommand]'
                },] },
    ];
    /** @nocollapse */
    ExcelCommandDirective.ctorParameters = function () { return [
        { type: ExcelService },
        { type: ElementRef },
        { type: Renderer },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    ExcelCommandDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        excelClass: [{ type: HostBinding, args: ['class.k-grid-excel',] }]
    };
    return ExcelCommandDirective;
}(Button));
export { ExcelCommandDirective };
