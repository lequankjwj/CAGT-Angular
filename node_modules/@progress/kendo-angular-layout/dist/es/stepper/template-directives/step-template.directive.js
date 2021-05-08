/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
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
        { type: Directive, args: [{
                    selector: '[kendoStepperStepTemplate]'
                },] },
    ];
    /** @nocollapse */
    StepperStepTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return StepperStepTemplateDirective;
}());
export { StepperStepTemplateDirective };
