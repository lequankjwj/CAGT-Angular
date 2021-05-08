/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies the content in the Card footer.
 */
var CardFooterComponent = /** @class */ (function () {
    function CardFooterComponent() {
        this.hostClass = true;
    }
    CardFooterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-card-footer',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    CardFooterComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-card-footer',] }]
    };
    return CardFooterComponent;
}());
exports.CardFooterComponent = CardFooterComponent;
