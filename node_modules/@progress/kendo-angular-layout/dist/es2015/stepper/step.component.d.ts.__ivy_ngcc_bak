/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, OnInit, SimpleChanges, OnDestroy, OnChanges, NgZone, ElementRef } from '@angular/core';
import { StepType } from './models/step-type';
import { StepperService } from './stepper.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class StepperStepComponent implements OnInit, OnChanges, OnDestroy {
    private service;
    private localization;
    private ngZone;
    step: any;
    index: number;
    current: number;
    type: StepType;
    successIcon: string;
    errorIcon: string;
    indicatorTemplate: TemplateRef<any>;
    labelTemplate: TemplateRef<any>;
    stepTemplate: TemplateRef<any>;
    stepLink: ElementRef;
    isStepValid: boolean;
    shouldCheckValidity: boolean;
    private subs;
    constructor(service: StepperService, localization: LocalizationService, ngZone: NgZone);
    readonly errorStepClass: boolean;
    readonly successStepClass: boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onFocusedStepChange(): void;
    onFocus(): void;
    readonly tabIndexAttr: number;
    readonly indicatorIconClasses: string;
    readonly showIndicatorIcon: boolean;
    readonly showLabelIcon: boolean;
    readonly showLabelText: boolean;
    readonly validationIconClasses: string;
    readonly indicatorText: string;
    updateStepValidity(): boolean;
    readonly showIndicator: boolean;
    readonly showLabel: boolean;
    readonly optionalText: string;
    readonly transitionDuration: number;
    private _shouldCheckValidity;
    private handleValidityChecks;
}
