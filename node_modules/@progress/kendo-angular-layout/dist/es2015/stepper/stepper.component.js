/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, ContentChild, Renderer2, ElementRef } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { StepperStepTemplateDirective } from './template-directives/step-template.directive';
import { StepperLabelTemplateDirective } from './template-directives/label-template.directive';
import { isPresent } from '../common/util';
import { StepperIndicatorTemplateDirective } from './template-directives/indicator-template.directive';
import { StepperService } from './stepper.service';
const DEFAULT_ANIMATION_DURATION = 400;
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
export class StepperComponent {
    constructor(renderer, elem, localization, stepperService) {
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
        this.activate = new EventEmitter();
        /**
         * Fires when the `currentStep` property of the component was updated.
         * Used to provide a two-way binding for the `currentStep` property.
         */
        this.currentStepChange = new EventEmitter();
        this._steps = [];
        this.dynamicRTLSubscription = this.localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.stepperService.owner = this;
    }
    get linearClass() {
        return this.linear;
    }
    /**
     * The index of the current step.
     */
    set currentStep(value) {
        this.stepperService.currentStep = value;
    }
    get currentStep() {
        return this.stepperService.currentStep;
    }
    /**
     * The collection of steps that will be rendered in the Stepper.
     * ([see example]({% slug step_appearance_stepper %}))
     */
    set steps(steps) {
        if (isPresent(steps) && steps.length > 0) {
            this._steps = steps;
        }
    }
    get steps() {
        return this._steps;
    }
    ngOnInit() {
        this.applyHostStyling();
    }
    ngOnChanges(changes) {
        if (changes.steps && !changes.steps.firstChange) {
            this.applyHostStyling();
        }
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    /**
     * Manually triggers the validity check configured by the [isValid]({% slug api_layout_stepperstep %}#toc-isvalid) property of the steps.
     *
     * Steps that have their [validate]({% slug api_layout_stepperstep %}#toc-validate) property set to `false`, will not be validated.
     */
    validateSteps() {
        this.stepperService.validateSteps();
    }
    applyHostStyling() {
        const stepFramesStyle = this.orientation === 'horizontal' ? 'grid-template-columns' : 'grid-template-rows';
        const stepFramesValue = `repeat(${this.steps.length * 2}, 1fr)`;
        this.renderer.setStyle(this.elem.nativeElement, stepFramesStyle, stepFramesValue);
    }
    /**
     * @hidden
     */
    get progressAnimation() {
        return { duration: this.animationDuration };
    }
    /**
     * @hidden
     */
    get animationDuration() {
        if (typeof this.animation === 'number') {
            return this.animation;
        }
        if (typeof this.animation === 'boolean' && this.animation) {
            return DEFAULT_ANIMATION_DURATION;
        }
        return 0;
    }
    /**
     * @hidden
     */
    get stepsListStyling() {
        if (this.orientation === 'horizontal') {
            return { 'grid-column-start': 1, 'grid-column-end': -1 };
        }
        return { 'grid-row-start': 1, 'grid-row-end': -1 };
    }
    /**
     * @hidden
     */
    get progressBarStyling() {
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
    }
    /***
     * @hidden
     */
    get isHorizontal() {
        return this.stepperService.isHorizontal;
    }
}
StepperComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoStepper',
                providers: [
                    LocalizationService,
                    StepperService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.stepper'
                    }
                ],
                selector: 'kendo-stepper',
                template: `
        <ng-container kendoStepperLocalizedMessages
            i18n-optional="kendo.stepper.optional|The text for the optional segment of the step label"
            optional="Optional"
         >
        </ng-container>
        <ol kendoStepperList
            [stepType]='stepType'
            [linear]='linear'
            [orientation]='orientation'
            [steps]='steps'
            [currentStep]='currentStep'
            [successIcon]='successIcon'
            [errorIcon]='errorIcon'
            [indicatorTemplate]='indicatorTemplate?.templateRef'
            [labelTemplate]='labelTemplate?.templateRef'
            [stepTemplate]='stepTemplate?.templateRef'
            class='k-step-list'
            [class.k-step-list-horizontal]='isHorizontal'
            [class.k-step-list-vertical]='!isHorizontal'
            [ngStyle]='stepsListStyling'>
        </ol>

        <kendo-progressbar *ngIf='steps.length > 0'
            [attr.aria-hidden]='true'
            [animation]='progressAnimation'
            [max]='steps.length - 1'
            [label]='false'
            [orientation]='orientation'
            [reverse]='!isHorizontal'
            [value]='currentStep'
            [ngStyle]='progressBarStyling'>
        </kendo-progressbar>
    `
            },] },
];
/** @nocollapse */
StepperComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: LocalizationService },
    { type: StepperService }
];
StepperComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-stepper',] }],
    linearClass: [{ type: HostBinding, args: ['class.k-stepper-linear',] }],
    ariaRole: [{ type: HostBinding, args: ['attr.role',] }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    displayStyle: [{ type: HostBinding, args: ['style.display',] }],
    stepType: [{ type: Input }],
    linear: [{ type: Input }],
    orientation: [{ type: Input }],
    currentStep: [{ type: Input }],
    steps: [{ type: Input }],
    successIcon: [{ type: Input }],
    errorIcon: [{ type: Input }],
    animation: [{ type: Input }],
    activate: [{ type: Output }],
    currentStepChange: [{ type: Output }],
    stepTemplate: [{ type: ContentChild, args: [StepperStepTemplateDirective, { static: true },] }],
    labelTemplate: [{ type: ContentChild, args: [StepperLabelTemplateDirective, { static: true },] }],
    indicatorTemplate: [{ type: ContentChild, args: [StepperIndicatorTemplateDirective, { static: true },] }]
};
