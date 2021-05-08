/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
/**
 * @hidden
 */
var FocusRoot = /** @class */ (function () {
    function FocusRoot() {
        this.groups = new Set();
    }
    FocusRoot.prototype.registerGroup = function (group) {
        if (this.alive) {
            this.groups.add(group);
        }
    };
    FocusRoot.prototype.unregisterGroup = function (group) {
        if (this.alive) {
            this.groups.delete(group);
        }
    };
    FocusRoot.prototype.activate = function () {
        if (this.alive) {
            this.groups.forEach(function (f) { return f.activate(); });
        }
    };
    FocusRoot.prototype.deactivate = function () {
        if (this.alive) {
            this.groups.forEach(function (f) { return f.deactivate(); });
        }
    };
    FocusRoot.decorators = [
        { type: Injectable },
    ];
    return FocusRoot;
}());
export { FocusRoot };
