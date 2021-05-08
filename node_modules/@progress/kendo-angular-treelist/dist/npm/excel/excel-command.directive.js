/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var excel_service_1 = require("./excel.service");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeListExcelCommand]'
                },] },
    ];
    /** @nocollapse */
    ExcelCommandDirective.ctorParameters = function () { return [
        { type: excel_service_1.ExcelService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    ExcelCommandDirective.propDecorators = {
        onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }],
        excelClass: [{ type: core_1.HostBinding, args: ['class.k-grid-excel',] }]
    };
    return ExcelCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.ExcelCommandDirective = ExcelCommandDirective;
