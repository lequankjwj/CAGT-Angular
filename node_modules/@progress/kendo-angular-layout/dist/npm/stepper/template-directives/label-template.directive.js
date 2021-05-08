/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents a template that defines the content of the Step label.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperLabelTemplate` directive inside the `<kendo-stepper>` tag.
 */
var StepperLabelTemplateDirective = /** @class */ (function () {
    function StepperLabelTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    StepperLabelTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoStepperLabelTemplate]'
                },] },
    ];
    /** @nocollapse */
    StepperLabelTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return StepperLabelTemplateDirective;
}());
exports.StepperLabelTemplateDirective = StepperLabelTemplateDirective;
