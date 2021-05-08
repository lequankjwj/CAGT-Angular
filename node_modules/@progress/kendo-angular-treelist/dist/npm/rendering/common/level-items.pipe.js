/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Pipe, args: [{
                    name: 'levelItems',
                    pure: true
                },] },
    ];
    return LevelItemsPipe;
}());
exports.LevelItemsPipe = LevelItemsPipe;
