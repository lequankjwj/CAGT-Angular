/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var step_template_directive_1 = require("./template-directives/step-template.directive");
var label_template_directive_1 = require("./template-directives/label-template.directive");
var util_1 = require("../common/util");
var indicator_template_directive_1 = require("./template-directives/indicator-template.directive");
var stepper_service_1 = require("./stepper.service");
var DEFAULT_ANIMATION_DURATION = 400;
/**
 * Represents the [Kendo UI Stepper component for Angular]({% slug overview_stepper %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-stepper [steps]="steps">
 *        </kendo-stepper>
 *    `
 * })
 * class AppComponent {
 *    public steps: Array<StepperStep> = [
 *      { label: 'Step One' }, { label: 'Step Two' }, { label: 'Step Three' }
 *    ];
 * }
 * ```
 */
var StepperComponent = /** @class */ (function () {
    function StepperComponent(renderer, elem, localization, stepperService) {
        var _this = this;
        this.renderer = renderer;
        this.elem = elem;
        this.localization = localization;
        this.stepperService = stepperService;
        this.hostClasses = true;
        this.ariaRole = 'navigation';
        this.displayStyle = 'grid';
        /**
         * Specifies the type of the steps in the Stepper.
         *
         * The possible values are:
         * * (Default) `indicator`
         * * `label`
         * * `full`
         */
        this.stepType = 'indicator';
        /**
         * Specifies the linear flow of the Stepper.
         *
         * @default true
         */
        this.linear = true;
        /**
         * Specifies the orientation of the Stepper
         * ([see example]({% slug orientation_stepper %})).
         *
         * The possible values are:
         * * (Default) `horizontal`
         * * `vertical`
         */
        this.orientation = 'horizontal';
        /**
         * Specifies the duration of the progress indicator animation in milliseconds. Defaults to `400ms`.
         *
         * The possible values are:
         *  * Boolean
         *    * (Default) `true`
         *    * false
         *  * Number
         */
        this.animation = true;
        /**
         * Fires when a step is about to be activated. This event is preventable.
         */
        this.activate = new core_1.EventEmitter();
        /**
         * Fires when the `currentStep` property of the component was updated.
         * Used to provide a two-way binding for the `currentStep` property.
         */
        this.currentStepChange = new core_1.EventEmitter();
        this._steps = [];
        this.dynamicRTLSubscription = this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.stepperService.owner = this;
    }
    Object.defineProperty(StepperComponent.prototype, "linearClass", {
        get: function () {
            return this.linear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "currentStep", {
        get: function () {
            return this.stepperService.currentStep;
        },
        /**
         * The index of the current step.
         */
        set: function (value) {
            this.stepperService.currentStep = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "steps", {
        get: function () {
            return this._steps;
        },
        /**
         * The collection of steps that will be rendered in the Stepper.
         * ([see example]({% slug step_appearance_stepper %}))
         */
        set: function (steps) {
            if (util_1.isPresent(steps) && steps.length > 0) {
                this._steps = steps;
            }
        },
        enumerable: true,
        configurable: true
    });
    StepperComponent.prototype.ngOnInit = function () {
        this.applyHostStyling();
    };
    StepperComponent.prototype.ngOnChanges = function (changes) {
        if (changes.steps && !changes.steps.firstChange) {
            this.applyHostStyling();
        }
    };
    StepperComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    /**
     * Manually triggers the validity check configured by the [isValid]({% slug api_layout_stepperstep %}#toc-isvalid) property of the steps.
     *
     * Steps that have their [validate]({% slug api_layout_stepperstep %}#toc-validate) property set to `false`, will not be validated.
     */
    StepperComponent.prototype.validateSteps = function () {
        this.stepperService.validateSteps();
    };
    StepperComponent.prototype.applyHostStyling = function () {
        var stepFramesStyle = this.orientation === 'horizontal' ? 'grid-template-columns' : 'grid-template-rows';
        var stepFramesValue = "repeat(" + this.steps.length * 2 + ", 1fr)";
        this.renderer.setStyle(this.elem.nativeElement, stepFramesStyle, stepFramesValue);
    };
    Object.defineProperty(StepperComponent.prototype, "progressAnimation", {
        /**
         * @hidden
         */
        get: function () {
            return { duration: this.animationDuration };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "animationDuration", {
        /**
         * @hidden
         */
        get: function () {
            if (typeof this.animation === 'number') {
                return this.animation;
            }
            if (typeof this.animation === 'boolean' && this.animation) {
                return DEFAULT_ANIMATION_DURATION;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "stepsListStyling", {
        /**
         * @hidden
         */
        get: function () {
            if (this.orientation === 'horizontal') {
                return { 'grid-column-start': 1, 'grid-column-end': -1 };
            }
            return { 'grid-row-start': 1, 'grid-row-end': -1 };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "progressBarStyling", {
        /**
         * @hidden
         */
        get: function () {
            if (this.orientation === 'horizontal') {
                return {
                    'grid-column-start': 2,
                    'grid-column-end': this.steps.length * 2
                };
            }
            return {
                'grid-row-start': 2,
                'grid-row-end': this.steps.length * 2
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "isHorizontal", {
        /***
         * @hidden
         */
        get: function () {
            return this.stepperService.isHorizontal;
        },
        enumerable: true,
        configurable: true
    });
    StepperComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoStepper',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        stepper_service_1.StepperService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.stepper'
                        }
                    ],
                    selector: 'kendo-stepper',
                    template: "\n        <ng-container kendoStepperLocalizedMessages\n            i18n-optional=\"kendo.stepper.optional|The text for the optional segment of the step label\"\n            optional=\"Optional\"\n         >\n        </ng-container>\n        <ol kendoStepperList\n            [stepType]='stepType'\n            [linear]='linear'\n            [orientation]='orientation'\n            [steps]='steps'\n            [currentStep]='currentStep'\n            [successIcon]='successIcon'\n            [errorIcon]='errorIcon'\n            [indicatorTemplate]='indicatorTemplate?.templateRef'\n            [labelTemplate]='labelTemplate?.templateRef'\n            [stepTemplate]='stepTemplate?.templateRef'\n            class='k-step-list'\n            [class.k-step-list-horizontal]='isHorizontal'\n            [class.k-step-list-vertical]='!isHorizontal'\n            [ngStyle]='stepsListStyling'>\n        </ol>\n\n        <kendo-progressbar *ngIf='steps.length > 0'\n            [attr.aria-hidden]='true'\n            [animation]='progressAnimation'\n            [max]='steps.length - 1'\n            [label]='false'\n            [orientation]='orientation'\n            [reverse]='!isHorizontal'\n            [value]='currentStep'\n            [ngStyle]='progressBarStyling'>\n        </kendo-progressbar>\n    "
                },] },
    ];
    /** @nocollapse */
    StepperComponent.ctorParameters = function () { return [
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: stepper_service_1.StepperService }
    ]; };
    StepperComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-stepper',] }],
        linearClass: [{ type: core_1.HostBinding, args: ['class.k-stepper-linear',] }],
        ariaRole: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        displayStyle: [{ type: core_1.HostBinding, args: ['style.display',] }],
        stepType: [{ type: core_1.Input }],
        linear: [{ type: core_1.Input }],
        orientation: [{ type: core_1.Input }],
        currentStep: [{ type: core_1.Input }],
        steps: [{ type: core_1.Input }],
        successIcon: [{ type: core_1.Input }],
        errorIcon: [{ type: core_1.Input }],
        animation: [{ type: core_1.Input }],
        activate: [{ type: core_1.Output }],
        currentStepChange: [{ type: core_1.Output }],
        stepTemplate: [{ type: core_1.ContentChild, args: [step_template_directive_1.StepperStepTemplateDirective, { static: true },] }],
        labelTemplate: [{ type: core_1.ContentChild, args: [label_template_directive_1.StepperLabelTemplateDirective, { static: true },] }],
        indicatorTemplate: [{ type: core_1.ContentChild, args: [indicator_template_directive_1.StepperIndicatorTemplateDirective, { static: true },] }]
    };
    return StepperComponent;
}());
exports.StepperComponent = StepperComponent;
