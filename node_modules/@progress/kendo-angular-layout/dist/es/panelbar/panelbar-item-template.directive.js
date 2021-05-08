/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the template directive of the PanelBar which helps to customize the item content.
 */
var PanelBarItemTemplateDirective = /** @class */ (function () {
    function PanelBarItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPanelBarItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    PanelBarItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PanelBarItemTemplateDirective;
}());
export { PanelBarItemTemplateDirective };
