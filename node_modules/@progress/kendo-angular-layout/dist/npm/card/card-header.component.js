/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies the content in the Card header.
 */
var CardHeaderComponent = /** @class */ (function () {
    function CardHeaderComponent() {
        this.hostClass = true;
    }
    CardHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-card-header',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    CardHeaderComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-card-header',] }]
    };
    return CardHeaderComponent;
}());
exports.CardHeaderComponent = CardHeaderComponent;
