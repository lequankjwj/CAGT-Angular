/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, Output, Input, ElementRef, Optional } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PreventableEvent } from '../common/preventable-event';
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
        this.close = new EventEmitter();
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
        var eventArgs = new PreventableEvent();
        this.close.emit(eventArgs);
    };
    DialogTitleBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-dialog-titlebar',
                    template: "\n        <div class=\"k-window-title k-dialog-title\">\n            <ng-content></ng-content>\n        </div>\n\n        <div class=\"k-window-actions k-dialog-actions\">\n            <a\n                href=\"#\"\n                role=\"button\"\n                [attr.title]=\"closeButtonTitle\"\n                [attr.aria-label]=\"closeButtonTitle\"\n                class=\"k-button k-bare k-button-icon k-window-action k-dialog-action k-dialog-close\"\n                (click)=\"onCloseClick($event)\"\n            >\n                <span class=\"k-icon k-i-x\"></span>\n            </a>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogTitleBarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: LocalizationService, decorators: [{ type: Optional }] }
    ]; };
    DialogTitleBarComponent.propDecorators = {
        close: [{ type: Output }],
        id: [{ type: Input }],
        closeTitle: [{ type: Input }],
        className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }]
    };
    return DialogTitleBarComponent;
}());
export { DialogTitleBarComponent };
