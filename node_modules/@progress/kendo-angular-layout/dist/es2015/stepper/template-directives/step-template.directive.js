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
export class StepperStepTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
StepperStepTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoStepperStepTemplate]'
            },] },
];
/** @nocollapse */
StepperStepTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
