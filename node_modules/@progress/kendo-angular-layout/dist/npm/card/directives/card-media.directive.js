/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies any media that will be displayed and aligned in the Card.
 */
var CardMediaDirective = /** @class */ (function () {
    function CardMediaDirective() {
        this.hostClass = true;
    }
    CardMediaDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoCardMedia]'
                },] },
    ];
    CardMediaDirective.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-card-media',] }]
    };
    return CardMediaDirective;
}());
exports.CardMediaDirective = CardMediaDirective;
