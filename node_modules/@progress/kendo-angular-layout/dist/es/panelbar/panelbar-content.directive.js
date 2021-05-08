/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef } from '@angular/core';
/**
 * Represents the content template of the declaratively initialized PanelBar items.
 * The content can be expanded or collapsed through the item.
 */
var PanelBarContentDirective = /** @class */ (function () {
    function PanelBarContentDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[kendoPanelBarContent]"
                },] },
    ];
    /** @nocollapse */
    PanelBarContentDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return PanelBarContentDirective;
}());
export { PanelBarContentDirective };
