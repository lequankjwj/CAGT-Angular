/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the template directive of the PanelBar which helps to customize the item content.
 */
var PanelBarItemTemplateDirective = /** @class */ (function () {
    function PanelBarItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarItemTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoPanelBarItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    PanelBarItemTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return PanelBarItemTemplateDirective;
}());
exports.PanelBarItemTemplateDirective = PanelBarItemTemplateDirective;
