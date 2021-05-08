/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies the text and styles for the subtitle of the Card.
 */
var CardSubtitleDirective = /** @class */ (function () {
    function CardSubtitleDirective() {
        this.hostClass = true;
    }
    CardSubtitleDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoCardSubtitle]'
                },] },
    ];
    CardSubtitleDirective.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-card-subtitle',] }]
    };
    return CardSubtitleDirective;
}());
exports.CardSubtitleDirective = CardSubtitleDirective;
