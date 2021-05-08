/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents a template that defines the content of the whole Step.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperStepTemplate` directive inside the `<kendo-stepper>` tag.
 */
var StepperStepTemplateDirective = /** @class */ (function () {
    function StepperStepTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    StepperStepTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoStepperStepTemplate]'
                },] },
    ];
    /** @nocollapse */
    StepperStepTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return StepperStepTemplateDirective;
}());
exports.StepperStepTemplateDirective = StepperStepTemplateDirective;
