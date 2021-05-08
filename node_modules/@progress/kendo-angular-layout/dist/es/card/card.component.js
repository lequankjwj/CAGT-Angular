/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
/**
 * Represents the [Kendo UI Card component for Angular]({% slug overview_card %})
 */
var CardComponent = /** @class */ (function () {
    function CardComponent(localizationService) {
        var _this = this;
        this.localizationService = localizationService;
        this.hostClass = true;
        /**
         * Specifies the layout of the Card content.
         *
         * The possible values are:
         * * (Default) `vertical`
         * * `horizontal`
         *
         */
        this.orientation = 'vertical';
        /**
         * Defines the width of the Card.
         * Defaults to `285px`.
         */
        this.width = '285px';
        this.rtl = false;
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(CardComponent.prototype, "widthStyle", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "vertical", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "horizontal", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    CardComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    CardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-card',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.card.component'
                        }
                    ],
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    CardComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-card',] }],
        widthStyle: [{ type: HostBinding, args: ['style.width',] }],
        vertical: [{ type: HostBinding, args: ['class.k-card-vertical',] }],
        horizontal: [{ type: HostBinding, args: ['class.k-card-horizontal',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        orientation: [{ type: Input }],
        width: [{ type: Input }]
    };
    return CardComponent;
}());
export { CardComponent };
