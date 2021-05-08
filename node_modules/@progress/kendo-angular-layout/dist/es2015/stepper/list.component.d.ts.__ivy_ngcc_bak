/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone, OnDestroy, OnInit, Renderer2, TemplateRef } from "@angular/core";
import { StepperOrientation } from './models/orientation';
import { StepType } from './models/step-type';
import { StepperService } from './stepper.service';
/**
 * @hidden
 */
export declare class StepperListComponent implements OnInit, OnDestroy {
    private renderer;
    private ngZone;
    private service;
    element: ElementRef;
    linear: boolean;
    stepType: StepType;
    orientation: StepperOrientation;
    currentStep: number;
    steps: any[];
    successIcon: string;
    errorIcon: string;
    indicatorTemplate: TemplateRef<any>;
    labelTemplate: TemplateRef<any>;
    stepTemplate: TemplateRef<any>;
    private domSubs;
    constructor(renderer: Renderer2, ngZone: NgZone, service: StepperService, element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly maxStepWidth: number;
    readonly maxStepHeight: number;
    private maxStepDimension;
    private initDomEvents;
    private clickHandler;
    private getStepIndex;
}
