/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents a template that defines the content of the Step indicator.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperIndicatorTemplate` directive inside the `<kendo-stepper>` tag.
 */
var StepperIndicatorTemplateDirective = /** @class */ (function () {
    function StepperIndicatorTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    StepperIndicatorTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoStepperIndicatorTemplate]'
                },] },
    ];
    /** @nocollapse */
    StepperIndicatorTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return StepperIndicatorTemplateDirective;
}());
exports.StepperIndicatorTemplateDirective = StepperIndicatorTemplateDirective;
