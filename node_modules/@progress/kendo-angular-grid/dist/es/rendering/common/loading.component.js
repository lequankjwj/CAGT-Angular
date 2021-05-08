/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(localization) {
        this.localization = localization;
        this.hostClass = true;
    }
    Object.defineProperty(LoadingComponent.prototype, "loadingText", {
        get: function () {
            return this.localization.get('loading');
        },
        enumerable: true,
        configurable: true
    });
    LoadingComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridLoading]',
                    template: "\n        <span class=\"k-loading-text\">{{ loadingText }}</span>\n        <div class=\"k-loading-image\"></div>\n        <div class=\"k-loading-color\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    LoadingComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-loading-mask',] }]
    };
    return LoadingComponent;
}());
export { LoadingComponent };
