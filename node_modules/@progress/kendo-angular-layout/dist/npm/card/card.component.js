/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-card',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.card.component'
                        }
                    ],
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    CardComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-card',] }],
        widthStyle: [{ type: core_1.HostBinding, args: ['style.width',] }],
        vertical: [{ type: core_1.HostBinding, args: ['class.k-card-vertical',] }],
        horizontal: [{ type: core_1.HostBinding, args: ['class.k-card-horizontal',] }],
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        orientation: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }]
    };
    return CardComponent;
}());
exports.CardComponent = CardComponent;
