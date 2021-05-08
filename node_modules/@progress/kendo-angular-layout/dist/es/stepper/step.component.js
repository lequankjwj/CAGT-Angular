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
var StepperStepComponent = /** @class */ (function () {
    function StepperStepComponent(service, localization, ngZone) {
        var _this = this;
        this.service = service;
        this.localization = localization;
        this.ngZone = ngZone;
        this.isStepValid = undefined;
        this.shouldCheckValidity = undefined;
        this.subs = this.service.focusedStepChange.subscribe(function () {
            _this.onFocusedStepChange();
        });
        this.subs.add(this.service.triggerValidation.subscribe(function () {
            _this.handleValidityChecks();
        }));
    }
    Object.defineProperty(StepperStepComponent.prototype, "errorStepClass", {
        get: function () {
            if (isPresent(this.isStepValid)) {
                return !this.isStepValid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "successStepClass", {
        get: function () {
            if (isPresent(this.isStepValid)) {
                return this.isStepValid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    StepperStepComponent.prototype.ngOnInit = function () {
        this.handleValidityChecks();
    };
    StepperStepComponent.prototype.ngOnChanges = function (changes) {
        if (changes.current && !changes.current.firstChange) {
            this.handleValidityChecks();
        }
    };
    StepperStepComponent.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    };
    StepperStepComponent.prototype.onFocusedStepChange = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            if (_this.index === _this.service.focusedStep) {
                _this.stepLink.nativeElement.focus();
            }
        });
    };
    StepperStepComponent.prototype.onFocus = function () {
        this.service.focus(this.index);
    };
    Object.defineProperty(StepperStepComponent.prototype, "tabIndexAttr", {
        get: function () {
            var active = this.service.focusedStep || this.service.currentStep;
            return this.index === active ? 0 : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "indicatorIconClasses", {
        get: function () {
            if (this.step.icon) {
                return "k-icon k-i-" + this.step.icon;
            }
            if (this.step.iconClass) {
                return "" + this.step.iconClass;
            }
            if (this.shouldCheckValidity) {
                return this.validationIconClasses;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showIndicatorIcon", {
        get: function () {
            if (this.shouldCheckValidity) {
                return true;
            }
            if (this.step.icon || this.step.iconClass) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showLabelIcon", {
        get: function () {
            if (this.shouldCheckValidity) {
                if (this.type === 'label') {
                    return true;
                }
                if (this.step.icon || this.step.iconClass) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showLabelText", {
        get: function () {
            return this.type === 'label' || this.type === 'full';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "validationIconClasses", {
        get: function () {
            if (this.isStepValid) {
                return this.successIcon ? "" + this.successIcon : 'k-icon k-i-check';
            }
            else {
                return this.errorIcon ? "" + this.errorIcon : 'k-icon k-i-warning';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "indicatorText", {
        get: function () {
            var text = this.step.text;
            return text ? text : this.index + 1;
        },
        enumerable: true,
        configurable: true
    });
    StepperStepComponent.prototype.updateStepValidity = function () {
        if (typeof this.step.isValid === 'boolean') {
            return this.step.isValid;
        }
        if (typeof this.step.isValid === 'function') {
            return this.step.isValid(this.index);
        }
        return undefined;
    };
    Object.defineProperty(StepperStepComponent.prototype, "showIndicator", {
        get: function () {
            return this.type === 'indicator' || this.type === 'full';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showLabel", {
        get: function () {
            if (this.type === 'label' || this.type === 'full') {
                return true;
            }
            return this.step.optional;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "optionalText", {
        get: function () {
            return this.localization.get('optional');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "transitionDuration", {
        get: function () {
            return this.service.owner.animationDuration;
        },
        enumerable: true,
        configurable: true
    });
    StepperStepComponent.prototype._shouldCheckValidity = function () {
        if (isPresent(this.step.validate)) {
            if (typeof this.step.validate === 'boolean') {
                return this.step.validate;
            }
            if (typeof this.step.validate === 'function') {
                return this.step.validate(this.index);
            }
        }
        return isPresent(this.step.isValid) && this.index < this.current;
    };
    StepperStepComponent.prototype.handleValidityChecks = function () {
        this.isStepValid = undefined;
        this.shouldCheckValidity = this._shouldCheckValidity();
        if (this.shouldCheckValidity) {
            this.isStepValid = this.updateStepValidity();
        }
    };
    StepperStepComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoStepperStep]',
                    template: "\n        <a href='#' class='k-step-link' #stepLink\n            [attr.tabindex]='tabIndexAttr'\n            [attr.title]='step.label'\n            [attr.aria-disabled]='step.disabled'\n            [attr.aria-current]='index === current ? \"step\" : null'\n            (focus)='onFocus()'\n        >\n            <ng-template *ngIf='stepTemplate'\n                [ngTemplateOutlet]='stepTemplate'\n                [ngTemplateOutletContext]='{ $implicit: step, index: index }'>\n            </ng-template>\n\n            <ng-container *ngIf='!stepTemplate'>\n                <span *ngIf='showIndicator'\n                    class='k-step-indicator'\n                    aria-hidden='true'\n                    [style.transition-duration.ms]='transitionDuration'\n                >\n                    <ng-template *ngIf='indicatorTemplate'\n                        [ngTemplateOutlet]='indicatorTemplate'\n                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>\n                    </ng-template>\n\n                    <ng-container *ngIf='!indicatorTemplate'>\n                        <span *ngIf='showIndicatorIcon' class='k-step-indicator-icon' [ngClass]='indicatorIconClasses'></span>\n                        <span class='k-step-indicator-text' *ngIf='!showIndicatorIcon'>{{ indicatorText }}</span>\n                    </ng-container>\n                </span>\n\n                <span class='k-step-label' *ngIf='showLabel'>\n                    <ng-template *ngIf='labelTemplate'\n                        [ngTemplateOutlet]='labelTemplate'\n                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>\n                    </ng-template>\n\n                    <ng-container *ngIf='!labelTemplate'>\n                        <span class='k-step-text' *ngIf='showLabelText'>{{ step.label }}</span>\n                        <span [ngClass]='validationIconClasses' *ngIf='showLabelIcon' aria-hidden='true'></span>\n                        <span class='k-step-label-optional' *ngIf='step.optional'>({{optionalText}})</span>\n                    </ng-container>\n                </span>\n            </ng-container>\n        </a>\n    "
                },] },
    ];
    /** @nocollapse */
    StepperStepComponent.ctorParameters = function () { return [
        { type: StepperService },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
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
    return StepperStepComponent;
}());
export { StepperStepComponent };
