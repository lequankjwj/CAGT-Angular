/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgZone, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { StepperComponent } from './stepper.component';
/**
 * @hidden
 */
export declare class StepperService {
    private localization;
    private ngZone;
    private changeDetector;
    owner: StepperComponent;
    currentStep: number;
    focusedStep: number;
    triggerValidation: EventEmitter<any>;
    focusedStepChange: EventEmitter<number>;
    private readonly handlers;
    constructor(localization: LocalizationService, ngZone: NgZone, changeDetector: ChangeDetectorRef);
    emit(event: string, eventArgs: any): boolean;
    onActivate(currentIdx: number, originalEvent: any): void;
    validateSteps(): void;
    keydown(e: any): void;
    left(): void;
    right(): void;
    up(): void;
    down(): void;
    home(): void;
    end(): void;
    enter(event: any): void;
    focus(focusedIdx: number): void;
    focusNextStep(): void;
    focusPrevStep(): void;
    isStepDisabled(index: number): boolean;
    isPrevOrNextStep(index: number): boolean;
    readonly isHorizontal: boolean;
}
