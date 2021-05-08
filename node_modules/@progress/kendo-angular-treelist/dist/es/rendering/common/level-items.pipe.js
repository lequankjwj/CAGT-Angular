/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:pipe-naming */
import { Pipe } from '@angular/core';
/**
 * @hidden
 */
var LevelItemsPipe = /** @class */ (function () {
    function LevelItemsPipe() {
    }
    LevelItemsPipe.prototype.transform = function (level, hasChildren) {
        var result = [];
        var count = level + 1 - (hasChildren ? 1 : 0);
        for (var idx = 0; idx < count; idx++) {
            result.push(idx);
        }
        return result;
    };
    LevelItemsPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'levelItems',
                    pure: true
                },] },
    ];
    return LevelItemsPipe;
}());
export { LevelItemsPipe };
