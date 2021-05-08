/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Optional, TemplateRef } from '@angular/core';
/**
 * Represents a template that defines the content of the Step label.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperLabelTemplate` directive inside the `<kendo-stepper>` tag.
 */
export class StepperLabelTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
StepperLabelTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoStepperLabelTemplate]'
            },] },
];
/** @nocollapse */
StepperLabelTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
