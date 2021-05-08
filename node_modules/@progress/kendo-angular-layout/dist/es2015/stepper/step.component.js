/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding, TemplateRef, NgZone, ElementRef, ViewChild } from '@angular/core';
import { isPresent } from '../common/util';
import { StepperService } from './stepper.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class StepperStepComponent {
    constructor(service, localization, ngZone) {
        this.service = service;
        this.localization = localization;
        this.ngZone = ngZone;
        this.isStepValid = undefined;
        this.shouldCheckValidity = undefined;
        this.subs = this.service.focusedStepChange.subscribe(() => {
            this.onFocusedStepChange();
        });
        this.subs.add(this.service.triggerValidation.subscribe(() => {
            this.handleValidityChecks();
        }));
    }
    get errorStepClass() {
        if (isPresent(this.isStepValid)) {
            return !this.isStepValid;
        }
        return false;
    }
    get successStepClass() {
        if (isPresent(this.isStepValid)) {
            return this.isStepValid;
        }
        return false;
    }
    ngOnInit() {
        this.handleValidityChecks();
    }
    ngOnChanges(changes) {
        if (changes.current && !changes.current.firstChange) {
            this.handleValidityChecks();
        }
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
    onFocusedStepChange() {
        this.ngZone.runOutsideAngular(() => {
            if (this.index === this.service.focusedStep) {
                this.stepLink.nativeElement.focus();
            }
        });
    }
    onFocus() {
        this.service.focus(this.index);
    }
    get tabIndexAttr() {
        const active = this.service.focusedStep || this.service.currentStep;
        return this.index === active ? 0 : -1;
    }
    get indicatorIconClasses() {
        if (this.step.icon) {
            return `k-icon k-i-${this.step.icon}`;
        }
        if (this.step.iconClass) {
            return `${this.step.iconClass}`;
        }
        if (this.shouldCheckValidity) {
            return this.validationIconClasses;
        }
    }
    get showIndicatorIcon() {
        if (this.shouldCheckValidity) {
            return true;
        }
        if (this.step.icon || this.step.iconClass) {
            return true;
        }
        return false;
    }
    get showLabelIcon() {
        if (this.shouldCheckValidity) {
            if (this.type === 'label') {
                return true;
            }
            if (this.step.icon || this.step.iconClass) {
                return true;
            }
        }
        return false;
    }
    get showLabelText() {
        return this.type === 'label' || this.type === 'full';
    }
    get validationIconClasses() {
        if (this.isStepValid) {
            return this.successIcon ? `${this.successIcon}` : 'k-icon k-i-check';
        }
        else {
            return this.errorIcon ? `${this.errorIcon}` : 'k-icon k-i-warning';
        }
    }
    get indicatorText() {
        const text = this.step.text;
        return text ? text : this.index + 1;
    }
    updateStepValidity() {
        if (typeof this.step.isValid === 'boolean') {
            return this.step.isValid;
        }
        if (typeof this.step.isValid === 'function') {
            return this.step.isValid(this.index);
        }
        return undefined;
    }
    get showIndicator() {
        return this.type === 'indicator' || this.type === 'full';
    }
    get showLabel() {
        if (this.type === 'label' || this.type === 'full') {
            return true;
        }
        return this.step.optional;
    }
    get optionalText() {
        return this.localization.get('optional');
    }
    get transitionDuration() {
        return this.service.owner.animationDuration;
    }
    _shouldCheckValidity() {
        if (isPresent(this.step.validate)) {
            if (typeof this.step.validate === 'boolean') {
                return this.step.validate;
            }
            if (typeof this.step.validate === 'function') {
                return this.step.validate(this.index);
            }
        }
        return isPresent(this.step.isValid) && this.index < this.current;
    }
    handleValidityChecks() {
        this.isStepValid = undefined;
        this.shouldCheckValidity = this._shouldCheckValidity();
        if (this.shouldCheckValidity) {
            this.isStepValid = this.updateStepValidity();
        }
    }
}
StepperStepComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoStepperStep]',
                template: `
        <a href='#' class='k-step-link' #stepLink
            [attr.tabindex]='tabIndexAttr'
            [attr.title]='step.label'
            [attr.aria-disabled]='step.disabled'
            [attr.aria-current]='index === current ? "step" : null'
            (focus)='onFocus()'
        >
            <ng-template *ngIf='stepTemplate'
                [ngTemplateOutlet]='stepTemplate'
                [ngTemplateOutletContext]='{ $implicit: step, index: index }'>
            </ng-template>

            <ng-container *ngIf='!stepTemplate'>
                <span *ngIf='showIndicator'
                    class='k-step-indicator'
                    aria-hidden='true'
                    [style.transition-duration.ms]='transitionDuration'
                >
                    <ng-template *ngIf='indicatorTemplate'
                        [ngTemplateOutlet]='indicatorTemplate'
                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>
                    </ng-template>

                    <ng-container *ngIf='!indicatorTemplate'>
                        <span *ngIf='showIndicatorIcon' class='k-step-indicator-icon' [ngClass]='indicatorIconClasses'></span>
                        <span class='k-step-indicator-text' *ngIf='!showIndicatorIcon'>{{ indicatorText }}</span>
                    </ng-container>
                </span>

                <span class='k-step-label' *ngIf='showLabel'>
                    <ng-template *ngIf='labelTemplate'
                        [ngTemplateOutlet]='labelTemplate'
                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>
                    </ng-template>

                    <ng-container *ngIf='!labelTemplate'>
                        <span class='k-step-text' *ngIf='showLabelText'>{{ step.label }}</span>
                        <span [ngClass]='validationIconClasses' *ngIf='showLabelIcon' aria-hidden='true'></span>
                        <span class='k-step-label-optional' *ngIf='step.optional'>({{optionalText}})</span>
                    </ng-container>
                </span>
            </ng-container>
        </a>
    `
            },] },
];
/** @nocollapse */
StepperStepComponent.ctorParameters = () => [
    { type: StepperService },
    { type: LocalizationService },
    { type: NgZone }
];
StepperStepComponent.propDecorators = {
    step: [{ type: Input }],
    index: [{ type: Input }],
    current: [{ type: Input }],
    type: [{ type: Input }],
    successIcon: [{ type: Input }],
    errorIcon: [{ type: Input }],
    indicatorTemplate: [{ type: Input }],
    labelTemplate: [{ type: Input }],
    stepTemplate: [{ type: Input }],
    stepLink: [{ type: ViewChild, args: ['stepLink', { static: true },] }],
    errorStepClass: [{ type: HostBinding, args: ['class.k-step-error',] }],
    successStepClass: [{ type: HostBinding, args: ['class.k-step-success',] }]
};
