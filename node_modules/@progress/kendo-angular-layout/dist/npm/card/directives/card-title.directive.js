/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies the text and styles for the title of the Card.
 */
var CardTitleDirective = /** @class */ (function () {
    function CardTitleDirective() {
        this.hostClass = true;
    }
    CardTitleDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoCardTitle]'
                },] },
    ];
    CardTitleDirective.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-card-title',] }]
    };
    return CardTitleDirective;
}());
exports.CardTitleDirective = CardTitleDirective;
