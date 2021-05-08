/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the content template of the declaratively initialized PanelBar items.
 * The content can be expanded or collapsed through the item.
 */
var PanelBarContentDirective = /** @class */ (function () {
    function PanelBarContentDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarContentDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[kendoPanelBarContent]"
                },] },
    ];
    /** @nocollapse */
    PanelBarContentDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return PanelBarContentDirective;
}());
exports.PanelBarContentDirective = PanelBarContentDirective;
