/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { StepperActivateEvent } from './events/activate-event';
import { hasObservers } from '@progress/kendo-angular-common';
import { Keys } from '@progress/kendo-angular-common';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { isPresent } from '../common/util';
const DEFAULT_CURRENT_STEP = 0;
const handlers = {};
handlers[Keys.ArrowLeft] = 'left';
handlers[Keys.ArrowRight] = 'right';
handlers[Keys.ArrowUp] = 'up';
handlers[Keys.ArrowDown] = 'down';
handlers[Keys.Home] = 'home';
handlers[Keys.End] = 'end';
handlers[Keys.Enter] = 'enter';
handlers[Keys.Space] = 'enter';
const handlersRTL = Object.assign({}, handlers);
handlersRTL[Keys.ArrowLeft] = 'right';
handlersRTL[Keys.ArrowRight] = 'left';
/**
 * @hidden
 */
export class StepperService {
    constructor(localization, ngZone, changeDetector) {
        this.localization = localization;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.currentStep = DEFAULT_CURRENT_STEP;
        this.triggerValidation = new EventEmitter();
        this.focusedStepChange = new EventEmitter();
    }
    get handlers() {
        return this.localization.rtl ? handlersRTL : handlers;
    }
    emit(event, eventArgs) {
        const stepper = this.owner;
        if (hasObservers(stepper[event])) {
            stepper[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    onActivate(currentIdx, originalEvent) {
        const eventArgs = new StepperActivateEvent({
            index: currentIdx,
            step: this.owner.steps[currentIdx],
            originalEvent: originalEvent,
            sender: this.owner
        });
        this.ngZone.run(() => {
            if (!this.emit('activate', eventArgs)) {
                this.currentStep = currentIdx;
                this.owner['currentStepChange'].emit(currentIdx);
                this.changeDetector.detectChanges();
            }
        });
    }
    validateSteps() {
        this.triggerValidation.emit();
    }
    keydown(e) {
        const current = this.focusedStep || this.currentStep;
        const handler = this.handlers[e.keyCode];
        if (!isPresent(current)) {
            return;
        }
        if (handler) {
            e.preventDefault();
            this[handler](e);
        }
    }
    left() {
        if (!this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    }
    right() {
        if (!this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    }
    up() {
        if (this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    }
    down() {
        if (this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    }
    home() {
        this.focusedStep = 0;
        this.focusedStepChange.emit();
    }
    end() {
        this.focusedStep = this.owner.steps.length - 1;
        this.focusedStepChange.emit();
    }
    enter(event) {
        if (this.focusedStep === this.currentStep) {
            return;
        }
        if (this.isStepDisabled(this.focusedStep)) {
            return;
        }
        if (this.owner.linear && this.isPrevOrNextStep(this.focusedStep) === false) {
            return;
        }
        this.onActivate(this.focusedStep, event);
    }
    focus(focusedIdx) {
        this.focusedStep = focusedIdx;
    }
    focusNextStep() {
        if (this.focusedStep < this.owner.steps.length) {
            this.focusedStep += 1;
            this.focusedStepChange.emit();
        }
    }
    focusPrevStep() {
        if (this.focusedStep > 0) {
            this.focusedStep -= 1;
            this.focusedStepChange.emit();
        }
    }
    isStepDisabled(index) {
        return this.owner.steps[index].disabled;
    }
    isPrevOrNextStep(index) {
        return index === this.currentStep + 1 || index === this.currentStep - 1;
    }
    get isHorizontal() {
        return this.owner.orientation === 'horizontal';
    }
}
StepperService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StepperService.ctorParameters = () => [
    { type: LocalizationService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
