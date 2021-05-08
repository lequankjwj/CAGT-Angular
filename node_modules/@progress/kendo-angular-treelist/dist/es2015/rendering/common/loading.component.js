/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class LoadingComponent {
    constructor(localization) {
        this.localization = localization;
        this.hostClass = true;
    }
    get loadingText() {
        return this.localization.get('loading');
    }
}
LoadingComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListLoading]',
                template: `
        <span class="k-loading-text">{{ loadingText }}</span>
        <div class="k-loading-image"></div>
        <div class="k-loading-color"></div>
    `
            },] },
];
/** @nocollapse */
LoadingComponent.ctorParameters = () => [
    { type: LocalizationService }
];
LoadingComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-loading-mask',] }]
};
