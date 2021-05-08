/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var activate_event_1 = require("./events/activate-event");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_common_2 = require("@progress/kendo-angular-common");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var util_1 = require("../common/util");
var DEFAULT_CURRENT_STEP = 0;
var handlers = {};
handlers[kendo_angular_common_2.Keys.ArrowLeft] = 'left';
handlers[kendo_angular_common_2.Keys.ArrowRight] = 'right';
handlers[kendo_angular_common_2.Keys.ArrowUp] = 'up';
handlers[kendo_angular_common_2.Keys.ArrowDown] = 'down';
handlers[kendo_angular_common_2.Keys.Home] = 'home';
handlers[kendo_angular_common_2.Keys.End] = 'end';
handlers[kendo_angular_common_2.Keys.Enter] = 'enter';
handlers[kendo_angular_common_2.Keys.Space] = 'enter';
var handlersRTL = Object.assign({}, handlers);
handlersRTL[kendo_angular_common_2.Keys.ArrowLeft] = 'right';
handlersRTL[kendo_angular_common_2.Keys.ArrowRight] = 'left';
/**
 * @hidden
 */
var StepperService = /** @class */ (function () {
    function StepperService(localization, ngZone, changeDetector) {
        this.localization = localization;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.currentStep = DEFAULT_CURRENT_STEP;
        this.triggerValidation = new core_1.EventEmitter();
        this.focusedStepChange = new core_1.EventEmitter();
    }
    Object.defineProperty(StepperService.prototype, "handlers", {
        get: function () {
            return this.localization.rtl ? handlersRTL : handlers;
        },
        enumerable: true,
        configurable: true
    });
    StepperService.prototype.emit = function (event, eventArgs) {
        var stepper = this.owner;
        if (kendo_angular_common_1.hasObservers(stepper[event])) {
            stepper[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    StepperService.prototype.onActivate = function (currentIdx, originalEvent) {
        var _this = this;
        var eventArgs = new activate_event_1.StepperActivateEvent({
            index: currentIdx,
            step: this.owner.steps[currentIdx],
            originalEvent: originalEvent,
            sender: this.owner
        });
        this.ngZone.run(function () {
            if (!_this.emit('activate', eventArgs)) {
                _this.currentStep = currentIdx;
                _this.owner['currentStepChange'].emit(currentIdx);
                _this.changeDetector.detectChanges();
            }
        });
    };
    StepperService.prototype.validateSteps = function () {
        this.triggerValidation.emit();
    };
    StepperService.prototype.keydown = function (e) {
        var current = this.focusedStep || this.currentStep;
        var handler = this.handlers[e.keyCode];
        if (!util_1.isPresent(current)) {
            return;
        }
        if (handler) {
            e.preventDefault();
            this[handler](e);
        }
    };
    StepperService.prototype.left = function () {
        if (!this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    };
    StepperService.prototype.right = function () {
        if (!this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    };
    StepperService.prototype.up = function () {
        if (this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    };
    StepperService.prototype.down = function () {
        if (this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    };
    StepperService.prototype.home = function () {
        this.focusedStep = 0;
        this.focusedStepChange.emit();
    };
    StepperService.prototype.end = function () {
        this.focusedStep = this.owner.steps.length - 1;
        this.focusedStepChange.emit();
    };
    StepperService.prototype.enter = function (event) {
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
    };
    StepperService.prototype.focus = function (focusedIdx) {
        this.focusedStep = focusedIdx;
    };
    StepperService.prototype.focusNextStep = function () {
        if (this.focusedStep < this.owner.steps.length) {
            this.focusedStep += 1;
            this.focusedStepChange.emit();
        }
    };
    StepperService.prototype.focusPrevStep = function () {
        if (this.focusedStep > 0) {
            this.focusedStep -= 1;
            this.focusedStepChange.emit();
        }
    };
    StepperService.prototype.isStepDisabled = function (index) {
        return this.owner.steps[index].disabled;
    };
    StepperService.prototype.isPrevOrNextStep = function (index) {
        return index === this.currentStep + 1 || index === this.currentStep - 1;
    };
    Object.defineProperty(StepperService.prototype, "isHorizontal", {
        get: function () {
            return this.owner.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    StepperService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    StepperService.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone },
        { type: core_1.ChangeDetectorRef }
    ]; };
    return StepperService;
}());
exports.StepperService = StepperService;
