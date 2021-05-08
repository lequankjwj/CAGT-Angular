/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dom_queries_1 = require("../common/dom-queries");
var constants_1 = require("../stepper/models/constants");
var stepper_service_1 = require("./stepper.service");
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
                if (dom_queries_1.hasClass(e.target, 'k-step-link')) {
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
        var step = dom_queries_1.closestItem(target, constants_1.STEPPER_STEP_INDEX, this.element.nativeElement);
        if (step) {
            return dom_queries_1.itemIndex(step, constants_1.STEPPER_STEP_INDEX);
        }
    };
    StepperListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoStepperList]',
                    template: "\n        <ng-container *ngFor='let step of steps; let idx = index'>\n            <li kendoStepperStep\n                [attr." + constants_1.STEPPER_STEP_INDEX + "]='idx'\n                [type]='stepType'\n                [step]='step'\n                [index]='idx'\n                [current]='currentStep'\n                [successIcon]='successIcon'\n                [errorIcon]='errorIcon'\n                [indicatorTemplate]='indicatorTemplate'\n                [labelTemplate]='labelTemplate'\n                [stepTemplate]='stepTemplate'\n                class='k-step'\n                [class.k-step-first]='idx === 0'\n                [class.k-step-last]='idx === steps.length - 1'\n                [class.k-step-done]='idx < currentStep'\n                [class.k-step-current]='idx === currentStep'\n                [class.k-step-optional]='step.optional'\n                [class.k-step-disabled]='step.disabled'\n                [ngClass]='step.cssClass'\n                [ngStyle]='step.cssStyle'\n                [style.max-width.%] = 'maxStepWidth'\n                [style.max-height.%] = 'maxStepHeight'\n            >\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    StepperListComponent.ctorParameters = function () { return [
        { type: core_1.Renderer2 },
        { type: core_1.NgZone },
        { type: stepper_service_1.StepperService },
        { type: core_1.ElementRef }
    ]; };
    StepperListComponent.propDecorators = {
        linear: [{ type: core_1.Input }],
        stepType: [{ type: core_1.Input }],
        orientation: [{ type: core_1.Input }],
        currentStep: [{ type: core_1.Input }],
        steps: [{ type: core_1.Input }],
        successIcon: [{ type: core_1.Input }],
        errorIcon: [{ type: core_1.Input }],
        indicatorTemplate: [{ type: core_1.Input }],
        labelTemplate: [{ type: core_1.Input }],
        stepTemplate: [{ type: core_1.Input }]
    };
    return StepperListComponent;
}());
exports.StepperListComponent = StepperListComponent;
