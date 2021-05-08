/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, Optional, TemplateRef } from '@angular/core';
import { PDFTemplateDirective as BaseDirective } from '@progress/kendo-angular-pdf-export';
/**
 * Represents the PDF page template of the TreeList that helps to customize the PDF pages. To define a page template,
 * nest an `<ng-template>` tag with the `kendoTreeListPDFTemplate` directive inside `<kendo-treelist-pdf>`.
 *
 * The template context provides the following fields:
 * - `pageNumber`&mdash;Defines PDF page number.
 * - `totalPages`&mdash;Defines the total number of PDF pages.
 *
 * {% meta height:550 %}
 * {% embed_file pdf-export/page-template-inline/app.component.ts preview %}
 * {% embed_file pdf-export/app.module.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% embed_file pdf-export/main.ts %}
 * {% endmeta %}
 */
var PDFTemplateDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PDFTemplateDirective, _super);
    function PDFTemplateDirective(templateRef) {
        return _super.call(this, templateRef) || this;
    }
    PDFTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListPDFTemplate]'
                },] },
    ];
    /** @nocollapse */
    PDFTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PDFTemplateDirective;
}(BaseDirective));
export { PDFTemplateDirective };
