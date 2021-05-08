/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, EventEmitter, Renderer2, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { StepperOrientation } from './models/orientation';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { StepType } from './models/step-type';
import { StepperStepTemplateDirective } from './template-directives/step-template.directive';
import { StepperLabelTemplateDirective } from './template-directives/label-template.directive';
import { StepperActivateEvent } from './events/activate-event';
import { StepperIndicatorTemplateDirective } from './template-directives/indicator-template.directive';
import { StepperService } from './stepper.service';
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
export declare class StepperComponent implements OnChanges, OnDestroy {
    private renderer;
    private elem;
    private localization;
    private stepperService;
    hostClasses: boolean;
    readonly linearClass: boolean;
    ariaRole: string;
    direction: string;
    displayStyle: string;
    /**
     * Specifies the type of the steps in the Stepper.
     *
     * The possible values are:
     * * (Default) `indicator`
     * * `label`
     * * `full`
     */
    stepType: StepType;
    /**
     * Specifies the linear flow of the Stepper.
     *
     * @default true
     */
    linear: boolean;
    /**
     * Specifies the orientation of the Stepper
     * ([see example]({% slug orientation_stepper %})).
     *
     * The possible values are:
     * * (Default) `horizontal`
     * * `vertical`
     */
    orientation: StepperOrientation;
    /**
     * The index of the current step.
     */
    currentStep: number;
    /**
     * The collection of steps that will be rendered in the Stepper.
     * ([see example]({% slug step_appearance_stepper %}))
     */
    steps: any[];
    /**
     * Specifies a custom icon that will be rendered inside the step
     * for valid previous steps.
     */
    successIcon: string;
    /**
     * Specifies a custom icon that will be rendered inside the step
     * for invalid previous steps.
     */
    errorIcon: string;
    /**
     * Specifies the duration of the progress indicator animation in milliseconds. Defaults to `400ms`.
     *
     * The possible values are:
     *  * Boolean
     *    * (Default) `true`
     *    * false
     *  * Number
     */
    animation?: boolean | number;
    /**
     * Fires when a step is about to be activated. This event is preventable.
     */
    activate: EventEmitter<StepperActivateEvent>;
    /**
     * Fires when the `currentStep` property of the component was updated.
     * Used to provide a two-way binding for the `currentStep` property.
     */
    currentStepChange: EventEmitter<number>;
    /**
     * @hidden
     */
    stepTemplate: StepperStepTemplateDirective;
    /**
     * @hidden
     */
    labelTemplate: StepperLabelTemplateDirective;
    /**
     * @hidden
     */
    indicatorTemplate: StepperIndicatorTemplateDirective;
    private dynamicRTLSubscription;
    private _steps;
    constructor(renderer: Renderer2, elem: ElementRef, localization: LocalizationService, stepperService: StepperService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Manually triggers the validity check configured by the [isValid]({% slug api_layout_stepperstep %}#toc-isvalid) property of the steps.
     *
     * Steps that have their [validate]({% slug api_layout_stepperstep %}#toc-validate) property set to `false`, will not be validated.
     */
    validateSteps(): void;
    private applyHostStyling;
    /**
     * @hidden
     */
    readonly progressAnimation: any;
    /**
     * @hidden
     */
    readonly animationDuration: number;
    /**
     * @hidden
     */
    readonly stepsListStyling: Object;
    /**
     * @hidden
     */
    readonly progressBarStyling: Object;
    /***
     * @hidden
     */
    readonly isHorizontal: boolean;
}
