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
var StepperListComponent = /** @class */ (function () {
    function StepperListComponent(renderer, ngZone, service, element) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.service = service;
        this.element = element;
    }
    StepperListComponent.prototype.ngOnInit = function () {
        this.initDomEvents();
    };
    StepperListComponent.prototype.ngOnDestroy = function () {
        if (this.domSubs) {
            this.domSubs();
        }
    };
    Object.defineProperty(StepperListComponent.prototype, "maxStepWidth", {
        get: function () {
            return this.maxStepDimension('width');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperListComponent.prototype, "maxStepHeight", {
        get: function () {
            return this.maxStepDimension('height');
        },
        enumerable: true,
        configurable: true
    });
    StepperListComponent.prototype.maxStepDimension = function (dimension) {
        if (dimension === 'width' && this.orientation === 'vertical') {
            return null;
        }
        if (dimension === 'height' && this.orientation === 'horizontal') {
            return null;
        }
        return 100 / this.steps.length;
    };
    StepperListComponent.prototype.initDomEvents = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            var nativeElement = _this.element.nativeElement;
            var clickSubscription = _this.renderer.listen(nativeElement, 'click', _this.clickHandler.bind(_this));
            var keydownSubscription = _this.renderer.listen(nativeElement, 'keydown', function (e) {
                if (hasClass(e.target, 'k-step-link')) {
                    _this.service.keydown(e);
                }
            });
            _this.domSubs = function () {
                clickSubscription();
                keydownSubscription();
            };
        });
    };
    StepperListComponent.prototype.clickHandler = function (e) {
        e.preventDefault();
        var stepIdx = this.getStepIndex(e.target);
        var step = this.steps[stepIdx];
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
    };
    StepperListComponent.prototype.getStepIndex = function (target) {
        var step = closestItem(target, STEPPER_STEP_INDEX, this.element.nativeElement);
        if (step) {
            return itemIndex(step, STEPPER_STEP_INDEX);
        }
    };
    StepperListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoStepperList]',
                    template: "\n        <ng-container *ngFor='let step of steps; let idx = index'>\n            <li kendoStepperStep\n                [attr." + STEPPER_STEP_INDEX + "]='idx'\n                [type]='stepType'\n                [step]='step'\n                [index]='idx'\n                [current]='currentStep'\n                [successIcon]='successIcon'\n                [errorIcon]='errorIcon'\n                [indicatorTemplate]='indicatorTemplate'\n                [labelTemplate]='labelTemplate'\n                [stepTemplate]='stepTemplate'\n                class='k-step'\n                [class.k-step-first]='idx === 0'\n                [class.k-step-last]='idx === steps.length - 1'\n                [class.k-step-done]='idx < currentStep'\n                [class.k-step-current]='idx === currentStep'\n                [class.k-step-optional]='step.optional'\n                [class.k-step-disabled]='step.disabled'\n                [ngClass]='step.cssClass'\n                [ngStyle]='step.cssStyle'\n                [style.max-width.%] = 'maxStepWidth'\n                [style.max-height.%] = 'maxStepHeight'\n            >\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    StepperListComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NgZone },
        { type: StepperService },
        { type: ElementRef }
    ]; };
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
    return StepperListComponent;
}());
export { StepperListComponent };
