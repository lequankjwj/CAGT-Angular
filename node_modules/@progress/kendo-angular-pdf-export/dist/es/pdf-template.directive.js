/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
var PDFTemplateDirective = /** @class */ (function () {
    function PDFTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PDFTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPDFTemplate]'
                },] },
    ];
    /** @nocollapse */
    PDFTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PDFTemplateDirective;
}());
export { PDFTemplateDirective };
