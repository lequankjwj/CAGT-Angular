/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var intl_service_1 = require("./intl.service");
/**
 * Formats a number value to a string based on the requested format.
 * This pipe uses the [`IntlService`]({% slug api_intl_intlservice %}).
 *
 * @example
 * ```ng-template-no-run
 *   <ul>
 *     <li>{{decimal | kendoNumber:'c' }}</li>
 *     <li>{{stringNumber | kendoNumber:'p' }}</li>
 *     <li>{{int | kendoNumber:'##.00' }}</li>
 *  </ul>
 * ```
 */
var NumberPipe = /** @class */ (function () {
    /**
     * @hidden
     */
    function NumberPipe(intlService) {
        this.intlService = intlService;
    }
    /**
     * Converts a `Number` object into a string based on the specified format.
     * If no format is provided, the value is formatted as decimal number using the
     * [`"n"`](https://github.com/telerik/kendo-intl/blob/master/docs/num-formatting/index.md#standard) format.
     *
     * @param value - The numer that will be formatted.
     * @param format - The format string or options.
     * @param localeId - (Optional) The locale ID that will be used in place of the default one.
     * @return - The formatted number.
     */
    NumberPipe.prototype.transform = function (value, format, localeId) {
        if (typeof value === 'string') {
            value = this.intlService.parseNumber(value);
        }
        if (value !== null && value !== undefined) {
            return this.intlService.formatNumber(value, format, localeId);
        }
        return value;
    };
    NumberPipe.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'kendoNumber'
                },] },
    ];
    /** @nocollapse */
    NumberPipe.ctorParameters = function () { return [
        { type: intl_service_1.IntlService }
    ]; };
    return NumberPipe;
}());
exports.NumberPipe = NumberPipe;
