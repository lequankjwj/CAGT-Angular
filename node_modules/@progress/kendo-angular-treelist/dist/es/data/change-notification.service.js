/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, NgZone, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
/**
 * @hidden
 */
var ChangeNotificationService = /** @class */ (function () {
    function ChangeNotificationService(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
    }
    ChangeNotificationService.prototype.notify = function () {
        var _this = this;
        if (!this.subscription || this.subscription.closed) {
            this.subscription = this.ngZone.onStable
                .asObservable().pipe(take(1))
                .subscribe(function () { return _this.changes.emit(); });
        }
    };
    ChangeNotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ChangeNotificationService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ChangeNotificationService;
}());
export { ChangeNotificationService };
