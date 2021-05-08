/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostBinding, Input } from '@angular/core';
/**
 * Specifies a separator in the content of the Card.
 */
export class CardSeparatorDirective {
    constructor() {
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
    get verticalClass() {
        return this.orientation === 'vertical';
    }
    get horizontalClass() {
        return this.orientation === 'horizontal';
    }
}
CardSeparatorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardSeparator]'
            },] },
];
CardSeparatorDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-separator',] }],
    verticalClass: [{ type: HostBinding, args: ['class.k-separator-vertical',] }],
    horizontalClass: [{ type: HostBinding, args: ['class.k-separator-horizontal',] }],
    color: [{ type: HostBinding, args: ['style.color',] }, { type: Input }],
    orientation: [{ type: Input }]
};
