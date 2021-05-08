/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies a separator in the content of the Card.
 */
var CardSeparatorDirective = /** @class */ (function () {
    function CardSeparatorDirective() {
        this.hostClass = true;
        /**
         * Specifies the orientation of the Card separator.
         *
         * The possible values are:
         * (Default) `horizontal`
         * `vertical`
         */
        this.orientation = 'horizontal';
    }
    Object.defineProperty(CardSeparatorDirective.prototype, "verticalClass", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardSeparatorDirective.prototype, "horizontalClass", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    CardSeparatorDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoCardSeparator]'
                },] },
    ];
    CardSeparatorDirective.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-card-separator',] }],
        verticalClass: [{ type: core_1.HostBinding, args: ['class.k-separator-vertical',] }],
        horizontalClass: [{ type: core_1.HostBinding, args: ['class.k-separator-horizontal',] }],
        color: [{ type: core_1.HostBinding, args: ['style.color',] }, { type: core_1.Input }],
        orientation: [{ type: core_1.Input }]
    };
    return CardSeparatorDirective;
}());
exports.CardSeparatorDirective = CardSeparatorDirective;
