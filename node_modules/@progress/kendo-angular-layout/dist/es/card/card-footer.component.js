/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding } from '@angular/core';
/**
 * Specifies the content in the Card footer.
 */
var CardFooterComponent = /** @class */ (function () {
    function CardFooterComponent() {
        this.hostClass = true;
    }
    CardFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-card-footer',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    CardFooterComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-footer',] }]
    };
    return CardFooterComponent;
}());
export { CardFooterComponent };
