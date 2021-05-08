/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
var canCreateElement = function () { return isDocumentAvailable() && document.createElement; };
var ɵ0 = canCreateElement;
var cachedScrollbarWidth = null;
var cachedPixelRatio;
var cachedRtlScrollLeft = null;
function scrollbarWidth() {
    if (cachedScrollbarWidth === null && canCreateElement()) {
        cachedPixelRatio = window.devicePixelRatio || 1;
        var div = document.createElement("div");
        div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);
        cachedScrollbarWidth = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
    }
    return cachedScrollbarWidth;
}
function rtlScrollLeft() {
    if (cachedRtlScrollLeft === null && canCreateElement()) {
        var div = document.createElement("div");
        div.style.cssText = "overflow:scroll;zoom:1;clear:both;display:block;width:100px;visibility:hidden;position:absolute;left:-10000px;direction:rtl;";
        div.innerHTML = "<div style='width:200px;height:1px;'</div>";
        document.body.appendChild(div);
        var initial = div.scrollLeft;
        div.scrollLeft = -1;
        cachedRtlScrollLeft = div.scrollLeft < 0 ? div.scrollLeft : initial;
        document.body.removeChild(div);
    }
    return cachedRtlScrollLeft;
}
/**
 * @hidden
 * move to kendo-common
 */
var BrowserSupportService = /** @class */ (function () {
    function BrowserSupportService(zone, changeDetector) {
        var _this = this;
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.changes = new EventEmitter();
        if (typeof window === 'undefined') {
            return;
        }
        this.zone.runOutsideAngular(function () {
            _this.subscriptions = fromEvent(window, 'resize').pipe(auditTime(100)).subscribe(function () {
                if (cachedPixelRatio !== window.devicePixelRatio) {
                    zone.run(function () {
                        cachedScrollbarWidth = null;
                        _this.changes.emit();
                        _this.changeDetector.markForCheck();
                    });
                }
            });
        });
    }
    BrowserSupportService.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
            this.subscriptions = null;
        }
    };
    Object.defineProperty(BrowserSupportService.prototype, "scrollbarWidth", {
        get: function () {
            return scrollbarWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserSupportService.prototype, "rtlScrollLeft", {
        get: function () {
            return rtlScrollLeft();
        },
        enumerable: true,
        configurable: true
    });
    BrowserSupportService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BrowserSupportService.ctorParameters = function () { return [
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    return BrowserSupportService;
}());
export { BrowserSupportService };
export { ɵ0 };
