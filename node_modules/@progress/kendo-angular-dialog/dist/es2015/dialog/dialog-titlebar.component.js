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
export class DialogTitleBarComponent {
    constructor(hostElement, localizationService) {
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        /**
         * Fires when the close button of the title-bar is clicked.
         */
        this.close = new EventEmitter();
    }
    get className() {
        return true;
    }
    get closeButtonTitle() {
        return this.localizationService.get('closeTitle');
    }
    ngAfterViewChecked() {
        const element = this.hostElement.nativeElement;
        element.setAttribute('id', this.id);
    }
    /**
     * @hidden
     */
    onCloseClick(e) {
        e.preventDefault();
        const eventArgs = new PreventableEvent();
        this.close.emit(eventArgs);
    }
}
DialogTitleBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-dialog-titlebar',
                template: `
        <div class="k-window-title k-dialog-title">
            <ng-content></ng-content>
        </div>

        <div class="k-window-actions k-dialog-actions">
            <a
                href="#"
                role="button"
                [attr.title]="closeButtonTitle"
                [attr.aria-label]="closeButtonTitle"
                class="k-button k-bare k-button-icon k-window-action k-dialog-action k-dialog-close"
                (click)="onCloseClick($event)"
            >
                <span class="k-icon k-i-x"></span>
            </a>
        </div>
    `
            },] },
];
/** @nocollapse */
DialogTitleBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: LocalizationService, decorators: [{ type: Optional }] }
];
DialogTitleBarComponent.propDecorators = {
    close: [{ type: Output }],
    id: [{ type: Input }],
    closeTitle: [{ type: Input }],
    className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }]
};
