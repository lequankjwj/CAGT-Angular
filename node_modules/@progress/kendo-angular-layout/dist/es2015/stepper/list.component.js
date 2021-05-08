/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, Input, NgZone, Renderer2, TemplateRef } from "@angular/core";
import { closestItem, itemIndex, hasClass } from '../common/dom-queries';
import { STEPPER_STEP_INDEX } from '../stepper/models/constants';
import { StepperService } from './stepper.service';
/**
 * @hidden
 */
export class StepperListComponent {
    constructor(renderer, ngZone, service, element) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.service = service;
        this.element = element;
    }
    ngOnInit() {
        this.initDomEvents();
    }
    ngOnDestroy() {
        if (this.domSubs) {
            this.domSubs();
        }
    }
    get maxStepWidth() {
        return this.maxStepDimension('width');
    }
    get maxStepHeight() {
        return this.maxStepDimension('height');
    }
    maxStepDimension(dimension) {
        if (dimension === 'width' && this.orientation === 'vertical') {
            return null;
        }
        if (dimension === 'height' && this.orientation === 'horizontal') {
            return null;
        }
        return 100 / this.steps.length;
    }
    initDomEvents() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            const nativeElement = this.element.nativeElement;
            const clickSubscription = this.renderer.listen(nativeElement, 'click', this.clickHandler.bind(this));
            const keydownSubscription = this.renderer.listen(nativeElement, 'keydown', (e) => {
                if (hasClass(e.target, 'k-step-link')) {
                    this.service.keydown(e);
                }
            });
            this.domSubs = () => {
                clickSubscription();
                keydownSubscription();
            };
        });
    }
    clickHandler(e) {
        e.preventDefault();
        const stepIdx = this.getStepIndex(e.target);
        const step = this.steps[stepIdx];
        if (!step || step.disabled) {
            return;
        }
        if (stepIdx === this.currentStep) {
            this.service.focus(stepIdx);
            return;
        }
        if (this.linear && this.service.isPrevOrNextStep(stepIdx) === false) {
            return;
        }
        this.service.onActivate(stepIdx, e);
    }
    getStepIndex(target) {
        const step = closestItem(target, STEPPER_STEP_INDEX, this.element.nativeElement);
        if (step) {
            return itemIndex(step, STEPPER_STEP_INDEX);
        }
    }
}
StepperListComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoStepperList]',
                template: `
        <ng-container *ngFor='let step of steps; let idx = index'>
            <li kendoStepperStep
                [attr.${STEPPER_STEP_INDEX}]='idx'
                [type]='stepType'
                [step]='step'
                [index]='idx'
                [current]='currentStep'
                [successIcon]='successIcon'
                [errorIcon]='errorIcon'
                [indicatorTemplate]='indicatorTemplate'
                [labelTemplate]='labelTemplate'
                [stepTemplate]='stepTemplate'
                class='k-step'
                [class.k-step-first]='idx === 0'
                [class.k-step-last]='idx === steps.length - 1'
                [class.k-step-done]='idx < currentStep'
                [class.k-step-current]='idx === currentStep'
                [class.k-step-optional]='step.optional'
                [class.k-step-disabled]='step.disabled'
                [ngClass]='step.cssClass'
                [ngStyle]='step.cssStyle'
                [style.max-width.%] = 'maxStepWidth'
                [style.max-height.%] = 'maxStepHeight'
            >
            </li>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
StepperListComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: StepperService },
    { type: ElementRef }
];
StepperListComponent.propDecorators = {
    linear: [{ type: Input }],
    stepType: [{ type: Input }],
    orientation: [{ type: Input }],
    currentStep: [{ type: Input }],
    steps: [{ type: Input }],
    successIcon: [{ type: Input }],
    errorIcon: [{ type: Input }],
    indicatorTemplate: [{ type: Input }],
    labelTemplate: [{ type: Input }],
    stepTemplate: [{ type: Input }]
};
