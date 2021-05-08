/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Specifies the content in the Card body.
 */
var CardBodyComponent = /** @class */ (function () {
    function CardBodyComponent() {
        this.hostClass = true;
    }
    CardBodyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-card-body',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    CardBodyComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-card-body',] }]
    };
    return CardBodyComponent;
}());
exports.CardBodyComponent = CardBodyComponent;
