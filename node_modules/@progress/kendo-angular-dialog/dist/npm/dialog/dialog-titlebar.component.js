/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var preventable_event_1 = require("../common/preventable-event");
/**
 * Represents the [Kendo UI DialogTitleBar component for Angular]({% slug api_dialog_dialogtitlebarcomponent %}).
 *
 * It is used as part of the Dialog content when the component is created dynamically by using an [Angular service]({% slug service_dialog %}).
 */
var DialogTitleBarComponent = /** @class */ (function () {
    function DialogTitleBarComponent(hostElement, localizationService) {
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        /**
         * Fires when the close button of the title-bar is clicked.
         */
        this.close = new core_1.EventEmitter();
    }
    Object.defineProperty(DialogTitleBarComponent.prototype, "className", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogTitleBarComponent.prototype, "closeButtonTitle", {
        get: function () {
            return this.localizationService.get('closeTitle');
        },
        enumerable: true,
        configurable: true
    });
    DialogTitleBarComponent.prototype.ngAfterViewChecked = function () {
        var element = this.hostElement.nativeElement;
        element.setAttribute('id', this.id);
    };
    /**
     * @hidden
     */
    DialogTitleBarComponent.prototype.onCloseClick = function (e) {
        e.preventDefault();
        var eventArgs = new preventable_event_1.PreventableEvent();
        this.close.emit(eventArgs);
    };
    DialogTitleBarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-dialog-titlebar',
                    template: "\n        <div class=\"k-window-title k-dialog-title\">\n            <ng-content></ng-content>\n        </div>\n\n        <div class=\"k-window-actions k-dialog-actions\">\n            <a\n                href=\"#\"\n                role=\"button\"\n                [attr.title]=\"closeButtonTitle\"\n                [attr.aria-label]=\"closeButtonTitle\"\n                class=\"k-button k-bare k-button-icon k-window-action k-dialog-action k-dialog-close\"\n                (click)=\"onCloseClick($event)\"\n            >\n                <span class=\"k-icon k-i-x\"></span>\n            </a>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogTitleBarComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: kendo_angular_l10n_1.LocalizationService, decorators: [{ type: core_1.Optional }] }
    ]; };
    DialogTitleBarComponent.propDecorators = {
        close: [{ type: core_1.Output }],
        id: [{ type: core_1.Input }],
        closeTitle: [{ type: core_1.Input }],
        className: [{ type: core_1.HostBinding, args: ['class.k-window-titlebar',] }, { type: core_1.HostBinding, args: ['class.k-dialog-titlebar',] }]
    };
    return DialogTitleBarComponent;
}());
exports.DialogTitleBarComponent = DialogTitleBarComponent;
